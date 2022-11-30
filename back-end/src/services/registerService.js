const registerModel = require('../models/registerModel');

const register = async (obj) => {
  await registerModel.register(obj);
  return { code: 201, message: 'Created' };
};

module.exports = { register };
