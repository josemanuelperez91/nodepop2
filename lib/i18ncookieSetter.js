const i18nCookieSetter = function () {
  return (req, res, next) => {
    const { lang } = req.query;
    if (lang) {
      res.cookie('lang', lang, { maxAge: 1000 * 60 * 60 * 24 });
      res.redirect('back');
    }
    next();
  };
};
module.exports = i18nCookieSetter;
