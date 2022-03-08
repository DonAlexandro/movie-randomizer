class MarkupBuilder {
  constructor() {
    this.inline_keyboard = [];
  }

  addDetailsButton(callback_data) {
    this.inline_keyboard.push([
      {
        text: 'ℹ️Детальніше',
        callback_data
      }
    ]);

    return this;
  }

  addDoneButton(callback_data) {
    this.inline_keyboard.push([
      {
        text: '✅Переглянув',
        callback_data
      }
    ]);

    return this;
  }

  addWatchButton(title) {
    this.inline_keyboard.push([
      { text: '🍿Дивитися', url: process.env.EXTARNAL_MOVIES_SITE + encodeURIComponent(title) }
    ]);

    return this;
  }

  build() {
    const currentInlineKeyboard = this.inline_keyboard;
    this.inline_keyboard = [];
    return JSON.stringify({ inline_keyboard: currentInlineKeyboard });
  }
}

module.exports = new MarkupBuilder();
