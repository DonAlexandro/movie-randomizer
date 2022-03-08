const { replies } = require('../utils/constants');
const ApiFacade = require('../core/facades/api');
const MarkupBuilder = require('../core/builders/MarkupBuilder');
const TextBuilder = require('../core/builders/TextBuilder');
const BotStrategy = require('../strategies/BotStrategy');
const SearchTemplate = require('../strategies/templates/SearchTemplate');
const DoneTemplate = require('../strategies/templates/DoneTemplate');
const DetailsTemplate = require('../strategies/templates/DetailsTemplate');

class BotController {
  constructor(bot) {
    this.bot = bot;
    this.searchFailCount = 0;
  }

  start(msg) {
    const chatId = msg.chat.id;

    this.bot.sendMessage(chatId, replies.start.message, replies.start.markup);
  }

  async search(telegramMessage) {
    const searchTemplate = new SearchTemplate(this.bot);
    const searchStrategy = () => searchTemplate.search(telegramMessage);
    const botStrategy = new BotStrategy(searchStrategy, this.bot);

    botStrategy.apply();
  }

  async details(telegramMessage, ids) {
    const detailsTemplate = new DetailsTemplate(this.bot);
    const detailsStrategy = () => detailsTemplate.details(telegramMessage, ids);
    const botStrategy = new BotStrategy(detailsStrategy, this.bot);

    botStrategy.apply();
  }

  async done(telegramMessage, movieData) {
    const doneTemplate = new DoneTemplate(this.bot);
    const doneStrategy = () => doneTemplate.done(telegramMessage, movieData);
    const botStrategy = new BotStrategy(doneStrategy, this.bot);

    botStrategy.apply();
  }
}

module.exports = BotController;
