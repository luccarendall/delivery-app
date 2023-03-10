const registerService = require('../services/registerService');

const register = async (req, res, next) => {
  try {
    const { body } = req;
    const { code, message } = await registerService.register(body);
    return res.status(code).json({ message });
  } catch (error) {
    next(error);
  }
};

const registerAdmin = async (req, res, next) => {
  try {
    const { body, headers } = req;
    const { code, message } = await registerService.registerAdmin(body, headers.authorization);
    return res.status(code).json({ message });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, registerAdmin };