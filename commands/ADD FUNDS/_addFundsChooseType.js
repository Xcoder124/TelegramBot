/*CMD
  command: /addFundsChooseType
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

let inlineKeyboard = [
  [{ text: "Pay with OxaPay", callback_data: "pay_oxapay" }]
]

// Send a message with the inline keyboard to the user
Api.sendMessage({
  chat_id: user.telegramid,
  text: "Please choose your payment method:",
  reply_markup: JSON.stringify({ inline_keyboard: inlineKeyboard })
})

