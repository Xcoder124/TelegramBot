/*CMD
  command: /createListingSetProductTestV1
  help: 
  need_reply: true
  auto_retry_time: 
  folder: BJS

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var productListing = Bot.getProperty("productListing");
var sellerFullName = user.first_name + " " + user.last_name;
var sellerId = user.telegramid;
var seller = sellerFullName + " (" + sellerId + ")";
var itemName = User.getProperty("listingTitle");
var itemPrice = parseFloat(User.getProperty("listingPrice"));
var itemDescription = User.getProperty("listingDescription");
var itemInfo = message;

// Ensure itemInfo does not exceed 1500 characters
if (itemInfo.length > 1500) {
  Bot.sendMessage("❌ Character Limit has been reached, use URL Type instead.\n\n_This is to avoid parsing messages error in Telegram API._");
}

// Deduct 5% for bot fees
// var finalPrice = itemPrice - (itemPrice * 0.05);

var productUniqueIDs = Libs.ResourcesLib.anotherChatRes("productUniqueIDs", "global");
var totalProducts = Libs.ResourcesLib.anotherChatRes("totalProducts", "global");
productUniqueIDs.add(1);
totalProducts.add(1);

// Set properties with the new seller name format and adjusted price
Bot.setProperty("Seller" + productUniqueIDs.value(), seller, "string");
Bot.setProperty("Name" + productUniqueIDs.value(), itemName, "string");
Bot.setProperty("Price" + productUniqueIDs.value(), itemPrice.toString(), "string");
Bot.setProperty("Description" + productUniqueIDs.value(), itemDescription, "string");
Bot.setProperty("Info" + productUniqueIDs.value(), itemInfo, "string");
Bot.setProperty("Status" + productUniqueIDs.value(), "LISTED", "string");

// Send a Discord-like embed message
Bot.sendMessage("```json\n" +
  "{\n" +
  "  \"title\": \"✅ Listing Added Successfully\",\n" +
  "  \"description\": \"Your item, " + itemName + ", has been listed for " + itemPrice.toFixed(2) + "💎. This is the amount you will receive after the bot fee which is 5% fee deduction when the item is sold.\",\n" +
  "  \"message\": \"Your listing is on review before it gets listed on our database. Please be patient.\"\n" +
  "}\n" +
  "```");


Bot.setProperty("SellerTotalProducts" + sellerId, productUniqueIDs.value().toString(), "string");

// Update the product listing
if (productListing === undefined) {
  Bot.setProperty("productListing", productUniqueIDs.value() + ". " + itemName + " (" + itemPrice.toFixed(2) + "💎)", "string");
} else {
  Bot.setProperty("productListing", productListing + "\n" + productUniqueIDs.value() + ". " + itemName + " (" + itemPrice.toFixed(2) + "💎)", "string");
}

