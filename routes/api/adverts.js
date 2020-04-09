const express = require('express');
const router = express.Router();

const Advert = require('../../models/Advert');

router.get('/', async (req, res, next) => {
  try {
    const { tag, sale, name, price, skip, limit, sort } = req.query;

    const filter = {};
    typeof tag !== 'undefined' && (filter.tag = tag);
    typeof sale !== 'undefined' && (filter.sale = sale === 'true');
    const search = { name, price };
    const pagination = { skip, limit };

    const docs = await Advert.queryDocs(filter, search, pagination, sort);
    res.json(docs);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const advertData = req.body;
    const advertModel = new Advert(advertData);
    const storedAdvert = await advertModel.save();
    res.status(201).json({ result: storedAdvert });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
