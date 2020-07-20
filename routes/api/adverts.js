const express = require('express');
const router = express.Router();
const { query, check, validationResult } = require('express-validator');
const Advert = require('../../models/Advert');
const imageHandler = require('../../lib/imageHandler');
const jwtAuth = require('../../lib/jwtAuth');
const fs = require('fs');

router.get('/:uri', async (req, res, next) => {
  try {
    validationResult(req).throw();

    const { uri } = req.params;
    const id = uri.split('-')[0];
    const doc = await Advert.findById({ _id: id });
    res.status(200).json({ result: doc });
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

      const { tag, sale, name, price, skip, limit, sort, username } = req.query;

      const filter = {};

      typeof tag !== 'undefined' && (filter.tags = tag);
      typeof username !== 'undefined' && (filter.username = username);
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
  jwtAuth(),
  [
    check('sale').optional().isBoolean(),
    check('price').optional().isNumeric(),
    check('name').exists(),
    check('description').exists(),
  ],
  // imageHandler(),
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

router.put(
  '/:id',
  jwtAuth(),
  [
    check('sale').isBoolean(),
    check('price').isNumeric(),
    check('name').exists(),
    check('description').exists(),
  ],
  imageHandler(),
  async (req, res, next) => {
    try {
      validationResult(req).throw();
      const { id } = req.params;
      const advertData = req.body;

      // let buff = new Buffer(advertData.image, 'base64');
      // fs.writeFileSync('./public/images/' + id, buff);
      // advertData.image = `http://localhost:3000/images/${id}`;

      await Advert.findByIdAndUpdate({ _id: id }, advertData);

      res.status(204).json({ success: true });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
