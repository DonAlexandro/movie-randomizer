const { Router } = require('express');
const { Client } = require('@notionhq/client');

const router = Router();
const notion = new Client({
  auth: process.env.NOTION_TOKEN
});

router.get('/movies', async (req, res) => {
  try {
    const movies = await notion.blocks.children.list({
      block_id: process.env.MOVIES_PAGE_ID
    });

    const random = Math.floor(Math.random() * 100);

    res.json({ movie: movies.results[random] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong...' });
  }
});

module.exports = router;
