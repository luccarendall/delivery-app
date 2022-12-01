const JWT = require('../auth/JWT');
const CustomError = require('../utils/CustomError');

const validateToken = (token) => {
  const payload = JWT.authenticate(token);
  if (!payload) throw new CustomError('Unauthorized', 401);
  return { code: 200, message: payload };
};

module.exports = { validateToken };