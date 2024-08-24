/*CMD
  command: /gift0
  help: 
  need_reply: true
  auto_retry_time: 
  folder: GIFTCARDS
  answer: Enter where to send the code

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

Bot.setProperty("TgId", message, "string")
Bot.runCommand("/gift4")


