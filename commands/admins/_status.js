/*CMD
  command: /status
  help: 
  need_reply: 
  auto_retry_time: 
  folder: admins
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

const params = message.split(' ');
const validParams = ['storeStatus', 'supportStatus'];
const validParamsStatus = ['offline', 'online', 'maintenance'];

// Check if the command has the correct number of parameters
if (params.length !== 3) {
    return Bot.sendMessage('Usage: /status <validParams> <validParamsStatus>');
}

const [command, param, status] = params;

// Validate parameters
if (!validParams.includes(param) || !validParamsStatus.includes(status)) {
    return Bot.sendMessage('Invalid parameters. Please use the command as /status <validParams> <validParamsStatus>');
}

// Update the property based on the parameter
Bot.setProperty(param, status, 'string');
Bot.sendMessage(`The ${param} has been set to ${status}.`);  
