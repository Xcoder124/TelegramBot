/*CMD
  command: 📞 SUPPORT
  help: 
  need_reply: false
  auto_retry_time: 
  folder: SUPPORT

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Variable to store the number of reports
var reportCount = Bot.getProperty("report_count", 0);
  if (reportCount > 2) {
    Bot.setProperty("high_demand", true, "boolean");
}

// Check for high demand
var highDemand = Bot.getProperty("high_demand", false);

// Define the buttons for the inline keyboard
var buttons = [
  [{ title: "🪲 Report Bug", command: "/report_bug" }],
  [{ title: "Others", command: "/report_others" }]
];

// Message to be sent
var message = "How can we assist you today?\n*📃 INFO'S:*\n*🪲 Report Bug* - If you encounter any bugs in our service and code. Report it immediately.\n*Others* - Any other services?";

// Append high demand message if applicable
if (highDemand) {
  message += "\n\n_⚠️ We are currently experiencing high demand. Response times may be longer than usual._";
}

// Send the inline keyboard to the user
Bot.sendInlineKeyboard(buttons, message);
