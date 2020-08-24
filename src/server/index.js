const fs = require("fs");
const csv = require("csvtojson");
const MATCHES_FILE_PATH = "./../data/matches.csv";
const DELIVERIES_FILE_PATH = "./../data/deliveries.csv";
const teamWonTossAndMatch = require("./problems/teamWonTossAndMatch");
const DATA_JSON_FILE_PATH1 = "./../public/output/teamWonTossAndMatch.json";
function main(){
    csv()
      .fromFile(MATCHES_FILE_PATH)
      .then(matches => {
        csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then(deliveries => {
          let result = teamWonTossAndMatch(matches);
          saveData("teamWonTossAndMatch",result,DATA_JSON_FILE_PATH1)
           // console.log(result1);

   })
  })
};


function saveData(key,result,DATA_JSON_FILE_PATH){
  const jsonData = {
  }

  jsonData[key] = result;

  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(DATA_JSON_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}



main();