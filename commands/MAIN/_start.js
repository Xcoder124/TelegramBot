/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: MAIN

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var closed = Bot.getProperty("closed")
if (closed == "true") {
  Bot.sendMessage(
    "*🕜 We'll be back in the Vacation!*\n_We are very sorry to inform you guys that the development of this bot were stopped at the moment due to frustration._\n\nBut when we're back were gonna make a very big difference in our bot and improve its functionality. Thank You."
  )
  return
}

// Define the startCommand function
function startCommand() {
  var params = message.split(" ");
  var isNewUser = checkIfNewUser(user.telegramid);

  if (params.length > 1) {
    var action = params[1].split("_");

    if (action[0] === "redeem") {
      var code = action[1]; // Changed action[2] to action[1] for code index
      redeemGiftCode(code);
    } else {
      Bot.sendMessage("Invalid action or parameters.");
    }
  } else {
    if (isNewUser) {
      Bot.sendMessage(
        "*BJSMasterSyntaxJavaBot*\nWelcome " +
          user.first_name +
          " to our bot!\nAn ultimate source of BJS resources to use in your bot!\nWe are here to provide BJS Sources and Templates for your custom bot.\n\n*Such as the:\n👨‍💻 CODES\n🤖 TEMPLATE BOTS*\n_📌 All of these are free and paid sources of BJS code from our Bots.Business Community!_\n\n*Explore now and create your multi-functional bot!*\n\n_Our bot [Contains ADS]_"
      );

      Bot.run({
        command: "main_hallway",
        run_after: 7 // seconds
      });
    } else {
      Bot.runCommand("main_hallway");
    }
  }
}

var userId = user.telegramid;

function isBanned(userId) {
  let banUntilStr = User.getProperty("banUntil_" + userId);
  if (!banUntilStr) return false;

  let banUntil = new Date(banUntilStr);
  return new Date() < banUntil;
}

if (isBanned(user.telegramid)) {
  let banUntilStr = User.getProperty("banUntil_" + userId);
  Bot.sendMessage(
    "*⛔ RESTRICTED*\nYou're account has been restricted until *" +
      banUntilStr +
      "*.\n\nIf you think this was a mistake, contact our admin through DM."
  );
  return;
}

// Function to check if the user is new
function checkIfNewUser(userId) {
  var userRecord = Bot.getProperty("user_" + userId);
  if (!userRecord) {
    // Mark the user as new and store the record
    Bot.setProperty("user_" + userId, { isNew: false }, "json");
    let stats = Libs.ResourcesLib.anotherChatRes("activeUsers", "global");
    stats.add(1);
    return true;
  }
  return false;
}

// Get the current date in user's timezone
function getCurrentDateUserTZ() {
  const now = new Date();
  var timeZoneDifference = Bot.getProperty("timeZoneDifference" + user.telegramid) || 0;
  return new Date(now.getTime() + timeZoneDifference);
}

// Check if the expiration date is passed
function isExpired(expirationDateUTC) {
  const expirationDate = new Date(expirationDateUTC);
  const currentDate = getCurrentDateUserTZ();
  return currentDate > expirationDate;
}

// Redeem the gift code
function redeemGiftCode(code) {
  var timeZoneDifference = Bot.getProperty("timeZoneDifference" + user.telegramid);
  if (timeZoneDifference === undefined) {
    Bot.sendMessage("*🕜 Timezone*\nTo have an accurate time reading, you need to set your timezone first.\n\nSet up your one time timezone /setUserTimeZoneDate once inputted it cannot be changed.");
    return;
  }

  const giftCardInfo = Bot.getProperty("giftCardInfo_" + code);

  if (!giftCardInfo) {
    Bot.sendMessage("*Invalid code*");
    return;
  }

  if (code !== giftCardInfo.code) {
    Bot.sendMessage("*Invalid code*");
    return;
  }

  const expirationDateUTC = giftCardInfo.formattedExpirationDateUser;
  if (isExpired(expirationDateUTC)) {
    Bot.sendMessage("*This code has expired*");
    return;
  }

  // Retrieve the value associated with the gift code
  var codeInfo = Bot.getProperty("giftCardCode_" + code);

  // Initialize codeInfo if it doesn't exist
  if (!codeInfo) {
    codeInfo = {
      value: giftCardInfo.value,
      redeemed: false,
      redeemedCount: 0,
      redeemedBy: [] // Track user IDs who have redeemed the code
    };
  } else {
    // Parse the JSON string to an object
    codeInfo = JSON.parse(codeInfo);
  }

  // Check if the user has already redeemed the code
  var userId = user.telegramid;
  if (codeInfo.redeemedBy.includes(userId)) {
    Bot.sendMessage("*You have already redeemed this code*");
    return;
  }

  // Check if redemption limit is reached
  if (giftCardInfo.redeemLimit !== null && codeInfo.redeemedCount >= giftCardInfo.redeemLimit) {
    Bot.sendMessage("*Redemption limit reached for this code*");
    return;
  }

  // Redeem the code and update the user's balance
  var balance = Libs.ResourcesLib.userRes("usd");
  balance.add(parseInt(codeInfo.value));
  codeInfo.redeemedCount += 1;
  codeInfo.redeemedBy.push(userId); // Add user ID to the redeemed list

  // Set redeemed to true if the redeemLimit is reached
  if (giftCardInfo.redeemLimit !== null && codeInfo.redeemedCount >= giftCardInfo.redeemLimit) {
    codeInfo.redeemed = true;
  }

  // Update transaction history
  var transactions = User.getProperty("transactions", []);
  transactions.unshift({
    date: getCurrentDateUserTZ().toISOString().split("T")[0],
    type: "Gift Card Deposit",
    amount: codeInfo.value
  });
  User.setProperty("transactions", transactions, "json");

  // Store the updated codeInfo as a JSON string
  Bot.setProperty("giftCardCode_" + code, JSON.stringify(codeInfo), "string");

  // Notify the user about the successful redemption
  Bot.sendMessage(
    "*Congratulations!*\nYour redeem code has been successfully redeemed.\nYou now have an additional *💎" +
      codeInfo.value +
      "* in your account balance.\nHappy Goodies!"
  );
}

// Call startCommand function
startCommand();
