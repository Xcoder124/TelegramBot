/*CMD
  command: /discount4
  help: 
  need_reply: true
  auto_retry_time: 
  folder: GIFTCARDS
  answer: Message

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// /discountDetails: Retrieve and display the discount code details
var discountCode = Bot.getProperty("discountCode");
var discountInfo = Bot.getProperty("discountCodeInfo_" + discountCode);
var recipientId = Bot.getProperty("TgId")
var sellerMessage = message

if (!discountInfo) {
  Bot.sendMessage("Error: Missing discount code information.");
} else {
  Bot.sendMessageToChatWithId(recipientId, "🎁 Claim your *" + discountInfo.value + "%* discount inside!!\n\n" +
    ""+sellerMessage+"\n\n" +
    "`" + discountInfo.code + "`\n" +
    "Redeem Limit: " + discountInfo.redeemLimit + "\n" +
    "Minimum Purchase Amount: 💎" + discountInfo.minPurchaseAmount.toFixed(2) + "\n" +
    "Maximum Purchase Amount: 💎" + discountInfo.maxPurchaseAmount.toFixed(2) + "\n" +
    "*Expiration Date:*\n" + discountInfo.formattedExpirationDateUser + "\n\n" +
    "*Note:* _This discount code is subject to a minimum purchase amount, a maximum purchase amount, and a limited number of redemptions._"
  );
}
