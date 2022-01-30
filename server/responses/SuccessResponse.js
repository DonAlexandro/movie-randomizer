class SuccessResponse {
  call(res, data, status = 200) {
    return res.status(status).json(data);
  }
}

module.exports = new SuccessResponse();
