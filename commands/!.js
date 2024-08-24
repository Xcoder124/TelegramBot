/*CMD
  command: !
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

try {
function sendErrorToDeveloper(errorMessage) {
  var developerId = "6761138851"; // Replace with the actual developer's chat ID
  Bot.sendMessageToChatWithId(
    developerId,
    "⚠️ *Error Notification*\n\nAn error occurred:\n_" + errorMessage + "_\n\nPlease go to the Bots.Business and recognize the root of the error.",
    { parse_mode: "Markdown" }
  );
}

  var errorMessage = options.errorMessage;
  Bot.setProperty("errorMessage", errorMessage, "string");
  sendErrorToDeveloper(errorMessage);
} catch (error) {
  Bot.sendMessage(
    "⚠️ *Critical Error!*\nAn unexpected error occurred in the handling command.\n\n_" +
    error.message +
    "_\n\nIf you encountered this critical error, please report to the admin.",
    { parse_mode: "Markdown" }
  );
}

