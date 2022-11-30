const { User } = require('../database/models');
const md5 = require('md5');
const CustomError = require('../utils/CustomError');

const register = async (obj) => {
  const { name, email } = obj;
  const user = await User.findOne({ where: { email } });
  if (user) throw new CustomError('Conflict', 409);
  const result = await User.create({ name, email, password: md5('password'), role: 'customer' });
  return result;
};

module.exports = { register };
