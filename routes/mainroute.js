const express = require("express");
const v1Route = require("./v1/userRoute");

const router = express.Router();

router.use("/v1/api", v1Route);

module.exports = router;
