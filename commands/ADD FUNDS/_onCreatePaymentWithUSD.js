/*CMD
  command: /onCreatePaymentWithUSD
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
let depositAmount = User.getProperty("depositAmount")
  var conversionRate = 1000; 
var totalDepositAmount = depositAmount / conversionRate;
// Delete the last message
Api.deleteMessage({
  chat_id: user.telegramid,
  message_id: request.message.message_id
})
if (options.result == 100) {
  Api.sendMessage({
    text: "Please pay $" + totalDepositAmount + " to complete the transaction.",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Pay $" + totalDepositAmount + "",
            web_app: { url: options.payLink }
          }
        ]
      ]
    }
  })
}

