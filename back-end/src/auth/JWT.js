const fs = require('fs/promises');
const jwt = require('jsonwebtoken');
const path = require('path');
const CustomError = require('../utils/CustomError');

const filePath = path.join(__dirname, '/../../jwt.evaluation.key'); 

const getSecretKey = async () => fs.readFile(filePath, { encoding: 'utf8' });

const generateToken = async (user) => {
  const payload = {
    id: user.id,
    role: user.role,
  };

  const secretKey = await getSecretKey();

  const token = jwt.sign(payload, secretKey);

  return token;
};

const authenticate = async (token) => {
  const secretKey = await getSecretKey();

  try {
    const payload = jwt.verify(token, secretKey);
    return payload;
  } catch (error) {
    throw new CustomError('Invalid token', 401);
  }
};

module.exports = { generateToken, authenticate };