/*CMD
  command: /bookingManager
  help: 
  need_reply: true
  auto_retry_time: 
  folder: BOOKING MANAGER

  <<ANSWER
*📒 BOOKING MANAGER*
*•* _Manage your bookings from your clients_
Enter booking trackingID.
_Ex: #123ABCD_
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

function bookingOverviewForCoder(userId, message) {
  var coderId = userId; // Assuming coder's userId is used as coderId
  var coderBooks = Bot.getProperty("coderBooks", []);

  // Find the specific booking in the coder's books by uniqueId or track
  var booking = coderBooks.find(booking => (booking.uniqueId === message || booking.track === message) && booking.coderId === coderId);

  if (!booking) {
    Bot.sendMessage("*❌ No booking found for the given ID or Tracking ID*");
    return;
  }

  var tracking = Bot.getProperty("tracking");
  var status = tracking.Status;
  var statusMessage = status === "OPEN" ? "The booking is currently open." : "The booking has been closed.";
  
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

// Example of how to call bookingOverviewForCoder function
var userId = user.telegramid;
var message = data.message; // Assume data.message contains the unique ID or Tracking ID
bookingOverviewForCoder(userId, message);

