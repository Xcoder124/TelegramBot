/*CMD
  command: 💰 CREDITS
  help: 
  need_reply: false
  auto_retry_time: 
  folder: MAIN

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /partnerportfolio
  group: 
CMD*/

const balance = Libs.ResourcesLib.userRes("usd")
const conversionRate = 1
const email = User.getProperty("email")
const telegramId = user.telegramid

// Function to convert balance to USD
function convertBalanceToUSD(balanceAmount) {
  return balanceAmount * conversionRate
}

// Get the user's balance
const balanceAmount = balance.value()
const balanceInUSD = convertBalanceToUSD(balanceAmount)

// Format the amounts to 2 decimal places and add commas
const formattedBalance = balanceAmount
  .toFixed(2)
  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
const formattedBalanceInUSD = balanceInUSD
  .toFixed(2)
  .replace(/\d(?=(\d{3})+\.)/g, "$&,")

// Function to format transaction history
function formatTransactionHistory(transactions) {
  if (transactions.length === 0) {
    return "No transactions made."
  }
  return transactions
    .slice(0, 10)
    .map(transaction => {
      const amount = parseFloat(transaction.amount)
      if (isNaN(amount)) {
        return `Invalid amount for transaction: ${transaction.type}`
      }
      const formattedAmount =
        transaction.type === "Purchase"
          ? `-💎${Math.abs(amount)
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
          : `+💎${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
      return `${formattedAmount} ${transaction.type}`
    })
    .join("\n")
}

// Retrieve combined transaction histories
function getCombinedTransactionHistory() {
  var transactions = User.getProperty("transactions", [])
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date))
}

// Get transaction histories
const combinedHistory = getCombinedTransactionHistory()

// Format combined transaction histories
const formattedTransactionHistory = formatTransactionHistory(combinedHistory)

// Send a formatted message with balance and transaction details
const uploaderId = User.getProperty("freelancer")

// Define the buttons array
const message1 =
  "*BJSMasterSyntaxJavaBot*\n" +
  "👤 Profile Portfolio:\n" +
  "*💰Balance:* 💎" +
  formattedBalance +
  "\n\n" +
  "*📥 LATEST TRANSACTIONS:*\n" +
  formattedTransactionHistory +
  "\n\n_Old transactions may get deleted after reaching 10 max. transactions._"
var buttons = [{ title: "Add Funds", command: "/addfunds" }]
// Add the My Portfolio button only if the user is the uploader
if (uploaderId) {
  buttons.push(
    { title: "My Portfolio", command: "/freelancerPortfolio" },
    { title: "Withdraw", command: "/withdraw" }
  )
}
Bot.sendInlineKeyboard(buttons, message1)
function formatTransactionHistory(transactions) {
  if (transactions.length === 0) {
    Bot.sendMessage("error")
    return
  }
// Function to save transaction history to MongoDB
function saveTransactionHistory(email, telegramId, transactions) {
  const data = {
    dataSource: 'DatabaseClusterBJS', // Replace with your actual data source name
    database: 'Transactions', // Replace with your actual database name
    collection: 'Transactions', // Replace with your actual collection name
    document: {
      email: email,
      telegramId: telegramId,
      transactions: transactions
    }
  };

  const headers = {
    'Content-Type': 'application/json',
    'api-key': 'Nw5fg6JjGxwKQeHu3mks1LUjryjPshzQu5DRzSydioWpeuI9xPeFAPLVezofoN4b' // Replace with your actual Data API key
  };

  const url = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-kxaqnsz/endpoint/data/v1/action/insertOne'; // Replace with your actual Data API URL

  // Use BJS's HTTP.post method
  HTTP.post({
    url: url,
    headers: headers,
    body: JSON.stringify(data) // Convert the JavaScript object to a JSON string
  }, function(err, res) {
    if (err) {
      Bot.sendMessage('Error saving transaction history: ' + err);
      return;
    }
    Bot.sendMessage('Transaction history saved successfully.');
  });
}
saveTransactionHistory(email, telegramId, combinedHistory);
}
