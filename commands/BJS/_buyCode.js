/*CMD
  command: /buyCode
  help: 
  need_reply: false
  auto_retry_time: 
  folder: BJS

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 🛒 buy codes
  group: 
CMD*/

var productList = Bot.getProperty("productListing");
var storeStatus = Bot.getProperty("storeStatus");

if (storeStatus === "maintenance") {
    Bot.sendMessage("🛠️ The store is currently under maintenance. Please check back later.");
} else if (storeStatus === "offline") {
    Bot.sendMessage("🛍️ The store is offline. Please check back later.");
} else if (!productList || productList.trim().split("\n").length === 0) {
    Bot.sendMessage("*📚 RESOURCES*\n_Find a BJS code you need._\n\n*No products are live right now.*\n\nStay tuned for new products...");
} else {
    // Assume productListingData contains an array of products with ProductUniqueId
    var productListingData = Bot.getProperty("productListingData", []);
    var products = productList.trim().split("\n").filter(p => p.trim() !== "");
    var productCount = products.length;

    var pageSize = 10; // Maximum 10 listings per page
    var page = (params && params.page) ? params.page : 1;
    var start = (page - 1) * pageSize;
    var end = start + pageSize;
    var totalPages = Math.ceil(productCount / pageSize);

    // Create the message with the list of products
    var message = "*📚 RESOURCES (" + productCount + ")*\n_Find a BJS code you need._\n\n";
    var pageProducts = products.slice(start, end);

    pageProducts.forEach(function(product, index) {
        var productData = productListingData[start + index];
        if (productData) {
            // Directly append the product information, avoiding duplicate numbering
            message += product + "\n";
        }
    });

    message += "\nSelect an item using the buttons below:";

    var buttons = [];
    pageProducts.forEach(function(product, index) {
        var productData = productListingData[start + index];
        if (productData) {
            // The button text is the ProductUniqueId, and the callback_data is "/buy {ProductUniqueId}"
            buttons.push([{ text: (start + index + 1).toString(), callback_data: "/buy " + productData.ProductUniqueId }]);
        }
    });

    if (page > 1) {
        buttons.push([{ text: "⬅️", callback_data: "/viewProduct " + (page - 1) }]);
    }
    if (page < totalPages) {
        buttons.push([{ text: "➡️", callback_data: "/viewProduct " + (page + 1) }]);
    }

    var reply_markup = { inline_keyboard: buttons };

    Api.sendMessage({
        chat_id: chat.chatid,
        text: message,
        parse_mode: "Markdown",
        reply_markup: JSON.stringify(reply_markup)
    });
}
