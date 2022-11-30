const jwt = require('jsonwebtoken');
// import secret from '../../jwt.evaluation.key';
// const secret = require('../../jwt.evaluation.key');

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
    return { status: 401, message: 'invalid token' };
  }
};

module.exports = { generateToken, authenticate };