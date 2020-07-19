var router = require('express').Router();

const jwtAuth = require('../../lib/jwtAuth');

router.use('/adverts', require('./adverts'));
router.use('/tags', require('./tags'));
router.use('/authenticate', require('./login'));
router.use('/register', require('./register'));

module.exports = router;
