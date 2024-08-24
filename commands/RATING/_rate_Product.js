/*CMD
  command: /rate_Product
  help: 
  need_reply: true
  auto_retry_time: 
  folder: RATING

  <<ANSWER
*BJSMasterSyntaxJavaBot*
Send the product name.
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

function checkPurchaseHistory() {
  var userId = user.telegramid
  var purchaseHistory = Bot.getProperty("obtainedItems" + userId, [])

  if (typeof message !== "undefined" && message) {
    var productName = message.trim().toLowerCase()

    // Find the product in the purchase history by name
    var product = purchaseHistory.find(function(item) {
      return item.name.toLowerCase() === productName
    })

    if (product) {
      var userRatingKey = "UserRating_" + userId + "_" + product.itemId
      var hasRated = Bot.getProperty(userRatingKey)

      if (hasRated) {
        Bot.sendMessage(
          "*❌ RATED*\nYou have already rated the product\n*" +
            message +
            "*.\n_Please rate the other purchase products._"
        )
        return
      }

      // Set the selected product's itemId as a User property
      User.setProperty("selectedProductId", product.itemId, "string")
      // Proceed to rate the product
      Bot.runCommand("/rateFinalProduct")
    } else {
      Bot.sendMessage(
        "*❌ MISSING INFO*\n*" +
          message +
          "* is not in your purchase history.\n_( Purchase the listing before rating )_."
      )
    }
  } else {
    Bot.sendMessage("❌ Please provide a product name.")
  }
}

// Example usage:
checkPurchaseHistory()

