class TextBuilder {
  constructor() {
    this.text = [];
  }

  addPosterDisclaimer() {
    this.text.push(
      `<i>На жаль, постер цього фільму занадто великого розміру, тому Telegram не може його відобразити</i>\n`
    );
    return this;
  }

  addTitle(title) {
    this.text.push(`<b>${title}</b>`);
    return this;
  }

  addDescription(description) {
    this.text.push(description);
    return this;
  }

  addGenres(genres) {
    this.text.push(`🎬 Жанри: ${genres.map((genre) => genre.name).join(', ')}`);
    return this;
  }

  addRating(rating) {
    this.text.push(`⭐ Рейтинг: ${rating}`);
    return this;
  }

  build() {
    const currentTextState = this.text;
    this.text = [];

    return currentTextState.join('\n');
  }
}

module.exports = new TextBuilder();
