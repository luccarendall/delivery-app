const authService = require('../services/authService');

const validateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { code, message } = await authService.validateToken(authorization);
    res.status(code).json({ message });
  } catch (error) {
    next(error);
  }
};

module.exports = { validateToken };