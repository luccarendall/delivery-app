const ErrorMiddleware = (error, req, res, _next) => {
  const { message, code } = error;
  console.log(error);
  return res.status(code || 500).json({ message });
};

module.exports = { ErrorMiddleware };