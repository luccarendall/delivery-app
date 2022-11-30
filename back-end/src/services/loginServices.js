const md5 = require('md5');
const { User } = require('../database/models');

const login = async (email, password) => {
  const hashPassword = md5(password);
  const user = await User.findOne({
    where: { email, password: hashPassword },
    attributes: { exclude: ['password'] },
  });
  return user;
};

module.exports = {
  login,
};
