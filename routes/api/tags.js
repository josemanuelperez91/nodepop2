const express = require('express');
const router = express.Router();

const Advert = require('../../models/Advert');

router.get('/', async (req, res, next) => {
  try {
    const tags = await Advert.queryTags();
    res.json(tags);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
