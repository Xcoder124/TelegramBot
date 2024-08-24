/*CMD
  command: createListingSetProduct
  help: 
  need_reply: true
  auto_retry_time: 
  folder: BJS

  <<ANSWER
*ℹ️ Deliver your Product*
Enter your BJS code or an HTTP URL.

_TIPS:_
_For an BJS code, we recommend to store your BJS code in a safe place in an URL Type to avoid your BJS code to fill out the entire convo of your customer especially for those BJS that has too many variables, params and functions._
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var coder = Bot.getProperty("freelancer", user.telegramid);

function isBanned(userId) {
  let banUntilStr = User.getProperty("banUntil_" + userId);
  if (!banUntilStr) return false;
  Bot.runCommand("@");
  return;
}

if (coder) {
  // Collect product details from the user
  var sellerFullName = user.first_name;
  if (user.last_name) {
    sellerFullName += " " + user.last_name;
  }
  
  var sellerId = user.telegramid;
  var seller = sellerFullName + " (" + sellerId + ")";
  var tempData = User.getProperty("temporaryListingInfo");
  var itemName = tempData.listingTitle;
  var itemPrice = parseFloat(tempData.listingPrice);
  var itemDescription = tempData.listingDescription;
  var itemInfo = message;

  // Ensure itemInfo does not exceed 1500 characters
  if (itemInfo.length > 1500) {
    Bot.sendMessage("❌ Character Limit has been reached, use URL Type instead.\n\n_This is to avoid parsing messages error in Telegram API._");
    return;
  }

  // Save updated itemInfo
  tempData.itemInfo = itemInfo;
  User.setProperty("temporaryListingInfo", tempData, "json");

  var productUniqueIDs = Libs.ResourcesLib.anotherChatRes("productUniqueIDs", "global");
  productUniqueIDs.add(1);

  // Retrieve existing temporary product information
  var tempProductInfoArray = Bot.getProperty("tempProductInfo", []);
  
  // Create new product information
  var tempProductInfo = {
    productUniqueId: productUniqueIDs.value(),
    seller: seller,
    sellerFullName: sellerFullName,
    sellerId: sellerId,
    itemName: itemName,
    finalPrice: itemPrice,
    itemDescription: itemDescription,
    itemInfo: itemInfo,
    status: "PENDING"
  };

  // Add new product to the array
  tempProductInfoArray.push(tempProductInfo);

  // Save the updated temporary product information
  Bot.setProperty("tempProductInfo", tempProductInfoArray, "json");

  // Retrieve existing freelancing listing data
  var freelancingListing = Bot.getProperty("freelancingListing" + user.telegramid, []);
  
  // Add the new product to the array
  freelancingListing.push(tempProductInfo);

  // Save the updated freelancing listing data
  Bot.setProperty("freelancingListing" + user.telegramid, freelancingListing, "json");

  // Create approval message for admin
  var approvalMessage =
    "📃 *APPROVAL REQUIRED*\n" +
    itemName + " (" + itemPrice.toFixed(2) + "💎) - [" + sellerFullName + "](tg://user?id=" + sellerId + ")\n" +
    " - SellerId: " + sellerId + "\n" +
    " - ProductUniqueId: " + productUniqueIDs.value() + "\n" +
    "/view " + sellerId + " " + productUniqueIDs.value() + "\n\n";

  // Inline keyboard for admin to Accept or Decline
  var buttons = [
    [{ text: "Accept", callback_data: "/approve " + productUniqueIDs.value() }],
    [{ text: "Decline", callback_data: "/decline " + productUniqueIDs.value() }]
  ];

  // Send message to admin
  Api.sendMessage({
    chat_id: "6761138851", // Replace with actual admin Telegram ID
    text: approvalMessage,
    parse_mode: "Markdown",
    reply_markup: { inline_keyboard: buttons }
  });

  // Notify user that the listing is under review
  Api.sendMessage({
    chat_id: sellerId,
    text: "```json\n" +
      "{\n" +
      "  \"title\": \"⌛ Your listing needs approval.\",\n" +
      "  \"description\": \"Your item, " + itemName + ", has been listed for " + itemPrice.toFixed(2) + "💎. Needs for approval to be listed.\",\n" +
      "  \"message\": \"We'll respond to your listing later.\"\n" +
      "}\n" +
      "```",
    parse_mode: "Markdown"
  });
}
