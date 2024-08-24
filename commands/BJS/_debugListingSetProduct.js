/*CMD
  command: /debugListingSetProduct
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

// Function to debug and fix product listings
function debugProductListings() {
  var productListing = Bot.getProperty("productListing");
  if (!productListing) {
    Bot.sendMessage("You have no products listed.");
    return;
  }

  var productListArray = productListing.split("\n");
  var updatedProductList = [];
  var productListingData = Bot.getProperty("productListingData", []);

  if (productListingData.length === 0) {
    Bot.sendMessage("You have no products listed.");
    return;
  }

  // Create a mapping of old productUniqueIds to new sequential IDs
  var newProductIdMap = {};
  var newProductId = 1;

  for (var i = 0; i < productListArray.length; i++) {
    var item = productListArray[i];
    var currentProductId = parseInt(item.split(".")[0]);

    // Map old product ID to new sequential product ID
    newProductIdMap[currentProductId] = newProductId;

    // Update the product listing with the new sequential ID
    updatedProductList.push(newProductId + ". " + item.split(". ")[1]);
    newProductId++;
  }

  // Update the productListingData with new sequential product IDs
  for (var j = 0; j < productListingData.length; j++) {
    var product = productListingData[j];
    var oldProductId = parseInt(product.ProductUniqueId);

    if (newProductIdMap[oldProductId] !== undefined) {
      product.ProductUniqueId = newProductIdMap[oldProductId].toString();
    }
  }

  Bot.setProperty("productListing", updatedProductList.join("\n"), "string");
  Bot.setProperty("productListingData", productListingData, "json");

  Bot.sendMessage("*✅ Debugged*\nThe product listings have been debbuged.");
}

// Example usage
debugProductListings();
