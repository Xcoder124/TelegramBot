/*CMD
  command: /deleteListingSetProduct
  help: 
  need_reply: true
  auto_retry_time: 
  folder: BJS

  <<ANSWER
*ℹ️ Delete Listing*
Identify what is the unique number of your listing and send it here.
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Function to gather and delete product listing
function deleteProductListing(productId) {
  var productListingData = Bot.getProperty("productListingData", []);
  if (productListingData.length === 0) {
    Bot.sendMessage("*🔎 PRODUCTS*\n_It seems theres no listings have made this time._");
    return;
  }

  // Find the product to delete
  var productIndex = productListingData.findIndex(
    p => p.ProductUniqueId == productId
  );
  if (productIndex === -1) {
    Bot.sendMessage("❌ Product with ID " + productId + " not found.");
    return;
  }

  var product = productListingData[productIndex];

  // Display the product information before deletion
  Bot.sendMessage(
    "🔍 *Product Information*\n\n" +
    "*Seller:* " + product.Seller + "\n" +
    "*Name:* " + product.Name + "\n" +
    "*Price:* " + product.Price + "💎\n" +
    "*Description:* " + product.Description + "\n" +
    "*Info:* " + product.Info + "\n" +
    "*Status:* " + product.Status + "\n\n" +
    "_The product with ID " + productId + " will now be deleted.\nThis cannot be undone._"
  );

  // Set the deleted product unique ID
  var deletedProduct = {
    ...product,
    ProductUniqueId: "deletedProduct" + productId,
    originalProductId: productId
  };

  // Remove the product from the active list and update the productListingData
  productListingData.splice(productIndex, 1);

  // Reassign product numbers to fill the gap left by the deleted product
  for (var i = productIndex; i < productListingData.length; i++) {
    productListingData[i].ProductUniqueId = i + 1;
  }

  // Save the deleted product information in a separate property
  var deletedListing = Bot.getProperty("deletedListing", []);
  deletedListing.push(deletedProduct);
  Bot.setProperty("deletedListing", deletedListing, "json");

  // Save updated product listing data
  Bot.setProperty("productListingData", productListingData, "json");

  // Deduct 1 from global productUniqueIDs
  var productUniqueIDs = Libs.ResourcesLib.anotherChatRes(
    "productUniqueIDs",
    "global"
  );
  productUniqueIDs.add(-1);

  // Update the product listing string
  var productListing = Bot.getProperty("productListing", "");
  if (productListing) {
    var productListingArray = productListing.split("\n");
    var updatedProductListingArray = productListingArray.filter(function(item) {
      return !item.startsWith(productId + ".");
    });

    // Rearrange product listing numbers
    for (var i = 0; i < updatedProductListingArray.length; i++) {
      var parts = updatedProductListingArray[i].split(". ");
      var newId = i + 1;
      updatedProductListingArray[i] = newId + ". " + parts[1];
    }

    Bot.setProperty("productListing", updatedProductListingArray.join("\n"), "string");
  }
    Bot.sendMessage("Product deleted successfully. Your current product listings have been updated.");
  }
// Example usage
var productId = parseInt(message);  // Assuming the product ID to delete is provided as the message
deleteProductListing(productId);
