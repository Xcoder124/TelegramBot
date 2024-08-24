/*CMD
  command: /rateFinalProduct
  help: 
  need_reply: true
  auto_retry_time: 
  folder: RATING

  <<ANSWER
*BJSMasterSyntaxJavaBot*
Rate the product from 1-5
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// This is where you call the rateProduct function
var selectedProductId = User.getProperty("selectedProductId");

if (selectedProductId) {
  rateProduct(selectedProductId);
} else {
  Bot.sendMessage("❌ No product selected for rating.");
}

function rateProduct(selectedProductId) {
  var userId = user.telegramid;
  var userRatingKey = "UserRating_" + userId + "_" + selectedProductId;
  var hasRated = Bot.getProperty(userRatingKey);

  if (hasRated) {
    Bot.sendMessage("❌ You have already rated this product.");
    return;
  }

  var ratingInput = parseFloat(message); // Parse the user's rating input as a float
  if (!isNaN(ratingInput) && ratingInput >= 1 && ratingInput <= 5) {
    // Retrieve the current ratings data for the selected product or initialize it if not present
    var noRated = Libs.ResourcesLib.anotherChatRes("sumRated" + selectedProductId, "global");
    noRated.add(1);
    var sumRatings = Libs.ResourcesLib.anotherChatRes("sumRated" + selectedProductId, "global").value();
    var currentRatingData = Bot.getProperty("Rating" + selectedProductId, {
      totalRatings: 0,
      numberOfRatings: 0,
      averageRating: 0
    });
    var totalRatings = parseFloat(currentRatingData.totalRatings);
    var numberOfRatings = parseInt(currentRatingData.numberOfRatings);

    // Calculate the new total ratings and the new number of ratings
    var newTotalRatings = totalRatings + ratingInput;
    var newNumberOfRatings = numberOfRatings + 1;

    // Calculate the new average rating
    var newAverageRating = newTotalRatings / newNumberOfRatings;

    // Save updated ratings data for the selected product
    Bot.setProperty(
      "Rating" + selectedProductId,
      {
        totalRatings: newTotalRatings,
        numberOfRatings: newNumberOfRatings,
        averageRating: newAverageRating
      },
      "json"
    );

    // Save that the user has rated this product
    Bot.setProperty(userRatingKey, true);

    var ratingData = getAverageRating(selectedProductId);
    Bot.sendMessage(
      `*⭐ RATING*\nYou have rated this product ID: *${selectedProductId}*\nwith a rate of *${ratingInput}*\n\nThis product has been rated:\n*${ratingData.averageRating}/5.00* ~ *${ratingData.numberOfRatings}* users rated this product.`
    );
  } else {
    Bot.sendMessage(
      "Please enter a valid rating between 1 and 5.\nRetry: /rating"
    );
  }
}

// Function to get the average rating
function getAverageRating(selectedProductId) {
  var currentRatingData = Bot.getProperty("Rating" + selectedProductId, {
    totalRatings: 0,
    numberOfRatings: 0,
    averageRating: 0
  });
  var averageRating = currentRatingData.averageRating || 0;
  var numberOfRatings = currentRatingData.numberOfRatings || 0;

  return {
    averageRating: averageRating.toFixed(2),
    numberOfRatings: numberOfRatings
  };
}
