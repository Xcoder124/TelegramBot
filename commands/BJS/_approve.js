/*CMD
  command: /approve
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

var params = message.split(" ");
var productUniqueId = params[1];

// Retrieve the array of temporary product information
var tempProductInfoArray = Bot.getProperty("tempProductInfo", []);

if (!Array.isArray(tempProductInfoArray) || tempProductInfoArray.length === 0) {
  Bot.sendMessage("Error: Product information not found.");
  return;
}

// Find the specific product using the productUniqueId
var tempProductInfo = tempProductInfoArray.find(item => item.productUniqueId == productUniqueId);

if (!tempProductInfo) {
  Bot.sendMessage("Error: Product information not found.");
  return;
}

// Check if the product status is DECLINED
if (tempProductInfo.status === "DECLINED") {
  Bot.sendMessage("Unable to approve a product that has been declined.");
  return;
}

// Update the product status to LISTED
tempProductInfo.status = "LISTED";

// Retrieve existing product listing data
var productListingData = Bot.getProperty("productListingData", []);
if (!Array.isArray(productListingData)) {
  productListingData = [];
}

// Create new product entry
var newProduct = {
  ProductUniqueId: productUniqueId,
  Seller: tempProductInfo.seller,
  sellerId: tempProductInfo.sellerId,
  Name: tempProductInfo.itemName,
  Price: tempProductInfo.finalPrice.toString(),
  Description: tempProductInfo.itemDescription,
  Info: tempProductInfo.itemInfo,
  Status: tempProductInfo.status,
  Rating: {
    totalRatings: 0,
    numberOfRatings: 0,
    averageRating: 0
  }
};

// Add the new product to the array
productListingData.push(newProduct);

// Save the updated product listing data
Bot.setProperty("productListingData", productListingData, "json");

// Update the product listing string
var productListing = Bot.getProperty("productListing", "");
if (!productListing) {
  productListing = productUniqueId + ". " + tempProductInfo.itemName + " (" + tempProductInfo.finalPrice.toFixed(2) + "💎)";
} else {
  productListing += "\n" + productUniqueId + ". " + tempProductInfo.itemName + " (" + tempProductInfo.finalPrice.toFixed(2) + "💎)";
}
Bot.setProperty("productListing", productListing, "string");

// Notify the seller
var sellerId = tempProductInfo.sellerId;
Api.sendMessage({
  chat_id: sellerId,
  text:
    "```json\n" +
    "{\n" +
    '  "title": "✅ Listing Added Successfully",\n' +
    '  "description": "Your item, ' +
    tempProductInfo.itemName +
    ", has been listed for " +
    tempProductInfo.finalPrice.toFixed(2) +
    '💎. This is the amount you will receive after someone purchased your code.",\n' +
    '  "message": "Your listing has been reviewed and approved. Check it out!"\n' +
    "}\n" +
    "```",
  parse_mode: "Markdown"
});
// Function to save new product entry to MongoDB
function saveNewProductToMongoDB(newProduct) {
  const data = {
    dataSource: 'DatabaseClusterBJS', // Replace with your actual data source name
    database: 'Listings', // This is your specified database name
    collection: 'BJS', // This is your specified collection name
    document: newProduct
  };

  const headers = {
    'Content-Type': 'application/json',
    'api-key': 'Nw5fg6JjGxwKQeHu3mks1LUjryjPshzQu5DRzSydioWpeuI9xPeFAPLVezofoN4b' // Replace with a secure retrieval method
  };

  const url = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-kxaqnsz/endpoint/data/v1/action/insertOne'; // Replace with your actual Data API URL

  // Use BJS's HTTP.post method
  HTTP.post({
    url: url,
    headers: headers,
    body: JSON.stringify(data) // Convert the JavaScript object to a JSON string
  }, function(err, res) {
    if (err) {
      Bot.sendMessage('Error saving new product to MongoDB: ' + err);
      return;
    }
    Bot.sendMessage('New product saved to MongoDB successfully.');
  });
}

// Rest of your existing code to create the newProduct object...

// Call the function to save the new product to MongoDB
saveNewProductToMongoDB(newProduct);

Bot.sendMessage("The product with ID " + productUniqueId + " has been approved and listed to the data.");
