/*CMD
  command: /setUserTimeZoneDate
  help: 
  need_reply: true
  auto_retry_time: 
  folder: TIME ZONE

  <<ANSWER
*🕜 Timezone*
_For better implementation of dates between in different timezones we need to know your accurate time zone._

Please send your time zone
_Ex: GMT +1_

_If you don't know your time zone, you can search it on the internet._
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

function setTimeZone(message) {
  var userTimeZoneProperty = "timeZoneDifference" + user.telegramid;
  var existingTimeZone = Bot.getProperty(userTimeZoneProperty);

  if (existingTimeZone !== undefined) {
    Bot.sendMessage("*❌ Timezone*\n_You can only set your time zone once._");
    return;
  }

  var regex = /^GMT\s?([+-])\s?(\d{1,2}):?(\d{2})?$/;
  var match = message.match(regex);

  if (!match) {
    Bot.sendMessage("*❌ INVALID INPUT*\n_Time zone format must be GMT+X or GMT+X:XX._");
    return;
  }

  var sign = match[1];
  var hours = parseInt(match[2]);
  var minutes = match[3] ? parseInt(match[3]) : 0;

  if (hours < -12 || hours > 14 || minutes < 0 || minutes >= 60) {
    Bot.sendMessage("*❌ INVALID INPUT*\n_Time zone difference must be between -12:00 and +14:00._");
    return;
  }

  var timeZoneDifference = ((sign === "+" ? 1 : -1) * (hours * 60 + minutes)) * 60 * 1000;
  Bot.setProperty(userTimeZoneProperty, timeZoneDifference, "integer");

  Bot.sendMessage("*✅ Time zone set successfully!*\n_Your time zone is set to GMT " + sign + hours + (minutes ? ":" + (minutes < 10 ? "0" + minutes : minutes) : "") + "._");
}

setTimeZone(message);
