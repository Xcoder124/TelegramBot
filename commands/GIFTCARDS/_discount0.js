/*CMD
  command: /discount0
  help: 
  need_reply: true
  auto_retry_time: 
  folder: GIFTCARDS
  answer: Enter Min. Amount Of Purchase

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// /discountMinPurchase: Set the minimum purchase amount for the discount code
const minPurchaseAmount = parseFloat(message.trim());

if (isNaN(minPurchaseAmount) || minPurchaseAmount < 0.01) {
  Bot.sendMessage("*❌ INVALID INPUT*\n_The minimum purchase amount must be a positive numeric value._");
} else {
  Bot.setProperty("minPurchaseAmount", minPurchaseAmount, "float");
  Bot.runCommand("/discount1");
}
