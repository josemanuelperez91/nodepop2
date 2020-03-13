var router = require('express').Router();

router.use('/adverts', require('./adverts'));
// router.use('/tags', require('./tags'));

module.exports = router;
