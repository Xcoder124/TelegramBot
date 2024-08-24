/*CMD
  command: /manageMyListings
  help: 
  need_reply: false
  auto_retry_time: 
  folder: CODER PANEL

  <<ANSWER
*📃 Manager*
What actions you want to perform in your listings?
  ANSWER
  keyboard: ✏️ Edit, 🗑️ Delete\nBack
  aliases: 📃 manage listings
  group: 
CMD*/

// Function to list user products
function listUserProducts() {
  var sellerFullName = user.first_name + " " + user.last_name;
  var sellerId = user.telegramid;
  var sellerIdentifier = sellerFullName + " (" + sellerId + ")";

  var productUniqueIDs = Libs.ResourcesLib.anotherChatRes("productUniqueIDs", "global");
  var totalProducts = productUniqueIDs.value();
  var userProducts = [];
  var totalProfit = 0;

  function isBanned(sellerId) {
    let banUntilStr = User.getProperty("banUntil_" + sellerId);
    if (!banUntilStr) return false;
    Bot.runCommand("@");
    return;
  }

  // Loop through all products and collect those that match the seller
  for (var i = 1; i <= totalProducts; i++) {
    var seller = Bot.getProperty("Seller" + i);
    if (seller === sellerIdentifier) {
      var name = Bot.getProperty("Name" + i);
      var price = Bot.getProperty("Price" + i);
      var description = Bot.getProperty("Description" + i);
      if (description.length > 75) {
        description = description.substring(0, 75) + "...";
      }
      var status = Bot.getProperty("Status" + i);
      var ratingData = Bot.getProperty("Rating" + i, {
        totalRatings: 0,
        numberOfRatings: 0,
        averageRating: 0
      });
      var purchases = Libs.ResourcesLib.anotherChatRes("purchases" + i, "global").value();
      var profit = Libs.ResourcesLib.anotherChatRes("profit" + i, "global").value();

      totalProfit += profit;

      userProducts.push({
        id: i,
        name: name,
        price: price,
        description: description,
        status: status,
        rating: ratingData.averageRating,
        purchases: purchases,
        profit: profit
      });
    }
  }

  // Check if the user has any products listed
  if (userProducts.length === 0) {
    Bot.sendMessage("You have no products listed.");
    return;
  }

  // Create the message to display the user's products
  var Bmessage = "*📚 Your Listings*\n\n";
  userProducts.forEach(function (product) {
    Bmessage += "🆔 *ID:* " + product.id + "\n";
    Bmessage += "📦 *Name:* " + product.name + "\n";
    Bmessage += "💎 *Price:* " + product.price + "💎\n";
    Bmessage += "📄 *Description:*\n" + product.description + "\n";
    Bmessage += "⌛ *Status:* " + product.status + "\n";
    Bmessage += "⭐ *Rating:* " + product.rating + "/5.00\n";
    Bmessage += "🛒 *Purchases:* " + product.purchases + "\n";
    Bmessage += "💰 *Revenue:* " + product.profit + "\n";
    Bmessage += "===========================\n";
  });

  Bot.sendMessage(Bmessage, { parse_mode: "Markdown" });
}

// Run the command to list user products
listUserProducts();
