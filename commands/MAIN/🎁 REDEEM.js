/*CMD
  command: 🎁 REDEEM
  help: 
  need_reply: true
  auto_retry_time: 
  folder: MAIN

  <<ANSWER
*BJSMasterSyntaxJavaBot*
Send your obtained gift pin.
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /redeem, redeem
  group: 
CMD*/

function getCurrentDateUserTZ() {
  const now = new Date();
  var timeZoneDifference = Bot.getProperty("timeZoneDifference" + user.telegramid) || 0;
  return new Date(now.getTime() + timeZoneDifference);
}

function isExpired(expirationDateUTC) {
  const expirationDate = new Date(expirationDateUTC);
  const currentDate = getCurrentDateUserTZ();
  return currentDate > expirationDate;
}

function redeemGiftCode(message) {
  var timeZoneDifference = Bot.getProperty("timeZoneDifference" + user.telegramid);
  if (timeZoneDifference === undefined) {
    Bot.sendMessage("*🕜 Timezone*\nTo have an accurate time reading, you need to set your timezone first.\n\nSet up your one time timezone /setUserTimeZoneDate once inputted it cannot be changed.");
    return;
  }

  const giftCardInfo = Bot.getProperty("giftCardInfo_" + message);

  if (!giftCardInfo) {
    Bot.sendMessage("*❌ Invalid code*\nYou have entered an unexisted or invalid code.");
    return;
  }

  if (message !== giftCardInfo.code) {
    Bot.sendMessage("*❌ Invalid code*\nYou have entered an unexisted or invalid code.");
    return;
  }

  const expirationDateUTC = giftCardInfo.formattedExpirationDateUser;
  if (isExpired(expirationDateUTC)) {
    Bot.sendMessage("*❌ Expired*\nThis code has been expired.");
    return;
  }

  // Retrieve the value associated with the gift code
  var codeInfo = Bot.getProperty("giftCardCode_" + message);

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
    Bot.sendMessage("*❌ Redeemed*\nYou have already redeemed this code.");
    return;
  }

  // Check if redemption limit is reached
  if (giftCardInfo.redeemLimit !== null && codeInfo.redeemedCount >= giftCardInfo.redeemLimit) {
    Bot.sendMessage("*❌ Redemption Limit*\nThe code has reached it usage limits.");
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
  Bot.setProperty("giftCardCode_" + message, JSON.stringify(codeInfo), "string");

  // Notify the user about the successful redemption
  Bot.sendMessage(
    "*Congratulations!*\nYour redeem code has been successfully redeemed.\nYou now have an additional *💎" +
      codeInfo.value +
      "* in your account balance."
  );
}

function redeemDiscountCode(redeemCode) {
  var prefix = "D-";
  var discountCode = redeemCode.startsWith(prefix) ? redeemCode : null; // Use the full message as discountCode

  if (!discountCode) {
    Bot.sendMessage("*❌ Invalid discount code format*");
    return;
  }

  var discountInfo = Bot.getProperty("discountCodeInfo_" + discountCode);

  if (!discountInfo) {
    Bot.sendMessage("*❌ Invalid discount code*");
    return;
  }

 
  var currentDate = new Date();
  var expirationDateUTC = new Date(discountInfo.expirationDateUTC);

  if (currentDate > expirationDateUTC) {
    Bot.sendMessage("*❌ This discount code has expired*");
    return;
  }

  var userId = user.telegramid;
  if (discountInfo.redeemedBy.includes(userId)) {
    Bot.sendMessage("*❌ You have already redeemed this discount code*");
    return;
  }

  if (discountInfo.redeemedCount >= discountInfo.redeemLimit) {
    Bot.sendMessage("*❌ Redemption limit reached for this discount code*");
    return;
  }

  discountInfo.redeemedCount += 1;
  discountInfo.redeemedBy.push(userId);

  Bot.setProperty("discountCodeInfo_" + discountCode, JSON.stringify(discountInfo), "string");

  // Set the discount property for the user
  Bot.setProperty(
    "userDiscount_" + userId,
    JSON.stringify({
      applyDiscount: true,
      discountPercentage: discountInfo.value,
      noOfUsage: 1,
      minPurchaseAmount: discountInfo.minPurchaseAmount,
      maxPurchaseAmount: discountInfo.maxPurchaseAmount
    }),
    "json"
  );

  Bot.sendMessage(
    "*🎉 Congratulations!*\nYour discount code has been successfully redeemed.\nYou can now enjoy a *" +
      discountInfo.value +
      "%* discount on your next purchase.\n\n*Note:* _Ensure your purchase amount is between 💎" +
      discountInfo.minPurchaseAmount.toFixed(2) +
      " and 💎" +
      discountInfo.maxPurchaseAmount.toFixed(2) +
      " to apply the discount._\n\nHappy shopping!"
  );
}

function redeemCode(message) {
  if (message.startsWith("D-")) {
    redeemDiscountCode(message);
  } else {
    redeemGiftCode(message);
  }
}

// Example usage
redeemCode(message);

