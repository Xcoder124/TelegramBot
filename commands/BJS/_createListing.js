/*CMD
  command: /createListing
  help: 
  need_reply: true
  auto_retry_time: 
  folder: BJS

  <<ANSWER
*ℹ️ Create a new Listing*
_Set a new title for your listing_
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 💈 new listing
  group: 
CMD*/

// Regular expression to match only letters, numbers, spaces, and currency signs
let regex = /^[A-Za-z0-9 $€£¥₹]+$/;

// Check if the message contains any special characters
if (!regex.test(message)) {
  Bot.sendMessage(
    "*ℹ️ INFO*\nThe listing title contains special characters. Please use only letters, numbers, spaces, and currency signs.\n*Please try again /createListing*"
  );
} else {
  // Get the current product listing data
  var productListingData = Bot.getProperty("productListingData", []);
  
  // Check for duplicate names in the existing product list
  var duplicateFound = productListingData.some(function(product) {
    return product.Name.toLowerCase() === message.toLowerCase(); // Case-insensitive comparison
  });
  
  if (duplicateFound) {
    Bot.sendMessage(
      "*⚠️ WARNING*\nA product with this name already exists. Please use a different name for your listing.\n*Please try again /createListing*"
    );
  } else {
    // Proceed with the creation process if no duplicate is found
    let tempData = {
      listingTitle: message,
      listingPrice: "",
      listingDescription: "",
      itemInfo: ""
    };
    User.setProperty("temporaryListingInfo", tempData, "json");
    Bot.runCommand("/createListingSetPrice");
  }
}
