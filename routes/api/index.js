var router = require('express').Router();

const jwtAuth = require('../../lib/jwtAuth');

router.use('/adverts', jwtAuth(), require('./adverts'));
router.use('/tags', require('./tags'));
router.use('/authenticate', require('./login'));

module.exports = router;
