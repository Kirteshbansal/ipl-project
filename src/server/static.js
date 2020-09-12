fs = require("fs");
csv = require("csvtojson");
path = require("path");

exports.ipl = require("./ipl");

exports.MATCHES_FILE_PATH = path.join(__dirname, "../data/matches.csv");
exports.DELIVERIES_FILE_PATH = path.join(__dirname, "../data/deliveries.csv");

exports.DATA_JSON_FILE_PATH = path.join(
  __dirname,
  "../public/output/data.json"
);
