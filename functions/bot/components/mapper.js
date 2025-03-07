/* eslint-disable camelcase */

const getUser = ({
  id, is_bot, first_name, last_name, username,
}) => {
  const fullName = (first_name && last_name) ? [first_name, last_name].join(' ') : '';
  return {
    id,
    isBot: is_bot,
    name: fullName || username,
  };
};

const getMessage = ({ from, date, text }) => ({
  id: from.id,
  timestamp: new Date(date * 1000).toISOString(),
  text,
});

module.exports = {
  getUser,
  getMessage,
};
