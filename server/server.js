const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const client = require("./db/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const errorMiddleware = require("./middlewares/errors");

const ErrorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");

client.connect();
app.use(express.json());
//app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Import all routes
const game = require("./routes/game");
const auth = require("./routes/auth");
const provider = require("./routes/provider");
const group = require("./routes/group");

app.use(cors());
app.use("/v1", game);
app.use("/v1", auth);
app.use("/v1", provider);
app.use("/v1", group);

app.use((req, res, next) => {
  const error = new ErrorHandler("Could not find this route.", 404);
  throw error;
});
app.use(errorMiddleware);

const port = 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
