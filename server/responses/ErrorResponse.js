class ErrorResponse extends Error {
  status;
  message;

  constructor(status, message) {
    super(message);

    this.status = status;
    this.message = message;
  }

  static NotFound(message) {
    throw new ErrorResponse(404, message);
  }
}

module.exports = ErrorResponse;
