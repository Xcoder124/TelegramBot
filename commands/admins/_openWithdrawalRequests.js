/*CMD
  command: /openWithdrawalRequests
  help: 
  need_reply: true
  auto_retry_time: 
  folder: admins
  answer: closed or opened?

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (!Libs.Guard.verifyAccess()) return
Bot.setProperty("withdrawalsOpen", message, "string");
Bot.sendMessage("Withdrawal Requests are now "+message+".")
