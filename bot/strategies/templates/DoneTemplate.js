const { replies } = require('../../utils/constants');
const ApiFacade = require('../../core/facades/api');

class DoneTemplate {
  chatId;

  constructor(bot) {
    this.bot = bot;
  }

  async done(telegramMessage, movieData) {
    this.chatId = telegramMessage.message.chat.id;

    const message = await this.sendIntroMessage();

    this.bot.onReplyToMessage(this.chatId, message.message_id, async (telegramReply) => {
      const rating = this.transformReply(telegramReply);

      const isRatingValid = this.validateRating(rating, telegramMessage, movieData);

      if (!isRatingValid) {
        return;
      }

      const data = await this.rateMovie(rating, movieData);

      if (!data) {
        return this.bot.sendMessage(this.chatId, replies.done.rateError);
      }

      this.bot.sendMessage(this.chatId, data);
    });
  }

  async sendIntroMessage() {
    const message = await this.bot.sendMessage(this.chatId, replies.done.message, {
      reply_markup: JSON.stringify({
        force_reply: true
      })
    });

    return message;
  }

  transformReply(telegramMessage) {
    let rating = telegramMessage.text.replace(/[^0-9]/g, '');
    rating = +rating;

    return rating;
  }

  validateRating(rating, telegramMessage, movieData) {
    if (!rating) {
      this.bot.sendMessage(this.chatId, replies.done.nanError);
      this.done(telegramMessage, movieData);
      return false;
    }

    if (rating > 10 || rating < 1) {
      this.bot.sendMessage(this.chatId, replies.done.rangeError);
      this.done(telegramMessage, movieData);
      return false;
    }

    return true;
  }

  async rateMovie(rating, movieData) {
    this.bot.sendMessage(this.chatId, replies.done.startToRate);
    const response = await ApiFacade.done({ notionMovieId: movieData.notionMovieId, rating });
    const data = response.data;

    return data;
  }
}

module.exports = DoneTemplate;
