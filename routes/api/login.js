const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

router.post('/', check('email').isEmail(), async (req, res, next) => {
  try {
    validationResult(req).throw();

    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });

    if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
      const error = new Error('Invalid email or password');
      error.status = 401;
      next(error);
      return;
    }

    const token = jwt.sign({ _id: foundUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });

    res.json({ token: token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
