/*CMD
  command: /setup
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

Libs.OxaPayLib.setMerchantKey("sandbox")
Libs.OxaPayLib.setPayoutApiKey("H1GKKY-PSXKR0-XN4X3W-SLFUZT");
Bot.sendMessage("Setup was completed successfully")
