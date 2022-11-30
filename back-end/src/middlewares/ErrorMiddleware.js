const errorMiddleware = (error, req, res, _next) => {
  const { message, code } = error;
  console.log(error);
    return res.status(code).json({ message });
};

module.exports = { errorMiddleware };