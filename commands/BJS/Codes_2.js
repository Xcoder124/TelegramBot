/*CMD
  command: Codes_2
  help: 
  need_reply: false
  auto_retry_time: 
  folder: BJS

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Codes_2 command
var callbackData = message.split(" "); // Assuming callback_data is "/buy {ProductUniqueId}"
var productUniqueId = callbackData[1];  // Extract the product ID

var productListingData = Bot.getProperty("productListingData", []);
var product = productListingData.find(item => item.ProductUniqueId == productUniqueId);

if (!product) {
  Bot.sendMessage("Product not found with ID: " + productUniqueId);
  return;
}

var available = product.Status == "LISTED";
if (!available) {
  Bot.sendMessage("*❌ Not Available*\nThis product is not available.");
  return;
}

var price = parseFloat(product.Price);
var usd = Libs.ResourcesLib.userRes("usd");
var sellerId = product.sellerId;
var purchaseHistory = Bot.getProperty("obtainedItems" + user.telegramid, []);

// Check if the item is already in the purchase history
if (purchaseHistory.some(item => item.itemId == productUniqueId)) {
  Bot.sendMessage("You have already purchased this item.");
  return;
}

// Check if the user has a discount available
var userDiscount = Bot.getProperty("userDiscount_" + user.telegramid);
if (userDiscount && userDiscount.applyDiscount && userDiscount.noOfUsage > 0) {
  if (price >= userDiscount.minPurchaseAmount && price <= userDiscount.maxPurchaseAmount) {
    var discountAmount = (price * userDiscount.discountPercentage) / 100;
    price -= discountAmount;

    // Update discount usage
    userDiscount.noOfUsage -= 1;
    if (userDiscount.noOfUsage <= 0) {
      userDiscount.applyDiscount = false;
    }
    Bot.setProperty("userDiscount_" + user.telegramid, userDiscount, "json");

    Bot.sendMessage(
      "*🏷️ Discount applied!*\nOriginal price: *💎" + (price + discountAmount).toFixed(2) + "*\nDiscount: *" +
      userDiscount.discountPercentage + "%*\nCost: *💎" + price.toFixed(2) + "*"
    );
  }
}

if (usd.value() < price) {
  Bot.sendMessage("*❌ Insufficient Balance*\nYou do not have enough balance to purchase this product.");
  return;
}

usd.add(-price);
var usd2 = Libs.ResourcesLib.anotherUserRes("usd", sellerId);
usd2.add(price);

var purchases = Libs.ResourcesLib.anotherChatRes("purchases" + productUniqueId, "global");
var profit = Libs.ResourcesLib.anotherChatRes("profit" + productUniqueId, "global");
purchases.add(1);
profit.add(price);

// Update purchase history
purchaseHistory.push({ itemId: productUniqueId, purchasedBy: user.telegramid, name: product.Name, price: price, date: new Date() });
Bot.setProperty("obtainedItems" + user.telegramid, purchaseHistory, "json");

// Send confirmation message to the user
Bot.sendMessage(
  "*📚 " + product.Name + "*\nby: " + product.Seller + "\n\n`" + product.Info + "`\n\n" +
  "_If you have any issues, please contact the seller._"
);

// Notify the seller about the purchase
Bot.sendMessageToChatWithId(
  sellerId,
  "📃 PRODUCT LOGS UPDATED\nYour code *" + product.Name + "* has been successfully purchased by " +
  user.first_name + " for *💎" + price.toFixed(2) + "*."
);

// Log the purchase event in the global purchase log
var purchaseLog = Bot.getProperty("purchaseLog", []);
purchaseLog.unshift({ date: new Date(), userId: user.telegramid, productId: productUniqueId, price: price, seller: product.Seller });
Bot.setProperty("purchaseLog", purchaseLog, "json");

// Optional: Send a thank-you message or offer next steps
Bot.sendMessage("Thank you for your purchase! You can review your purchased items at any time.");
