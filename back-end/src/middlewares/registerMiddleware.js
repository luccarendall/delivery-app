const registerSchema = require('../schemas/registerSchema');

const registerMiddleware = async (req, _res, next) => {
  const { error } = registerSchema.validate(req.body);

  if (error) { next({ status: 400, message: error.details[0].message }); }
  next();
};

module.exports = registerMiddleware;
