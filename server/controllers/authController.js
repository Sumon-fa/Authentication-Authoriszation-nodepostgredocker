const client = require("../db/db");
const ErrorHandler = require("../middlewares/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hasUser = await client.query("SELECT * FROM users where email=$1", [
    email,
  ]);
  const userExist = hasUser.rows.find((user) => user.email === email);
  if (userExist) {
    return next(
      new ErrorHandler("Could not create user, Email already exist", 422)
    );
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await client.query(
    "INSERT INTO users (username,email,password) VALUES($1,$2,$3)RETURNING *",
    [username, email, hashedPassword]
  );

  console.log(user);

  const token = jwt.sign(
    { user_id: user.rows[0].user_id, email: user.rows[0].email },
    process.env.JWTTOKEN,
    { expiresIn: "1h" }
  );
  console.log(token);
  res
    .status(201)
    .cookie("token", token)
    .json({ user: user.rows[0], token: token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const users = await client.query("SELECT * FROM users");
  const identifiedUser = users.rows.find((user) => user.email === email);
  let isValidPassword = false;

  isValidPassword = await bcrypt.compare(password, identifiedUser.password);
  if (!identifiedUser) {
    throw new ErrorHandler("Could not identify user, email is invalid", 401);
  } else if (!isValidPassword) {
    throw new ErrorHandler("Could not identify user, password is invalid", 401);
  }

  const token = jwt.sign(
    { user_id: identifiedUser.user_id, email: identifiedUser.email },
    process.env.JWTTOKEN,
    { expiresIn: "1h" }
  );
  console.log(token);
  res
    .status(201)
    .cookie("token", token)
    .json({ user: identifiedUser, token: token });
};

exports.getUsers = async (req, res) => {
  console.log(req.user);
  const users = await client.query("SELECT * FROM users");
  res.status(201).json({ users: users.rows });
};
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null);

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});
