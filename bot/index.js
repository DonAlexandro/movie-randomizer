const TelegramBot = require('node-telegram-bot-api');
const BotController = require('./controllers/BotController');
const { commands } = require('./utils/constants');
const { callbackDataParser } = require('./utils/functions');

const bot = new TelegramBot(process.env.TOKEN, { polling: true });
const botController = new BotController(bot);

bot.setMyCommands([{ command: commands.start.command, description: commands.start.description }]);

bot.onText(commands.start.regex, (msg) => botController.start(msg));
bot.onText(commands.search.regex, (msg) => botController.search(msg));

bot.on('callback_query', (msg) => {
  try {
    const chatId = msg.message.chat.id;
    const data = msg.data;
    const { method, ...ids } = callbackDataParser(data);

    botController[method](chatId, ids);
  } catch (error) {
    console.log(error);
  }
});
