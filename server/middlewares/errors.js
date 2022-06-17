const fs = require("fs");

module.exports = (err, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.location, (err) => {
      console.log(err);
    });
  }
  err.statusCode = err.statusCode || 500;

  console.log(err);

  res.status(err.statusCode).json({
    success: false,
    error: err,
    errMessage: err.message,
    stack: err.stack,
  });
};
