/*CMD
  command: /gift3
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

// Command to set the redemption limit for a gift card code
  const redeemLimit = parseInt(message.trim());

  if (isNaN(redeemLimit) || redeemLimit < 1) {
    Bot.sendMessage("*❌INVALID INPUT*\n_Invalid redemption limit. Please enter a positive numeric value._");
  } else {
    // Store the redemption limit (e.g., in a database or other storage)
    Bot.setProperty("redeemLimit", redeemLimit, "integer");
    Bot.runCommand("/gift0")
  }

