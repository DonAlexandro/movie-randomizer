const express = require('express');
const cors = require('cors');
const router = require('./router');
const RedisService = require('./services/RedisService');
const DatabaseService = require('./services/DatabaseService');
const errorMiddleware = require('./middlewares/ErrorMiddleware');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL
  })
);
app.use(express.json());

app.use(router);
app.use(errorMiddleware);

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
