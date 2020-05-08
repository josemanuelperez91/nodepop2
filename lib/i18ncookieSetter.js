const COOKIE_LANG_NAME = process.env.COOKIE_LANG_NAME;

const i18nCookieSetter = function () {
  //sets a 24h cookie
  return (req, res, next) => {
    const { lang } = req.query;
    if (lang) {
      res.cookie(COOKIE_LANG_NAME, lang, { maxAge: 1000 * 60 * 60 * 24 });
      res.redirect('back');
    }
    next();
  };
};
module.exports = i18nCookieSetter;
