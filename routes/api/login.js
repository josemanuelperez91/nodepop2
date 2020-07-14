const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

router.post(
  '/',
  check('username').exists(),
  check('password').exists().withMessage('password required'),
  async (req, res, next) => {
    try {
      validationResult(req).throw();

      const { username, password } = req.body;
      const foundUser = await User.findOne({ username: username });

      if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
        const error = new Error('Invalid username or password');
        error.status = 401;
        next(error);
        return;
      }

      const token = jwt.sign({ _id: foundUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      });
      res.cookie('token', token, {
        // secure: true,
      });
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
