/*CMD
  command: /check
  help: 
  need_reply: true
  auto_retry_time: 
  folder: CODER PANEL

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Function to check balances and return the sufficient balance type and amount
function checkBalances(totalRefund) {
  var sellerUsdBalance = Libs.ResourcesLib.userRes("usd");
  var sellerDiamondsBalance = Libs.ResourcesLib.userRes("diamonds");
  var sellerPendingBalance = Libs.ResourcesLib.userRes("pendingBalance");

  var refundInUsd = totalRefund / 1000;  // Convert diamonds to USD

  if (sellerUsdBalance.value() >= refundInUsd) {
    return { type: "usd", amount: refundInUsd };
  } else if (sellerPendingBalance.value() >= refundInUsd) {
    return { type: "pendingBalance", amount: refundInUsd };
  } else if (sellerDiamondsBalance.value() >= totalRefund) {
    return { type: "diamonds", amount: totalRefund };
  } else {
    return null;  // Insufficient funds
  }
}

// Function to gather and delete product listing, and refund buyers
function deleteProductListing(productId) {
  var sellerId = user.telegramid;  // Get the current user's telegram ID
  var productListing = Bot.getProperty("productListing");

  if (!productListing) {
    Bot.sendMessage("You have no products listed.");
    return;
  }

  var seller = Bot.getProperty("Seller" + productId);
  var name = Bot.getProperty("Name" + productId);
  var price = Bot.getProperty("Price" + productId);
  var description = Bot.getProperty("Description" + productId);
  var info = Bot.getProperty("Info" + productId);
  var status = Bot.getProperty("Status" + productId);

  // Ensure that the product exists before attempting to delete it
  if (!seller || !name || !price || !description || !info || !status) {
    Bot.sendMessage("❌ Product with ID " + productId + " not found.");
    return;
  }

  // Check if the current user is the seller of the product
  if (seller !== (user.first_name + " " + user.last_name + " (" + sellerId + ")")) {
    Bot.sendMessage("❌ You are not authorized to delete this product.");
    return;
  }

  // Display the product information before deletion
  Bot.sendMessage(
    "🔍 *Product Information*\n\n" +
      "*Seller:* " + seller + "\n" +
      "*Name:* " + name + "\n" +
      "*Price:* " + price + "💎\n" +
      "*Description:* " + description + "\n" +
      "*Info:* " + info + "\n" +
      "*Status:* " + status + "\n\n" +
      "_The product with ID " + productId + " will now be deleted.\nThis cannot be undone._"
  );

  // Find buyers who purchased this product
  var buyers = [];
  var allPurchaseHistories = Bot.getProperty("purchaseHistories") || [];

  allPurchaseHistories.forEach(function(purchase) {
    if (purchase.itemId == productId) {
      buyers.push(purchase.purchasedBy);
    }
  });

  // Calculate total refund amount
  var totalRefund = parseFloat(price) * buyers.length;
  var sufficientBalance = checkBalances(totalRefund);

  // If no sufficient balance is found, notify and stop the process
  if (!sufficientBalance) {
    Bot.sendMessage("❌ Insufficient funds to cover the refund.");
    return;
  }

  // Refund each buyer
  buyers.forEach(function(buyerId) {
    let res = Libs.ResourcesLib.anotherUserRes("money", buyerId);
    res.add(parseFloat(price) / 1000);  // Refund in USD
  });

  // Deduct the seller's balance
  var balanceType = sufficientBalance.type;
  var amountToDeduct = sufficientBalance.amount;

  if (balanceType === "usd") {
    var sellerUsdBalance = Libs.ResourcesLib.userRes("usd");
    sellerUsdBalance.add(-amountToDeduct);
  } else if (balanceType === "pendingBalance") {
    var sellerPendingBalance = Libs.ResourcesLib.userRes("pendingBalance");
    sellerPendingBalance.add(-amountToDeduct);
  } else if (balanceType === "diamonds") {
    var sellerDiamondsBalance = Libs.ResourcesLib.userRes("diamonds");
    sellerDiamondsBalance.add(-amountToDeduct);
  }

  // Delete the product properties
  Bot.setProperty("Seller" + productId, null);
  Bot.setProperty("Name" + productId, null);
  Bot.setProperty("Price" + productId, null);
  Bot.setProperty("Description" + productId, null);
  Bot.setProperty("Info" + productId, null);
  Bot.setProperty("Status" + productId, null);

  // Remove the product from the product listing
  var productListArray = productListing.split("\n");
  productListArray = productListArray.filter(item => !item.startsWith(productId + "."));
  Bot.setProperty("productListing", productListArray.join("\n"), "string");

  // Update product counters
  var productUniqueIDs = Libs.ResourcesLib.anotherChatRes("productUniqueIDs", "global");
  var totalProducts = Libs.ResourcesLib.anotherChatRes("totalProducts", "global");
  productUniqueIDs.add(-1);
  totalProducts.add(-1);

  Bot.sendMessage("*ℹ️ INFO*\nYour product with ID " + productId + " has been permanently deleted.");
}

// Example usage
var productId = parseInt(message);  // Assuming the product ID to delete is provided as the message
deleteProductListing(productId);
