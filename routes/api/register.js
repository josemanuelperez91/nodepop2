const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

router.post(
  '/',
  check('username').exists(),
  check('email').exists(),
  check('password').exists(),
  async (req, res, next) => {
    try {
      validationResult(req).throw();

      const { username, password, email } = req.body;
      const hashedPassword = await User.hashPassword(password);
      const userModel = new User({ username, password: hashedPassword, email });
      try {
        await userModel.save();
      } catch (err) {
        if (err.code === 11000) {
          res.status(401).json({
            success: false,
            error: 'duplicate',
            value: err.keyValue,
          });
        }
        console.log(err);
      }
      res.status(204).json({ success: true });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
