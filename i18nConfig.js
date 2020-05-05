const i18n = require('i18n');

const i18nConfig = function (defaultLocale, cookieName) {
  i18n.configure({
    locales: ['en', 'es'],
    directory: __dirname + '/locales',
    defaultLocale: defaultLocale,
    autoReload: true,
    syncFiles: true,
    cookie: cookieName,
  });
  return i18n;
};

module.exports = i18nConfig;
