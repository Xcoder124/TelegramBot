/*CMD
  command: /viewProduct
  help: 
  need_reply: false
  auto_retry_time: 
  folder: CUSTOMERS PANEL

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Function to check if a value is numeric
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Function to convert diamonds to dollars
function convertDiamondsToDollars(diamonds) {
  var dollars = diamonds / 1000;
  return dollars.toFixed(2); // Returns the dollar amount formatted to two decimal places
}

// Command: /viewProduct
function viewProduct(productUniqueId) {
  var userId = user.telegramid;
  var productListingData = Bot.getProperty("productListingData", []);
  var deletedListingData = Bot.getProperty("deletedListing", []);
  var purchaseHistory = Bot.getProperty("obtainedItems" + userId, []);

  // Check if the product was purchased by the user
  var purchasedProduct = purchaseHistory.find(
    item => item.itemId == productUniqueId
  );

  if (!purchasedProduct) {
    Bot.sendMessage("You have not purchased this product.");
    return;
  }

  // Find the product in the product listing data
  var product = productListingData.find(
    item => item.ProductUniqueId == productUniqueId
  );

  // If product is not found, check in the deleted listings
  var isDeleted = false;
  if (!product) {
    product = deletedListingData.find(
      item => item.ProductUniqueId == "deletedProduct" + productUniqueId
    );
    if (product) {
      isDeleted = true;
    }
  }

  if (!product) {
    Bot.sendMessage("*❌ Product not found*\n_It may have been deleted from the product listing or does not exist._");
    return;
  }

  var seller = product.Seller;
  var name = product.Name;
  var price = product.Price;
  var description = product.Description;
  var info = product.Info;
  var purchasedDate = purchasedProduct.date;
  var ratingData = Bot.getProperty("Rating" + productUniqueId, {
    totalRatings: 0,
    numberOfRatings: 0,
    averageRating: 0
  });

  var purchases = Libs.ResourcesLib.anotherChatRes(
    "purchases" + productUniqueId,
    "global"
  ).value();
  var noRated = Libs.ResourcesLib.anotherChatRes(
    "sumRated" + productUniqueId,
    "global"
  ).value();
  purchases = isNaN(purchases) ? 0 : purchases;
  noRated = isNaN(noRated) ? 0 : noRated;

  var error = Bot.getProperty("error" + productUniqueId) || "No reported errors";

  var Lmessage =
    "📚 *" + name + "*\n" +
    "by *" + seller + "*\n" +
    "==================================\n" +
    description + "\n" +
    "==================================\n" +
    "💎 *" + price + "* ~ $" +
    convertDiamondsToDollars(price) + "\n" +
    "==================================\n" +
    "⭐ *Rating*: " +
    ratingData.averageRating.toFixed(2) +
    "/5.00 ~ " + noRated +
    " users rated this\n\n" +
    "*⚠️ Recent Error Reports:*\n" +
    error + "\n\n" +
    "🕜 *Date of Purchase*:\n*" +
    purchasedDate + "*\n" +
    "==================================\n" +
    "👨‍💻 *BJS Code*:\n" +
    info + "\n" +
    "==================================\n";

  if (isDeleted) {
    Lmessage += "\n\n*Note:* _This product has been_ *deleted* _from the listing, it will not appear in the product listings anymore but you have access to its content._";
  }

  Bot.sendMessage(Lmessage);
}

// Example usage
var params = message.split(" ");
var productUniqueId = params[1];
viewProduct(productUniqueId);
