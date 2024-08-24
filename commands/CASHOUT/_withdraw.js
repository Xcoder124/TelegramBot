/*CMD
  command: /withdraw
  help: 
  need_reply: false
  auto_retry_time: 
  folder: CASHOUT

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var userId = user.telegramid;

// Function to check if the user is banned
function isBanned(userId) {
  let banUntilStr = User.getProperty("banUntil_" + userId);
  if (!banUntilStr) return false;

  let banUntil = new Date(banUntilStr);
  return new Date() < banUntil;
}

// Check if the user is banned
if (isBanned(user.telegramid)) {
  let banUntilStr = User.getProperty("banUntil_" + userId);
  Api.sendMessage({
    chat_id: userId,
    text: "*⛔ RESTRICTED*\nYour account has been restricted until *" + banUntilStr + "*.\n\nIf you think this was a mistake, contact our admin through DM.",
    parse_mode: "Markdown"
  });
  return;
}

// Check if withdrawals are open
const withdrawalsOpen = Bot.getProperty("withdrawalsOpen");
if (withdrawalsOpen === "closed") {
  Api.sendMessage({
    chat_id: userId,
    text: "*💸 BJSMasterSyntaxJava Withdrawals*\nOur withdrawals are closed for now.\n\n_Check back later and wait for an update._",
    parse_mode: "Markdown"
  });
  return;
}

// Continue with the withdrawal process if the user is the uploader
const freelancer = User.getProperty("freelancer");
if (user.telegramid == freelancer) {
  // Define the Withdrawal command
  const withdrawableBalance = Libs.ResourcesLib.userRes("withdrawableBalance");
  const WithBalanceAmount = withdrawableBalance.value();

  var message =
    "*📤 WITHDRAWAL:*\n" +
    "_Withdraw your revenue through cryptocurrencies payment, we only send payments through cryptocurrencies._\n" +
    "------------------------------------------------------------\n" +
    "*💰 Withdrawable Balance: $" +
    WithBalanceAmount.toFixed(2) +
    "*\n" +
    "------------------------------------------------------------\n" +
    "*🌐 Cryptocurrencies:*\n" +
    "🟢 Tether USD (USDT)" +
    "_We only send payments in cryptocurrency of_ *USDT* _be mindful that we do not accept other withdrawal methods in crypto._"
    "------------------------------------------------------------\n" +
    "All transactions are made automatically, so expect your funds to be sent in an instant.\n\n_Also, some cryptocurrencies listed here may not get visible, since the cryptocurrencies here are only visible when theres large amount of stocks cryptocurrencies are available for withdrawal._";

  var inlineKeyboard = [[{ text: "Cash Out", callback_data: "/cashOutBalanceAsAPartner" }]];

  Api.sendMessage({
    chat_id: userId,
    text: message,
    parse_mode: "Markdown",
    reply_markup: { inline_keyboard: inlineKeyboard }
  });
} else {
  Api.sendMessage({
    chat_id: userId,
    text: "*BJSMasterSyntaxJavaBot*\nBe one of our *freelancers*  to withdraw!",
    parse_mode: "Markdown"
  });
}
