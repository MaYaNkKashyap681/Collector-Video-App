const express = require("express");
const { sampleFunc } = require("../controllers/sampleController.js");
const router = express.Router();

router.get("/", sampleFunc);

module.exports = router;
