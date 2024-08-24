/*CMD
  command: /onTransfer
  help: 
  need_reply: false
  auto_retry_time: 
  folder: CASHOUT

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (!options) return

if (options.result == 100) {
  Bot.sendMessage(
    `*⚠️ Withdrawal of *${options.amount}* *${options.currency}* has been submitted in our financial service.\n_🆔 Tracking ID: ${options.trackId}_`
  )
} else {
  Bot.setProperty("withdrawalsOpen", "closed", "string")
  var withdrawalDetails = User.getProperty("withdrawalDetails")
  var amount = withdrawalDetails.amount
  var withdrawableBalance = Libs.ResourcesLib.userRes("withdrawableBalance")
  withdrawableBalance.add(+amount)
  Bot.sendMessage(
    `*😵 BJSMasterSyntaxJava Withdrawal*\nOpps we cant manage your withdrawal right now and technical issue has occured.\n\nWithdrawals are closed for today, check back later`
  )
}

if (options.status == "complete") {
  Bot.sendMessage(`*✅ Withdrawal Complete!*\nThe withdrawal has been completed!\n\n*ℹ️ INFO:*\n*Currency*: *${options.currency} ${options.network}*\n*Amount*: *${options.amount}*\nTracking ID: ${options.trackId}\n\nPlease check your wallet, thank you for your patience.`)
}

