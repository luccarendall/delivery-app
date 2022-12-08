const JWT = require('../auth/JWT');
const CustomError = require('../utils/CustomError');

const validateToken = async (token) => {
  const payload = await JWT.authenticate(token);
  if (!payload) throw new CustomError('Unauthorized', 401);
  return { code: 200, message: 'OK' };
};

module.exports = { validateToken };