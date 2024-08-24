/*CMD
  command: /describe_bug
  help: 
  need_reply: true
  auto_retry_time: 
  folder: SUPPORT
  answer: Describe

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Command 2: /describe_bug
function handleDescribeBug(user, productTitle) {
  var hasPurchasedProducts = checkUserPurchases(user.telegramid);
  
  if (hasPurchasedProducts) {
    var purchaseHistory = Bot.getProperty("purchaseHistory" + user.telegramid);
    
    if (purchaseHistory.includes(productTitle)) {
      Bot.sendMessage("Thank you for reporting the issue with " + productTitle + ". Please provide a brief description of the bug.");
    } else {
      Bot.sendMessage("The provided product title is not valid. Please retry with a purchased product name.");
    }
  } else {
    Bot.sendMessage("No purchased products found. Support is unavailable.");
  }
}

// Example usage:
var user = { telegramid: user.telegramid }; // Replace with actual user ID
handleReportBug(user); // User selects a product
// After user selects a product, call handleDescribeBug(user, selectedProductTitle)
