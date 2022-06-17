const client = require("../db/db");
const ErrorHandler = require("../middlewares/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// create new car>admin route
exports.newGame = catchAsyncErrors(async (req, res, next) => {
  const { name, provider_id } = req.body;

  const cover = req.file.location;

  const game = await client.query(
    "INSERT INTO game (name,provider_id,cover) VALUES ($1,$2,$3) RETURNING *",
    [name, provider_id, cover]
  );
  res.status(200).json(game);
});
