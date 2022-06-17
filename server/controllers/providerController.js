const client = require("../db/db");
const ErrorHandler = require("../middlewares/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// create new car>admin route
exports.newProvider = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;

  const logo = req.file.location;

  const provider = await client.query(
    "INSERT INTO provider (name,logo) VALUES ($1,$2) RETURNING *",
    [name, logo]
  );
  res.status(200).json(provider);
});
