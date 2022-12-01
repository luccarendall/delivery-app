const { registerSchema, registerAdminSchema } = require('../schemas/registerSchema');
const CustomError = require('../utils/CustomError');

const registerMiddleware = async (req, _res, next) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    const customError = new CustomError(error.details[0].message, 400);
    next(customError);
  }
  next();
};

const adminRegisterMiddleware = async (req, _res, next) => {
  const { error } = registerAdminSchema.validate(req.body);

  if (error) {
    const customError = new CustomError(error.details[0].message, 400);
    next(customError);
  }
  next();
};

module.exports = { registerMiddleware, adminRegisterMiddleware};
