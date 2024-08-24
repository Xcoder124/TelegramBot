/*CMD
  command: /date
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

var now = new Date()
var gmtPlus8 = new Date(now.getTime() + 8 * 60 * 60 * 1000)

// Format the adjusted date using dateFormat
var formattedDate = Libs.DateTimeFormat.format(gmtPlus8, "ddd mmm dd yyyy HH:MM ss")

Bot.sendMessage(formattedDate)

