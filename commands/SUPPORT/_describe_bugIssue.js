/*CMD
  command: /describe_bugIssue
  help: 
  need_reply: true
  auto_retry_time: 
  folder: SUPPORT
  answer: *Send the product name.*

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

  // Ensure request.message and request.message.text are defined
  if (typeof request !== 'undefined' && message && message) {
    // Get the user's message (product name)
    var productName = message;

    // Remove leading/trailing spaces manually (if any)
    productName = productName.replace(/^\s+|\s+$/g, '').toLowerCase();

    // Normalize the purchase history to lowercase for comparison
    var normalizedPurchaseHistory = purchaseHistory.map(function(item) {
      return item.toLowerCase();
    });

    // Check if the purchase history exists and contains products
    if (normalizedPurchaseHistory.length > 0) {
      // Check if the product name is in the purchase history
      if (normalizedPurchaseHistory.includes(productName)) {
        // Save the product name as a User property
        User.setProperty("selectedProduct", productName, "string");
        // Proceed to the next command (e.g., /description_bugIssue)
        Bot.runCommand("/description_bugIssue");
      } else {
        // Deny the user if the product name is not in the purchase history
        Bot.sendMessage("❌ The product name you provided is not in your purchase history.");
      }
    } else {
      // Deny the user if the purchase history is empty
      Bot.sendMessage("❌ You have no recorded purchases. Support isn't available at this time. Proceed to /report_others for other related issues.");
    }
  } else {
    // Deny the user if the product name is not provided
    Bot.sendMessage("❌ Please provide a product name.");
  }
}

// Example usage:
checkPurchaseHistory();
