const axios = require('axios');

const $api = axios.create({
  baseURL: process.env.API_URL
});

class ApiFacade {
  search() {
    return $api.get('/movie');
  }

  details(body) {
    return $api.post('/fullMovieInfo', body);
  }

  done(body) {
    return $api.post('/watched', body);
  }
}

module.exports = new ApiFacade();
