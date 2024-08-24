/*CMD
  command: /discountExpiration
  help: 
  need_reply: true
  auto_retry_time: 
  folder: GIFTCARDS
  answer: Expiration

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Function to validate and parse the expiration date format
function validateAndParseExpiration(expiration) {
  const regex = /^(\d+y)?\s*(\d+m)?\s*(\d+d)?\s*(\d+h)?\s*(\d+min)?\s*(\d+s)?$/;
  const match = expiration.match(regex);
  if (!match) {
    return false;
  }

  let [_, y, mon, d, h, min, s] = match;
  y = y ? parseInt(y) : 0;
  mon = mon ? parseInt(mon) : 0;
  d = d ? parseInt(d) : 0;
  h = h ? parseInt(h) : 0;
  min = min ? parseInt(min) : 0;
  s = s ? parseInt(s) : 0;

  if (y > 10 || mon > 12 || d > 30 || h > 24 || min > 60 || s > 60) {
    return false;
  }

  return { y, mon, d, h, min, s };
}

// Function to parse the expiration string and return the milliseconds
function parseExpirationString(expirationString) {
  const regex = /^(\d+y)?\s*(\d+m)?\s*(\d+d)?\s*(\d+h)?\s*(\d+min)?\s*(\d+s)?$/;
  const match = expirationString.match(regex);
  if (!match) {
    return 0;
  }

  let [_, y, mon, d, h, min, s] = match;
  y = y ? parseInt(y) : 0;
  mon = mon ? parseInt(mon) : 0;
  d = d ? parseInt(d) : 0;
  h = h ? parseInt(h) : 0;
  min = min ? parseInt(min) : 0;
  s = s ? parseInt(s) : 0;

  return (((((y * 365 + mon * 30 + d) * 24 + h) * 60) + min) * 60 + s) * 1000;
}

// Example message: "1y 30d 24h 60m 60s"
var expiration = message.trim();
var parsedExpiration = validateAndParseExpiration(expiration);

if (!parsedExpiration) {
  Bot.sendMessage("*❌ INVALID INPUT*\n_Expiration format must be valid and within specified limits: 10y, 12m, 30d, 24h, 60m, 60s._");
} else {
  var now = new Date();
  var recipientChatId = Bot.getProperty("TgId");
  var userTimeZoneDifference = Bot.getProperty("timeZoneDifference" + recipientChatId); // User's timezone difference in milliseconds

  if (userTimeZoneDifference === undefined) {
    Bot.sendMessage("*🕜 Timezone*\nThis user you wanted to send a timezone did not have their timezone set.\nWarn them to set their timezone.");
    Bot.sendMessageToChatWithId(
      recipientChatId, 
      "Hey there I am *" + user.first_name + "*,\nPlease we advise you to set your timezone accordingly.\n\nRun the command /setUserTimeZoneDate to set your one-time timezone, remember to put your timezone accurately it cannot be changed after you set it."
    );
    return;
  }

  // Calculate the expiration date
  var expirationDateUTC = new Date(now.getTime() + parseExpirationString(expiration));
  var expirationDateUserTimeZone = new Date(expirationDateUTC.getTime() + userTimeZoneDifference);

  // Format the dates
  var formattedExpirationDateUser = Libs.DateTimeFormat.format(expirationDateUserTimeZone, "ddd mmm dd yyyy HH:MM:ss");
  var formattedExpirationDateUTC = Libs.DateTimeFormat.format(expirationDateUTC, "ddd mmm dd yyyy HH:MM:ss");
  var formattedDateCreated = Libs.DateTimeFormat.format(now, "ddd mmm dd yyyy HH:MM:ss");

  // Save the discount code information
  var discountValue = Bot.getProperty("discountValue");
  var redeemDLimit = Bot.getProperty("redeemDLimit");
  var discountCode = Bot.getProperty("discountCode");
  var minPurchaseAmount = Bot.getProperty("minPurchaseAmount");
  var maxPurchaseAmount = Bot.getProperty("maxPurchaseAmount");

  Bot.setProperty("discountCodeInfo_" + discountCode, JSON.stringify({
    code: discountCode,
    value: discountValue,
    redeemLimit: redeemDLimit,
    minPurchaseAmount: minPurchaseAmount,
    maxPurchaseAmount: maxPurchaseAmount,
    expirationDateUTC: formattedExpirationDateUTC,
    formattedExpirationDateUser: formattedExpirationDateUser,
    dateCreated: formattedDateCreated,
    redeemedBy: [],
    redeemedCount: 0
  }), "json");

  Bot.runCommand("/discount4");
}

