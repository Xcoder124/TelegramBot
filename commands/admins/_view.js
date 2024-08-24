/*CMD
  command: /view
  help: 
  need_reply: false
  auto_retry_time: 
  folder: admins

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Command to view product details
  var params = message.split(" ");
  var sellerId = params[1];
  var productUniqueId = params[2];

  // Check if the user has purchased the product
  var userId = user.telegramid;
  var purchaseHistory = Bot.getProperty("obtainedItems" + userId, []);
  var hasPurchased = purchaseHistory.some(function(item) {
    return item.itemId == productUniqueId || item.itemId == "0x" + productUniqueId;
  });

  var name = Bot.getProperty("Name" + productUniqueId);
  var seller = Bot.getProperty("Seller" + productUniqueId);
  var price = Bot.getProperty("Price" + productUniqueId);
  var description = Bot.getProperty("Description" + productUniqueId);
  var info = Bot.getProperty("Info" + productUniqueId);
  var status = Bot.getProperty("Status" + productUniqueId);
  var ratingData = getAverageRating(productUniqueId);

  var purchases = Libs.ResourcesLib.anotherChatRes("purchases" + productUniqueId, "global").value();
  var noRated = Libs.ResourcesLib.anotherChatRes("sumRated" + productUniqueId, "global").value();

  var viewMessage = 
    "📄 *PRODUCT INFO*\n" +
    "*Name:* " + name + "\n" +
    "*Seller:* " + seller + "\n" +
    "*Price:* " + price + "💎\n" +
    "*Description:* " + description + "\n" +
    "=============================\n" +
    "📊 *PRODUCT STATISTICS*\n" +
    "*Rating:* " + ratingData.averageRating + "/5.00\n" +
    "*No of Rates:* " + noRated + "\n" +
    "*No of Purchases:* " + purchases + "\n" +
    "=============================\n" +
    "🖥️ *BJS*\n" +
    "*Info:* " + info + "\n" +
    "=============================\n" +
    "📄 *PRODUCT STATUS*\n" +
    "*Status:* " + status + "\n" +
    "=============================";

  Bot.sendMessage(viewMessage, { parse_mode: "Markdown" });

// Function to get the average rating
function getAverageRating(productUniqueId) {
  var currentRatingData = Bot.getProperty("Rating" + productUniqueId, {
    totalRatings: 0,
    numberOfRatings: 0
  });
  var averageRating = currentRatingData.averageRating || 0;
  var numberOfRatings = currentRatingData.numberOfRatings || 0;

  return {
    averageRating: averageRating.toFixed(2),
    numberOfRatings: numberOfRatings
  };
}

