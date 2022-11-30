const md5 = require('md5');
const { User } = require('../models');

const registerService = async (obj) => {
  const { name, email, password } = obj;
  const user = await User.findOne({ where: { email } });
  if (user) return { status: 409, message: 'Conflict' };
  const result = await User.create({
    name,
    email,
    password: md5('password'),
    role: 'customer'
  });
  console.log(result);
  return { status: 201, message: 'Created' };
};

module.exports = registerService;
