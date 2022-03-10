class BotStrategy {
  constructor(strategy, bot) {
    this.strategy = strategy;
    this.bot = bot;
  }

  apply() {
    try {
      this.strategy();
    } catch (error) {
      this.bot.sendMessage(chatId, replies.error);
      console.log(error);
    }
  }
}

module.exports = BotStrategy;
