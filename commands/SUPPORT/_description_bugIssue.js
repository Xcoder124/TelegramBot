/*CMD
  command: /description_bugIssue
  help: 
  need_reply: true
  auto_retry_time: 
  folder: SUPPORT
  answer: *Add description in your issue. Explain the issue clear as possible.*
  keyboard: 
  aliases: 
  group: 
CMD*/

// Command to handle the user's issue description
function handleIssueDescription() {
  // Retrieve the selected product name from User properties
  var selectedProduct = User.getProperty("selectedProduct");

  // Ensure request.message and request.message.text are defined
  if (typeof request !== 'undefined' && message && message) {
    // Get the user's issue description
    var issueDescription = message;

    // Construct the message to send to the admin
    var messageToAdmin = `*🪲 BUG REPORT*\nFrom: ${user.first_name} ${user.last_name}\nID: ${user.telegramid}\n📃 Where: ${selectedProduct}\n\nDescription:\n${issueDescription}`;

    // Send the message to the specified ChatID (e.g., 6761138851)
    Api.sendMessage({ chat_id: "6761138851", text: messageToAdmin });

    // Update the report count
    var reportCount = Bot.getProperty("report_count", 0) + 1;
    Bot.setProperty("report_count", reportCount, "integer");

    // Check if the high demand message should be set
    if (reportCount > 2) {
      Bot.setProperty("high_demand", true, "boolean");
    }

    // Check for high demand
    var highDemand = Bot.getProperty("high_demand", false);

    // Construct the user response message
    var userMessage = "✅ Your issue has been reported to the admin.\nExpect a reply within 24 hours.";
    if (highDemand) {
      userMessage += "\n\n_⚠️ We are currently experiencing high demand. Please be patient as response times may be longer than usual._";
    }

    // Inform the user
    Bot.sendMessage(userMessage);
  } else {
    // Deny the user if the issue description is not provided
    Bot.sendMessage("❌ Please provide an issue description.");
  }
}

// Example usage:
handleIssueDescription();
