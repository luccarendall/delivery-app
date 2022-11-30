const loginServices = require('../services/loginServices');
const JWT = require('../auth/JWT');

const login = async (req, res, next) => {
try {
  const { email, password } = req.body;
  const user = await loginServices.login(email, password);
  if (!user) return res.status(404).json({ message: 'Not Found' });
  const token = JWT.generateToken(user);
  return res.status(200).json({ user, token });
} catch (error) {
  console.log(error);
  next(error);
}
};

module.exports = {
  login,
};
