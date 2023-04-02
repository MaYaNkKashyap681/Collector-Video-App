const sampleModel = require("../mongodb/models/sample-model.js");

module.exports.sampleFunc = (req, res) => {
  return res.send("Hello");
};
