const jwt = require('jsonwebtoken');

const jwtAuth = function () {
  return (req, res, next) => {
    const token = req.query.token || req.body.token;

    if (!token) {
      const error = new Error('Authentication token not found');
      error.status = 401;
      next(error);
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        const error = { ...err };
        error.status = 401;
        next(error);
        return;
      }
      req.apiAuthUserId = payload._id;
      next();
    });
  };
};

module.exports = jwtAuth;
