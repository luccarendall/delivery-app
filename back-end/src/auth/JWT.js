import jwt from 'jsonwebtoken';
import secret from '../../jwt.evaluation.key';

export const generateToken = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
  };

  const token = jwt.sign(payload, secret);

  return token;
};

export const authenticate = (token) => {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    return { status: 401, message: 'invalid token' };
  }
};