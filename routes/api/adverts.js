const express = require('express');
const router = express.Router();

const Advert = require('../../models/Advert');

router.get('/', async (req, res, next) => {
  try {
    // const name = req.query.name;
    // const age = req.query.age;
    // const limit = parseInt(req.query.limit || 10000);
    // const skip = parseInt(req.query.skip);
    // const sort = req.query.sort;
    // const fields = req.query.fields;

    // const filtro = {};

    // if (typeof name !== 'undefined') {
    //   filtro.name = name;
    // }

    // if (typeof age !== 'undefined') {
    //   filtro.age = age;
    // }

    // const docs = await Advert.queryDocs(filter, limit, skip, sort, fields);
    const docs = await Advert.queryDocs();
    res.json(docs);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
