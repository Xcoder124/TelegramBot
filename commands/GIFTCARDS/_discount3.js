/*CMD
  command: /discount3
  help: 
  need_reply: true
  auto_retry_time: 
  folder: GIFTCARDS
  answer: Limit

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// /discountUsageLimit: Set the redemption limit
const redeemDLimit = parseInt(message.trim());

if (isNaN(redeemDLimit) || redeemDLimit < 1) {
  Bot.sendMessage("*❌ INVALID INPUT*\n_Invalid redemption limit. Please enter a positive numeric value._");
} else {
  Bot.setProperty("redeemDLimit", redeemDLimit, "integer");
  Bot.runCommand("/discount0");
}
