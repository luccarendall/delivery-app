const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');

const generateToken = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
  };

  const token = jwt.sign(payload, 'secret_key');

  return token;
};

const authenticate = (token) => {
  try {
    const payload = jwt.verify(token, 'secret_key');
    return payload;
  } catch (error) {
    throw new CustomError('Invalid token', 401);
  }
};

module.exports = { generateToken, authenticate };