/*CMD
  command: 👤 ACCOUNT
  help: 
  need_reply: false
  auto_retry_time: 
  folder: MAIN

  <<ANSWER
*BJSMasterSyntaxJavaBot*
_Welcome to your account preferences._
  ANSWER
  keyboard: 💰 CREDITS\n📦 COLLECTIONS, 📃 HISTORY\nBack
  aliases: account, preferences
  group: 
CMD*/

var userId = user.telegramid
function isBanned(userId) {
  let banUntilStr = User.getProperty("banUntil_" + userId)
  if (!banUntilStr) return false

  let banUntil = new Date(banUntilStr)
  return new Date() < banUntil
}

if (isBanned(user.telegramid)) {
  let banUntilStr = User.getProperty("banUntil_" + userId)
  Bot.sendMessage(
    "*⛔ RESTRICTED*\nYou're account has been restricted until *" +
      banUntilStr +
      "*.\n\nIf you think this was a mistake, contact our admin through DM."
  )
  return
}
