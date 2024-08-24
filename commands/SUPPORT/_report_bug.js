/*CMD
  command: /report_bug
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

// Command to check the user's purchase history
function checkPurchaseHistory() {
  // Retrieve the purchase history from the user's properties
  var userId = user.telegramid;
  var purchaseHistory = Bot.getProperty("purchaseHistory" + userId, []);

  // Check if the purchase history exists and contains products
  if (purchaseHistory.length > 0) {
    // Format the purchase history for display
    var formattedHistory = "*📃 Please send the exact name of the product to continue:*\n_Support aren't available if no purchase history was found. Instead, proceed to_ *Others* _for other issues._\n\n";
    formattedHistory += purchaseHistory.map(product => `*${product}*`).join("\n");
    Bot.sendMessage(formattedHistory);
    Bot.runCommand("/describe_bugIssue")
  } else {
    Bot.sendMessage("_Support isn't available without purchase history. Proceed to_ *Others* _for other related issues._");
  }
}

// Example usage:
checkPurchaseHistory();
