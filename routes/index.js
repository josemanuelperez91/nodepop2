const router = require('express').Router();
const Advert = require('../models/Advert');

router.get('/', async function (req, res, next) {
  res.locals.title = 'NodePop';

  const sort = 'name';
  const pagination = {
    skip: 0,
    limit: 10,
  };

  try {
    const docs = await Advert.queryDocs({}, {}, pagination, sort);
    res.locals.adverts = docs;
  } catch (err) {
    next(err);
  }
  res.render('index');
});

router.use('/api', require('./api'));

module.exports = router;
