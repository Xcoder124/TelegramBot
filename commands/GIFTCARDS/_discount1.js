/*CMD
  command: /discount1
  help: 
  need_reply: true
  auto_retry_time: 
  folder: GIFTCARDS
  answer: Maximum Purchase Limit

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// /discountMaxPurchase: Set the maximum purchase amount for the discount code
const maxPurchaseAmount = parseFloat(message.trim());

if (isNaN(maxPurchaseAmount) || maxPurchaseAmount < 0.01) {
  Bot.sendMessage("*❌ INVALID INPUT*\n_The maximum purchase amount must be a positive numeric value._");
} else {
  Bot.setProperty("maxPurchaseAmount", maxPurchaseAmount, "float");
  Bot.runCommand("/discountSendTo");
}
