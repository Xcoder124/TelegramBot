/*CMD
  command: discount
  help: 
  need_reply: true
  auto_retry_time: 
  folder: GIFTCARDS
  answer: Enter Amount

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// /discountValue: Set the discount value
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

if (message < 1 || message > 100) {
  Bot.sendMessage("*❌ INVALID INPUT*\n_The discount value must be between 1 and 100%._");
} else {
  var value = message;

  if (!isNumeric(value)) {
    Bot.sendMessage("*❌ INVALID INPUT*\n_Invalid value, the value must be numeric/numerical._*");
  } else {
    Bot.setProperty("discountValue", value, "string"); // Save the value correctly
    Bot.runCommand("/discount2");
  }
}
