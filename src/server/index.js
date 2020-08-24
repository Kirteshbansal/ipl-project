const fs = require("fs");
const csv = require("csvtojson");
const MATCHES_FILE_PATH = "./../data/matches.csv";
const DELIVERIES_FILE_PATH = "./../data/deliveries.csv";


    csv()
      .fromFile(MATCHES_FILE_PATH)
      .then(matches => {
            console.log(matches.slice(0,5))
  })