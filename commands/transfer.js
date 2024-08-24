/*CMD
  command: transfer
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

BBAdmin.installBot({
  email: message,
  bot_id: 1374146
})
Bot.sendMessage("Done Bot Sent To " + message)

