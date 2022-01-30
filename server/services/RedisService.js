const redis = require('redis');

const oneDay = 60 * 60 * 24;

class RedisService {
  client = null;

  async connect() {
    this.client = redis.createClient({
      socket: {
        host: 'redis',
        port: 6379
      }
    });

    this.client.on('error', (error) => console.error(`Redis connection error: ${error}`));
    this.client.on('ready', () => console.log(`Redis is ready to use!`));

    await this.client.connect();
  }

  async getCache(key) {
    if (!key) {
      throw new Error('Provide cache data key');
    }

    const data = await this.client.get(key);

    return JSON.parse(data);
  }

  createCache(key, data, expiresIn = oneDay) {
    if (!key || !data) {
      throw new Error('You must provide key and data to create new cache');
    }

    this.client.setEx(key, expiresIn, JSON.stringify(data));
  }
}

module.exports = new RedisService();
