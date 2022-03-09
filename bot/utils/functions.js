const callbackDataParser = (data) => {
  const properties = data.split(';');
  return { method: properties[0], notionMovieId: properties[1], imdbMovieId: properties[2] };
};

module.exports = { callbackDataParser };
