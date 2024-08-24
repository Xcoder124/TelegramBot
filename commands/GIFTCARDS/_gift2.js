/*CMD
  command: /gift2
  help: 
  need_reply: false
  auto_retry_time: 
  folder: GIFTCARDS

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/


// Generate a random alphanumeric string
function generateString(length) {
  const characters = "1234567890ABCDEFGHIJKLUVWXYZ12345678901234567890123456789012345678901234567890";
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Create a gift card code and store it
const giftCardCode = generateString(11);
Bot.setProperty("giftCardCode", giftCardCode, "string");

// Execute the next step (e.g., run the GIFT3 command)
Bot.runCommand("/gift3");

