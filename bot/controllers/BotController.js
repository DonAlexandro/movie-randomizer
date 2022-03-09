const { replies } = require('../utils/constants');
const ApiFacade = require('../core/facades/api');
const MarkupBuilder = require('../core/builders/MarkupBuilder');
const TextBuilder = require('../core/builders/TextBuilder');

class BotController {
  constructor(bot) {
    this.bot = bot;
    this.searchFailCount = 0;
  }

  start(msg) {
    const chatId = msg.chat.id;

    this.bot.sendMessage(chatId, replies.start.message, replies.start.markup);
  }

  async search(msg) {
    const chatId = msg.chat.id;

    try {
      await this.bot.sendMessage(chatId, replies.search.introMessage);
      const response = await ApiFacade.search();
      const data = response.data;

      if (this.searchFailCount === 5) {
        return this.bot.sendMessage(chatId, replies.search.maxAttemptsError);
      }

      if (!data || !data.title) {
        this.searchFailCount++;

        this.bot.sendMessage(chatId, replies.search.attemptFail);
        this.search(msg);

        return;
      }

      this.bot.sendMessage(chatId, replies.search.message.replace('movie_title', data.title), { parse_mode: 'HTML' });

      if (!data.movies.length) {
        return this.bot.sendMessage(replies.search.imdbEmpty);
      }

      for (const movie of data.movies) {
        const detailsCallbackData = `details;${data.notionId};${movie.id}`;
        const doneCallbackData = `done;${data.notionId}`;

        const markup = MarkupBuilder.addDetailsButton(detailsCallbackData)
          .addDoneButton(doneCallbackData)
          .addWatchButton(movie.title)
          .build();
        const caption = TextBuilder.addTitle(movie.title).addDescription(movie.description).build();

        await this.bot.sendPhoto(chatId, movie.image, {
          caption,
          parse_mode: 'HTML',
          reply_markup: markup
        });
      }
    } catch (error) {
      this.bot.sendMessage(chatId, replies.error);
      console.log(error.message);
    }
  }

  async details(chatId, ids) {
    try {
      await this.bot.sendMessage(chatId, replies.details.introMessage);

      const response = await ApiFacade.details(ids);
      const data = response.data;

      if (!data) {
        return this.bot.sendMessage(chatId, replies.details.error);
      }

      const markup = MarkupBuilder.addDoneButton(`done;${data.notion_movie_id}`).addWatchButton(data.title).build();
      const text = TextBuilder.addTitle(`${data.title} (${data.year})`)
        .addDescription(`\n${data.description}\n`)
        .addGenres(data.genres)
        .addRating(data.rating)
        .build();

      this.bot.sendMessage(chatId, text, { parse_mode: 'HTML', reply_markup: markup });
    } catch (error) {
      this.bot.sendMessage(chatId, replies.error);
      console.log(error);
    }
  }

  async done(chatId, movieData) {
    try {
      const message = await this.bot.sendMessage(chatId, replies.done.message, {
        reply_markup: JSON.stringify({
          force_reply: true
        })
      });

      this.bot.onReplyToMessage(chatId, message.message_id, async (msg) => {
        let rate = msg.text.replace(/[^0-9]/g, '');
        rate = +rate;

        if (!rate) {
          this.bot.sendMessage(chatId, replies.done.nanError);
          this.done(chatId, movieData);
          return;
        }

        if (rate > 10 || rate < 1) {
          this.bot.sendMessage(chatId, replies.done.rangeError);
          this.done(chatId, movieData);
          return;
        }

        this.bot.sendMessage(chatId, replies.done.startToRate);
        const response = await ApiFacade.done({ notionMovieId: movieData.notionMovieId, rating: rate });
        const data = response.data;

        if (!data) {
          return this.bot.sendMessage(chatId, replies.done.rateError);
        }

        this.bot.sendMessage(chatId, data);
      });
    } catch (error) {
      this.bot.sendMessage(chatId, replies.error);
      console.log(error);
    }
  }
}

module.exports = BotController;
