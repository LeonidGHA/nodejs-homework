const uniqueValidateError = (error, data, next) => {
  const { name, code } = error;
  error.status = code === 11000 && name === "MongoServerError" ? 409 : 404;
  next();
};

module.exports = uniqueValidateError;
