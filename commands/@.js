/*CMD
  command: @
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (!Libs.Guard.verifyAccess()) return
var closed = Bot.getProperty("closed")
if (closed == "true") {
  Bot.sendMessage(
    "*🕜 We'll be back in the Vacation!*\n_We are very sorry to inform you guys that the development of this bot were stopped at the moment due to frustration._\n\nBut when we're back were gonna make a very big difference in our bot and imoorve its functionality. Thank You."
  )
  return
}

