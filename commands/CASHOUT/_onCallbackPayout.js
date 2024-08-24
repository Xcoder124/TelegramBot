/*CMD
  command: /onCallbackPayout
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

if (options.status == 'Confirming')
  Bot.sendMessage(`*⚙️ BJSMasterSyntaxJava Withdrawal*\nYou're withdrawal is on process.. this will take some time.`)
else if(options.status == 'Complete'){
  Bot.sendMessage(`*✅ Withdrawal Complete!*\nThe withdrawal has been completed\nPlease check your wallet, thank you for your patience.`)
}
