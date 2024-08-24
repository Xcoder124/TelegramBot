/*CMD
  command: /openForPublicCoder
  help: 
  need_reply: true
  auto_retry_time: 
  folder: CODERS

  <<ANSWER
*ℹ️ Send Important Details*
Enter your desired name for your self.

_You can use your real name and username, but you cannot use special characters._
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 👨‍💻 open
  group: 
CMD*/

// Regular expression to match only letters, numbers, and spaces
let regex = /^[A-Za-z0-9 ]+$/;

// Check if the message contains any special characters
if (!regex.test(message)) {
  Bot.sendMessage(
    "*ℹ️ INFO*\nThe seller name contains special characters. Please use only letters, numbers, and spaces.\n*Please try again /applyCoder*"
  );
} else {
  let tempCoderData = {
    coderTitle: message,
    coderPrice: "",
    coderDescription: ""
  };
  User.setProperty("tempCoderInfo", tempCoderData, "json");
  Bot.runCommand("/applyCoderSetPricePerSession");
}
