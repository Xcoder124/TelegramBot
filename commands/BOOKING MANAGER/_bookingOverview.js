/*CMD
  command: /bookingOverview
  help: 
  need_reply: true
  auto_retry_time: 
  folder: BOOKING MANAGER

  <<ANSWER
Id of your booking.
_EX: #123ABC_
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

function bookingOverviewForCustomer(userId, message) {
  var bookingHistory = Bot.getProperty("booked" + userId, []);

  // Find the specific booking in the history by uniqueId or track
  var booking = bookingHistory.find(booking => booking.uniqueId === message || booking.track === message);

  if (!booking) {
    Bot.sendMessage("*❌ No booking found for the given ID or Tracking ID*");
    return;
  }

  var tracking = Bot.getProperty("tracking");
  var status = tracking.Status;
  var statusMessage = status === "OPEN" ? "Your booking is currently open." : "Your booking has been closed.";
  
  // Check if the booking can be closed
  var bookingDate = new Date(booking.date);
  var currentDate = new Date();
  var timeDifference = currentDate - bookingDate;
  var hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  var canCloseBooking = hoursDifference >= 24;

  var closeButton = canCloseBooking ? [{
    text: "🔒 CLOSE",
    callback_data: "/closeBooking close " + message
  }] : [];

  var inlineKeyboard = closeButton.length > 0 ? [closeButton] : [];

  Api.sendMessage({
    chat_id: userId,
    text: `📚 *BOOKING*\n\n*${booking.coderName}*\n_by ${booking.coder}_\n_${booking.date}_\n===========================\n*Tracking ID: ${booking.track}*\n===========================\n📃 ${status}\n${statusMessage}\n===========================\n🛡️ *ANTI FRAUD POLICY:*\nUse our own payment method to repay the remaining amount requested by the coder.\nAsk for an invoice, from one of our payment methods.\nThe booking can be closed after 24 hours if the status remained unchanged.\n=============================`,
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({ inline_keyboard: inlineKeyboard })
  });
}

// Example of how to call bookingOverviewForCustomer function
var userId = user.telegramid;
var message = data.message; // Assume data.message contains the unique ID or Tracking ID
bookingOverviewForCustomer(userId, message);

