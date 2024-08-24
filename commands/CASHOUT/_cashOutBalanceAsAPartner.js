/*CMD
  command: /cashOutBalanceAsAPartner
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

const withdrawalsOpen = Bot.getProperty("withdrawalsOpen");
if (withdrawalsOpen === "closed") {
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "*💸 BJSMasterSyntaxJava Withdrawals*\nOur withdrawals are closed for now.\n\n_Check back later and wait for an update._",
    parse_mode: "Markdown"
  });
  return;
}
// Delete the last message
  Api.deleteMessage({ chat_id: user.telegramid, message_id: request.message.message_id });

  var chooseCryptoMessage = "Please choose a cryptocurrency to withdraw:";
  var chooseCryptoKeyboard = [
    [{ text: "Bitcoin (BTC)", callback_data: "withdrawCrypto BTC" }],
    [{ text: "Litecoin (LTC)", callback_data: "withdrawCrypto LTC" }],
    [{ text: "TronX (TRX)", callback_data: "withdrawCrypto TRX" }],
    [{ text: "Dogecoin (DOGE)", callback_data: "withdrawCrypto DOGE" }],
    [{ text: "Tether USD (USDT)", callback_data: "withdrawCrypto USDT" }]
  ];

  Api.sendMessage({
    chat_id: user.telegramid,
    text: chooseCryptoMessage,
    reply_markup: { inline_keyboard: chooseCryptoKeyboard }
  });
