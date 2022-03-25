const { replies } = require('../../utils/constants');
const ApiFacade = require('../../core/facades/api');
const MarkupBuilder = require('../../core/builders/MarkupBuilder');
const TextBuilder = require('../../core/builders/TextBuilder');

class SearchTemplate {
  chatId;

  constructor(bot) {
    this.bot = bot;
    this.searchFailCount = 0;
  }

  async search(telegramMessage) {
    this.chatId = telegramMessage.chat.id;

    const data = await this.searchStart();
    const isStartFail = this.startFail(telegramMessage, data);

    if (isStartFail) {
      return this.startFail(telegramMessage, data);
    }

    this.bot.sendMessage(this.chatId, replies.search.message.replace('movie_title', data.title), {
      parse_mode: 'HTML'
    });

    this.imdbEmpty(data);

    await this.sendMovies(data);
  }

  async searchStart() {
    await this.bot.sendMessage(this.chatId, replies.search.introMessage);
    const response = await ApiFacade.search();
    const data = response.data;

    return data;
  }

  startFail(telegramMessage, data) {
    if (this.searchFailCount === 5) {
      this.bot.sendMessage(this.chatId, replies.search.maxAttemptsError);
      return true;
    }

    if (!data || !data.title) {
      this.searchFailCount++;

      this.bot.sendMessage(this.chatId, replies.search.attemptFail);
      this.search(telegramMessage);

      return true;
    }

    return false;
  }

  imdbEmpty(data) {
    if (!data.movies.length) {
      return this.bot.sendMessage(this.chatId, replies.search.imdbEmpty);
    }
  }

  async sendMovies(data) {
    for (const movie of data.movies) {
      const detailsCallbackData = `details;${data.notionId};${movie.id}`;
      const doneCallbackData = `done;${data.notionId}`;

      const markup = MarkupBuilder.addDetailsButton(detailsCallbackData)
        .addDoneButton(doneCallbackData)
        .addWatchButton(movie.title)
        .build();

      try {
        const caption = TextBuilder.addTitle(movie.title).addDescription(movie.description).build();
        await this.bot.sendPhoto(this.chatId, movie.image, {
          caption,
          parse_mode: 'HTML',
          reply_markup: markup
        });
      } catch (error) {
        const caption = TextBuilder.addPosterDisclaimer()
          .addTitle(movie.title)
          .addDescription(movie.description)
          .build();
        this.bot.sendMessage(this.chatId, caption, { reply_markup: markup, parse_mode: 'HTML' });
      }
    }
  }
}

module.exports = SearchTemplate;
