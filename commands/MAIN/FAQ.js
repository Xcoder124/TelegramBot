/*CMD
  command: FAQ
  help: 
  need_reply: false
  auto_retry_time: 
  folder: MAIN

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

Bot.sendMessage("*BJSMasterSyntaxJavaBot*\n\nHave questions? \n\n_Read our article on frequently asked questions. If you need further assistance, click this command to seek support /support._");
Api.deleteMessage({ message_id: request.message.message_id });

