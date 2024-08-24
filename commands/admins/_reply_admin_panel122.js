/*CMD
  command: /reply_admin_panel122
  help: 
  need_reply: true
  auto_retry_time: 
  folder: admins

  <<ANSWER
*BJSMasterSyntaxJavaBot*
Send reply to?
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Command to handle the admin message setting
function handleAdminMessage() {
  // Retrieve the admin ID from Bot properties
  var admin = Bot.getProperty("admin", "6761138851");

  // Check if the user is the admin
  if (user.telegramid == "6761138851") {
    // Set the message ID property for the user
    User.setProperty("replyMessage", message, "string");

    // Run the "Msg_2" command
    Bot.runCommand("msgpanelNo2.");
  } else {
    // Inform the user that they are not an admin
    Bot.sendMessage("");
  }
}

// Example usage:
handleAdminMessage();
