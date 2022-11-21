const messages = {
  400: "Bad request",
  401: "Not authorized",
  403: "Frobidden",
  404: "not Found",
  409: "Conflict",
};

const RequestError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;

  return error;
};

module.exports = RequestError;
