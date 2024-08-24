/*CMD
  command: /buy
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

// /buy command
var callbackData = message.split(" "); // Assuming callback_data is "/buy {ProductUniqueId}"
var productUniqueId = callbackData[1];  // Extract the product ID

var productListingData = Bot.getProperty("productListingData", []);
var product = productListingData.find(item => item.ProductUniqueId == productUniqueId);

function convertDiamondsToDollars(diamonds) {
  return (diamonds / 1000).toFixed(2);
}

function displayProductInfo(product) {
  if (!product) {
    Bot.sendMessage("Product not found with ID: " + productUniqueId);
    return;
  }

  var seller = product.Seller;
  var name = product.Name;
  var price = product.Price;
  var description = product.Description;
  var status = product.Status;
  var ratingData = Bot.getProperty("Rating" + product.ProductUniqueId, {
    totalRatings: 0,
    numberOfRatings: 0,
    averageRating: 0
  });

  var purchases = Libs.ResourcesLib.anotherChatRes("purchases" + product.ProductUniqueId, "global").value();
  var noRated = Libs.ResourcesLib.anotherChatRes("sumRated" + product.ProductUniqueId, "global").value();
  var error = Bot.getProperty("error" + product.ProductUniqueId) || "No reported errors";
  var available = Bot.getProperty("Sello" + Bot.getProperty("OnOff" + product.ProductUniqueId));

  var priceText = available == "Off" ? "Not Available" : "*💎 " + price + "* ~ $" + convertDiamondsToDollars(price);
  var message = "📚 *" + name + "*\nby *" + seller + "*\n" +
                "==================================\n" +
                description + "\n" +
                "==================================\n" +
                priceText + "\n" +
                "==================================\n" +
                "⭐ *Rating*: " + ratingData.averageRating.toFixed(2) + "/5.00 ~ " + noRated + " users rated this\n" +
                "🛒 *Purchases*: " + purchases + "\n" +
                "==================================\n" +
                "⚠️ *Recent Errors*: " + error + "\n" +
                "⌛ *Status*: " + status + "\n" +
                "==================================\n";

  return message;
}

// Check if the user already owns the product
var purchaseHistory = Bot.getProperty("obtainedItems" + user.telegramid, []);
var alreadyPurchased = purchaseHistory.some(item => item.itemId == productUniqueId);

// Determine the button text based on purchase history
var buttonText = alreadyPurchased ? "🛒 VIEW PRODUCT" : "🛒 BUY";
var command = alreadyPurchased ? "/viewProductDetails" : "Codes_2"; // Adjust the command if needed

// Display product info with inline buttons for Buy/View and Back
var productInfoMessage = displayProductInfo(product);
if (productInfoMessage) {
  var buttons = [
    [{ text: buttonText, callback_data: command + " " + productUniqueId }],
    [{ text: "❌ Back", callback_data: "/buyCode" }]
  ];
  
  Api.sendMessage({
    chat_id: chat.chatid,
    text: productInfoMessage,
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({ inline_keyboard: buttons })
  });
}
