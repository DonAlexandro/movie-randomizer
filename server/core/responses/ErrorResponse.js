class ErrorResponse extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);

    this.status = status;
    this.errors = errors;
  }

  static NotFound(message) {
    throw new ErrorResponse(404, message);
  }

  static BadRequest(message, errors) {
    throw new ErrorResponse(400, message, errors);
  }
}

module.exports = ErrorResponse;
