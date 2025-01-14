const stringifyError = require('./stringifyError');

module.exports = (error) => [
  stringifyError({
    userFriendlyMessage: [
      'Не удалось выполнить команду',
      'Обратитесь к администратору',
    ].join('\n'),
    error,
  }),

  { reply_markup: { remove_keyboard: true } },
];
