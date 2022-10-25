const messages = {
  400: "Bad request",
  401: "Unauthorized",
  403: "Frobidden",
  404: "not Found",
  409: "Conflict",
};

const RequestError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  console.log(error);
  return error;
};

module.exports = RequestError;
