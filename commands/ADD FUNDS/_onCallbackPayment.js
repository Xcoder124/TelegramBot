/*CMD
  command: /onCallbackPayment
  help: 
  need_reply: false
  auto_retry_time: 
  folder: ADD FUNDS

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (!options) return
let OrderId = User.getProperty("OrderId")
let depositAmount = parseFloat(User.getProperty("depositAmount"))
var balance = Libs.ResourcesLib.userRes("usd")
if (options.status === "Confirming") {
  Bot.sendMessage(
    `*Transaction has been made*\nYour transaction with a value of *${options.payAmount} ${options.payCurrency}* has been received and is being confirmed.\nPlease be patient.`
  )
} else if (options.status === "Paid") {
  Bot.sendMessage(
    `  ---\n*✅ Transaction Complete!*\n*Amount Paid:* ${options.payAmount} ${
      options.payCurrency
    }\n*Balance Added:* 💎*${depositAmount.toFixed(
      2
    )}*\n_Thank you for your transaction. If you have any questions or require further assistance, please don't hesitate to reach out._\n\n---`
  )

  balance.add(depositAmount) // Add the total amount including the bonus

  // Update transaction history
  var transactions = User.getProperty("transactions", [])
  transactions.unshift({
    date: new Date().toISOString().split("T")[0],
    type: "Deposit",
    amount: depositAmount
  })
  User.setProperty("transactions", transactions, "json")
}

Bot.sendMessageToChatWithId(
  "6761138851",
  "---\n*📃 INVOICE*\n*TrackId:* " +
    options.trackId +
    "\n*Status:* " +
    options.status +
    "\n*OrderID:* " +
    OrderId +
    "\n*Amount:* 💎" +
    depositAmount.toFixed(2) +
    "\n*Ordered By:* " +
    user.first_name +
    " " +
    user.last_name +
    " (" +
    user.telegramid +
    ")\n---"
)

