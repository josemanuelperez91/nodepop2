const express = require('express');
const router = express.Router();

const Advert = require('../../models/Advert');

router.get('/', async (req, res, next) => {
  try {
    const { all } = req.query;
    let tags = [];

    if (all === 'true') {
      // Should be stored in database
      tags = ['RPG', 'FPS', 'Adventure', 'Casual', 'Puzzle', 'Racing'];
    } else {
      tags = await Advert.queryTags();
    }
    res.json(tags);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
