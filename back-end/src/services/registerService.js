const md5 = require('md5');
const UserModel = require('../models/userModel');
const CustomError = require('../utils/CustomError');

const register = async (obj) => {
  const { name, email, password } = obj;
  const user = await UserModel.find({ email });
  if (user) throw new CustomError('Conflict', 409);
  await UserModel.create({
    name,
    email,
    password: md5(password),
    role: 'customer',
  });
  return { code: 201, message: 'Created' };
};

module.exports = { register };
