const stringifyError = require('./stringifyError');

const generateSuccessResponse = (data) => {
  const groupped = Object.keys(data.responses)
    .reduce((acc, key) => {
      const date = new Date(key).toLocaleDateString('ru-RU', { timeZone: 'Europe/Moscow' });
      const time = new Date(key).toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' });

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push({ time, response: data.responses[key] });
      return acc;
    }, {});

  const formatted = Object.keys(groupped)
    .reduce((acc, key) => {
      acc.push(`\n<u>${key}</u>\n`);

      groupped[key].forEach(({ time, response }) => {
        acc.push(`${time} ${response}`);
      });

      return acc;
    }, [])
    .join('\n');

  return [
    `<b>${data.name}</b>\n${formatted || 'Сохраненных сообщений пока нет'}`,
    {
      parse_mode: 'HTML',
    },
  ];
};

const generateFailureResponse = (error) => [
  stringifyError({
    userFriendlyMessage: [
      'Не удалось выполнить команду',
      'Обратитесь к администратору',
    ].join('\n'),
    error,
  }),

  { reply_markup: { remove_keyboard: true } },
];

module.exports = {
  generateSuccessResponse,
  generateFailureResponse,
};
