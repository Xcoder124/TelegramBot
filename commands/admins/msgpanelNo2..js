/*CMD
  command: msgpanelNo2.
  help: 
  need_reply: true
  auto_retry_time: 
  folder: admins

  <<ANSWER
*BJSMasterSyntaxJavaBot*
Send your reply.
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var admin = 
Bot.getProperty("admin", "6761138851")
if(user.telegramid == admin){
var messageReply =
User.getProperty("replyMessage")
Bot.sendMessage("*✅ Message has been successfully sent.*")
Bot.sendMessageToChatWithId(messageReply, "*📩 Reply from our Admins.*\n\n_"+message+"_")
}else{
Bot.sendMessage("")
}
