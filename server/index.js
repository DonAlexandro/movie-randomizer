const express = require('express');
const cors = require('cors');
const router = require('./router');
const RedisService = require('./services/RedisService');
const DatabaseService = require('./services/DatabaseService');

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await RedisService.connect();
    DatabaseService.connect();
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log('Unexpected error happened:', error);
    process.exit(1);
  }
};

start();
