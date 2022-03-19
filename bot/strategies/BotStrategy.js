const { replies } = require('../utils/constants');

class BotStrategy {
  constructor(strategy, bot) {
    this.strategy = strategy;
    this.bot = bot;
  }

  async apply(chatId) {
    try {
      await this.strategy();
    } catch (error) {
      this.bot.sendMessage(chatId, replies.error);
      console.log(error.response);
    }
  }
}

module.exports = BotStrategy;
