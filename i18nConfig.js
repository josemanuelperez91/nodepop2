const i18n = require('i18n');

const i18nConfig = function () {
  i18n.configure({
    locales: ['en', 'es'],
    directory: __dirname + '/locales',
    defaultLocale: 'en',
    autoReload: true,
    syncFiles: true,
  });
  i18n.setLocale('en');
  return i18n;
};

module.exports = i18nConfig;
