const mongoose = require("mongoose");
let ip = process.env.MONGO_IP_ADDRESS;

let dbUrl = `mongodb://${ip}:27017/Crud`;

mongoose
  .connect(dbUrl, {})
  .then(() => {
    console.log("connection successfull");
    require('../model/userModel');
  })
  .catch((err) => {
    console.log("no connection", err);
  });
