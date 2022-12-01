const md5 = require('md5');
const JWT = require('../auth/JWT');
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

const registerAdmin = async (obj, token) => {
  const roleList = ['administrator', 'seller', 'customer'];
  const { name, email, password, role } = obj;
  if (!roleList.includes(role)) throw new CustomError('Invalid role', 401);
  const payload = JWT.authenticate(token);
  if (payload.role !== 'administrator') throw new CustomError('Unauthorized', 401);
  const user = await UserModel.find({ email });
  if (user) throw new CustomError('Conflict', 409);
  await UserModel.create({
    name,
    email,
    password: md5(password),
    role,
  });
  return { code: 201, message: 'Created' };
};

module.exports = { register, registerAdmin };
