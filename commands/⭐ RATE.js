/*CMD
  command: ⭐ RATE
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Command to check the user's purchase history
function checkPurchaseHistory() {
  // Retrieve the purchase history from the user's properties
  var userId = user.telegramid;
  var purchaseHistory = Bot.getProperty("obtainedItems" + userId, []);

  // Check if the purchase history exists and contains products
  if (purchaseHistory.length > 0) {
    // Format the purchase history for display
    var formattedHistory = "*📃 Please send the exact name of the product to continue:*\n\n";
    formattedHistory += purchaseHistory.map(product => `*${product}*`).join("\n");
    Bot.sendMessage(formattedHistory);
    Bot.runCommand("/rate_Product.")
  } else {
    Bot.sendMessage("_Rating isn't available right now._");
  }
}

// Example usage:
checkPurchaseHistory();
