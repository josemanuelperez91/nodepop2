const express = require('express');
const router = express.Router();
const { query, check, validationResult } = require('express-validator');
const Advert = require('../../models/Advert');
const imageHandler = require('../../lib/imageHandler');

router.get('/:uri', async (req, res, next) => {
  try {
    validationResult(req).throw();

    console.log(req.params);
    const { uri } = req.params;
    const id = str.split('-')[0];

    // const filter = {};
    // typeof tag !== 'undefined' && (filter.tags = tag);
    // typeof sale !== 'undefined' && (filter.sale = sale === 'true');
    // const search = { name, price };
    // const pagination = { skip, limit };

    // const docs = await Advert.queryDocs(filter, search, pagination, sort);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

router.get(
  '/',
  [
    query('sale').optional().isBoolean(),
    query('price')
      .optional()
      .custom((value) => {
        try {
          const priceArray = value.split('-');
          priceArray[0] && parseFloat(priceArray[0]);
          priceArray[1] && parseFloat(priceArray[1]);
          return true;
        } catch (parsError) {
          throw new Error('Invalid Price Range');
        }
      }),
    query('skip').optional().isInt(),
    query('limit').optional().isInt(),
    query('tag')
      .optional()
      .custom((value) => {
        switch (value) {
          case 'work':
          case 'lifestyle':
          case 'motor':
          case 'mobile':
            return true;
          default:
            throw new Error('Invalid Tag name');
        }
      }),
  ],
  async (req, res, next) => {
    try {
      validationResult(req).throw();

      const { tag, sale, name, price, skip, limit, sort } = req.query;

      const filter = {};
      typeof tag !== 'undefined' && (filter.tags = tag);
      typeof sale !== 'undefined' && (filter.sale = sale === 'true');
      const search = { name, price };
      const pagination = { skip, limit };

      const docs = await Advert.queryDocs(filter, search, pagination, sort);
      res.json(docs);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/',
  [
    check('sale').optional().isBoolean(),
    check('price').optional().isNumeric(),
    check('skip').optional().isInt(),
    check('limit').optional().isInt(),
    check('tag')
      .optional()
      .custom((value) => {
        switch (value) {
          case 'work':
          case 'lifestyle':
          case 'motor':
          case 'mobile':
            return true;
          default:
            throw new Error('Invalid Tag name');
        }
      }),
  ],
  imageHandler(),
  async (req, res, next) => {
    try {
      validationResult(req).throw();
      const advertData = req.body;
      const advertModel = new Advert(advertData);
      const storedAdvert = await advertModel.save();
      res.status(201).json({ result: storedAdvert });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
