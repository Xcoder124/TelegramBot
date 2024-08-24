/*CMD
  command: /close
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: true or false?

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var closed = Bot.getProperty("closed")
if (closed == "true") {
  Bot.setProperty("closed", message, "string")
  return
}

