const md5 = require('md5');
const UserModel = require('../models/userModel');

const login = async (email, password) => {
  const hashPassword = md5(password);
  const user = await UserModel.find({ email, password: hashPassword });
  return user;
};

module.exports = {
  login,
};
