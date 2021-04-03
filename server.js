const express = require("express");

const connectDB = require("./.config/dbConnect");

const app = express();
require("dotenv").config();

//connect  DB
connectDB(),
  //routes

  app.use(express.json()),
  app.use("/user", require("./routes/user"));

const PORT = process.env.PORT;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`the server is running on${PORT}`)
);
