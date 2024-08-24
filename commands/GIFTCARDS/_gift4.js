/*CMD
  command: /gift4
  help: 
  need_reply: true
  auto_retry_time: 
  folder: GIFTCARDS
  answer: Expiration Date

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Function to validate and parse the expiration date format
function validateAndParseExpiration(expiration) {
  const regex = /^(\d+y)?\s*(\d+mon)?\s*(\d+d)?\s*(\d+h)?\s*(\d+min)?\s*(\d+s)?$/;
  if (!regex.test(expiration)) {
    return false;
  }

  let [_, y, mon, d, h, min, s] = expiration.match(regex);
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
  const regex = /^(\d+y)?\s*(\d+mon)?\s*(\d+d)?\s*(\d+h)?\s*(\d+min)?\s*(\d+s)?$/;
  const match = expirationString.match(regex);
  let [_, y, mon, d, h, min, s] = match;

  y = y ? parseInt(y) : 0;
  mon = mon ? parseInt(mon) : 0;
  d = d ? parseInt(d) : 0;
  h = h ? parseInt(h) : 0;
  min = min ? parseInt(min) : 0;
  s = s ? parseInt(s) : 0;

  return (((y * 365 + mon * 30 + d) * 24 + h) * 60 + min) * 60 * 1000 + s * 1000;
}

// Example message: "1y 30d 24h 60min 60s"
var expiration = message.trim();
var parsedExpiration = validateAndParseExpiration(expiration);
var recipientChatId = Bot.getProperty("TgId");

if (!parsedExpiration) {
  Bot.sendMessage(
    "*❌ INVALID INPUT*\n_Expiration format must be valid and within specified limits: 10y, 12mon, 30d, 24h, 60min, 60s._"
  );
} else {
  var now = new Date();
  var userTimeZoneDifference = Bot.getProperty(
    "timeZoneDifference" + recipientChatId
  ); // User's timezone difference in milliseconds

  if (userTimeZoneDifference === undefined) {
    Bot.sendMessage("*🕜 Timezone*\nThis user you wanted to send a timezone did not have their timezone set.\nWarn them to set their timezone.") 
    Bot.sendMessageToChatWithId(
    recipientChatId, 
    "Hey there i am *"+user.first_name+"*,\nPlease we advice you to set your timezone accordingly.\n\nRun the command /setUserTimeZoneDate to set your one time timezone, remember to put your timezone accurately it cannot be changed after you set it.")
    return;
  }

  // Calculate the expiration date
  var expirationDateUTC = new Date(
    now.getTime() + parseExpirationString(expiration)
  );
  var expirationDateUserTimeZone = new Date(
    expirationDateUTC.getTime() + userTimeZoneDifference
  );

  // Calculate the admin's GMT +8 timezone (28800000 milliseconds)
  var adminTimeZoneDifference = 8 * 60 * 60 * 1000;
  var expirationDateAdminTimeZone = new Date(
    expirationDateUTC.getTime() + adminTimeZoneDifference
  );

  // Format the dates
  var formattedExpirationDateUser = Libs.DateTimeFormat.format(
    expirationDateUserTimeZone,
    "ddd mmm dd yyyy HH:MM:ss"
  );
  var formattedExpirationDateAdmin = Libs.DateTimeFormat.format(
    expirationDateAdminTimeZone,
    "ddd mmm dd yyyy HH:MM:ss"
  );
  var formattedExpirationDateUTC = Libs.DateTimeFormat.format(
    expirationDateUTC,
    "ddd mmm dd yyyy HH:MM:ss"
  );
  var formattedDateCreated = Libs.DateTimeFormat.format(
    now,
    "ddd mmm dd yyyy HH:MM:ss"
  );

  // Assuming you have giftCardCode, giftCardValue, and redeemLimit values set somewhere
  var giftCardCode = Bot.getProperty("giftCardCode");
  var giftCardValue = Bot.getProperty("giftCardValue");
  var redeemLimit = Bot.getProperty("redeemLimit");

  Bot.setProperty(
    "giftCardInfo_" + giftCardCode,
    {
      code: giftCardCode,
      value: giftCardValue,
      redeemLimit: redeemLimit,
      expirationDateUTC: formattedExpirationDateUTC,
      formattedExpirationDateUser: formattedExpirationDateUser,
      formattedExpirationDateAdmin: formattedExpirationDateAdmin,
      dateCreated: formattedDateCreated
    },
    "json"
  );

  Bot.runCommand("/gift5");
}

