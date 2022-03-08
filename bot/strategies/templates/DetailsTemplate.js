const { replies } = require('../../utils/constants');
const MarkupBuilder = require('../../core/builders/MarkupBuilder');
const TextBuilder = require('../../core/builders/TextBuilder');
const ApiFacade = require('../../core/facades/api');

class DetailsTemplate {
  chatId;

  constructor(bot) {
    this.bot = bot;
  }

  async details(telegramMessage, ids) {
    this.chatId = telegramMessage.message.chat.id;
    await this.bot.sendMessage(this.chatId, replies.details.introMessage);

    const data = await this.loadDetails(ids);

    if (!data) {
      return this.bot.sendMessage(this.chatId, replies.details.error);
    }

    this.sendDetails(data);
  }

  async loadDetails(ids) {
    const response = await ApiFacade.details(ids);
    const data = response.data;

    return data;
  }

  sendDetails(data) {
    const markup = MarkupBuilder.addDoneButton(`done;${data.notion_movie_id}`).addWatchButton(data.title).build();
    const text = TextBuilder.addTitle(`${data.title} (${data.year})`)
      .addDescription(`\n${data.description}\n`)
      .addGenres(data.genres)
      .addRating(data.rating)
      .build();

    this.bot.sendMessage(this.chatId, text, { parse_mode: 'HTML', reply_markup: markup });
  }
}

module.exports = DetailsTemplate;
