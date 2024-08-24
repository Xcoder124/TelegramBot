/*CMD
  command: gift
  help: 
  need_reply: true
  auto_retry_time: 
  folder: GIFTCARDS
  answer: Enter amount

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

if (message < 0.05) {
  Bot.sendMessage(
    "*❌ INVALID INPUT*\n_The minimum amount of giftcard value is 0.05._"
  )
} else {
  var value = message

  if (!isNumeric(value)) {
    Bot.sendMessage(
      "*❌ INVALID INPUT*\n_Invalid value, the value must be numeric/numerical._*"
    )
  } else {
    Bot.setProperty("giftCardValue", value, "string") // Save the value correctly
    Bot.runCommand("/gift2")
  }
}

