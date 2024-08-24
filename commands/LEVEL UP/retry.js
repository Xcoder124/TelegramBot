/*CMD
  command: retry
  help: 
  need_reply: true
  auto_retry_time: 
  folder: LEVEL UP

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

  let userScore = User.getProperty("user_score_" + message,0);
  let coderLevel = User.getProperty("coder_level_" + message, 1);
User.setProperty("user_score_" + message, 0, "integer");
User.setProperty("coder_level_" + message, 1, "integer");
