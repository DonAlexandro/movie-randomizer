const commands = {
  start: {
    command: '/start',
    regex: /\/start/,
    description: 'Почати шукати кінчези'
  },
  search: {
    command: 'Знайти кіно',
    regex: /Знайти кіно/
  }
};

const replies = {
  start: {
    message: 'Жмакай на кнопку нижче:',
    markup: {
      reply_markup: JSON.stringify({
        keyboard: [[commands.search.command]]
      })
    }
  },
  search: {
    introMessage: 'Пошук кінчеза почався...',
    message: 'Знайдено фільм: <b>movie_title</b>',
    imdbEmpty: 'Додатково в базі IMDb нічого не знайдено',
    attemptFail: 'Не вдалося знайти фільм. Повторяю спробу...',
    maxAttemptsError: 'Не вдалося знайти фільм навіть після 5 спроби'
  },
  details: {
    introMessage: 'Шукаю детальнішу інфу про кінчез...',
    error: 'Не вдалося знайти детальнішу інформацію про цей кінчик'
  },
  done: {
    message: 'Постав оцінку (від 1 до 10): ',
    nanError: `Ти п'яний чи шо? Оцінка взагалі не корректна. Спробуй ще раз`,
    rangeError: 'Оцінка не може бути більшою за 10 і меншою за 1. Спробуй ще раз',
    startToRate: 'Оцінюю фільм...',
    rateError: 'Не вдалося оцінити фільм :('
  },
  error: 'Щось пішло не так і тобі прийдеться лізти в код і виясняти чого, хаха'
};

module.exports = { commands, replies };
