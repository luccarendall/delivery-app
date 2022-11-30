const registerService = require('../services/registerService');

const registerController = async (req, res, next) => {
  try {
    const { body } = req;
    const { status, message } = await registerService(body);
    // if (status === 409) return res.status(status).json({ message });
    return res.status(status).json({message});
  } catch (error) {
    next(error);
  }
};

module.exports = registerController;