/*CMD
  command: /discountSendTo
  help: 
  need_reply: true
  auto_retry_time: 
  folder: GIFTCARDS
  answer: Send to

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

Bot.setProperty("TgId", message, "string")
Bot.runCommand("/discountExpiration")
