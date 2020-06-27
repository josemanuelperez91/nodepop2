const router = require('express').Router();
const Advert = require('../models/Advert');
const i18nCookieSetter = require('../lib/i18ncookieSetter.js');

router.get('/', i18nCookieSetter(), async function (req, res, next) {
  res.locals.title = 'NodePop';

  try {
    const { tag, sale, name, price, skip, limit, sort } = req.query;

    const filter = {};
    typeof tag !== 'undefined' && (filter.tag = tag);
    typeof sale !== 'undefined' && (filter.sale = sale === 'true');
    const search = { name, price };
    const pagination = { skip, limit };

    const docs = await Advert.queryDocs(filter, search, pagination, sort);
    res.locals.adverts = docs;
  } catch (err) {
    next(err);
  }
  res.render('index');
});

router.use('/api', require('./api'));

module.exports = router;
