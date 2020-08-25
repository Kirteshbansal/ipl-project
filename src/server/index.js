const fs = require("fs");
const csv = require("csvtojson");
const MATCHES_FILE_PATH = "./../data/matches.csv";
const DELIVERIES_FILE_PATH = "./../data/deliveries.csv";
const teamWonTossAndMatch = require("./problems/teamWonTossAndMatch");
const highestTimesPOMPerSeason = require("./problems/highestTimesPOMPerSeason");
const strikeRateOfMSDhoni = require("./problems/strikeRateOfMSDhoni");
const highestTimesDissmissedPlayer = require("./problems/highestTimesDissmissedPlayer");
const bestSuperOverEconomyBowler = require("./problems/bestSuperOverEconomyBowler");
const DATA_JSON_FILE_PATH1 = "./../public/output/teamWonTossAndMatch.json";
const DATA_JSON_FILE_PATH2 = "./../public/output/highestTimesPOMPerSeason.json";
const DATA_JSON_FILE_PATH3 = "./../public/output/strikeRateOfMSDhoni.json";
const DATA_JSON_FILE_PATH4 = "./../public/output/highestTimesDissmissedPlayer.json";
const DATA_JSON_FILE_PATH5 = "./../public/output/bestSuperOverEconomyBowler.json";
function main(){
    csv()
      .fromFile(MATCHES_FILE_PATH)
      .then(matches => {
        csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then(deliveries => {
          let result = teamWonTossAndMatch(matches);
          saveData("teamWonTossAndMatch",result,DATA_JSON_FILE_PATH1)
          let result1 = highestTimesPOMPerSeason(matches);
          saveData("highestTimesPOMPerSeason",result1,DATA_JSON_FILE_PATH2)
          let result2 = strikeRateOfMSDhoni(matches,deliveries);
          saveData("strikeRateOfMSDhoni",result2,DATA_JSON_FILE_PATH3);
          let result3 = highestTimesDissmissedPlayer(matches,deliveries);
          saveData("highestTimesDissmissedPlayer",result3,DATA_JSON_FILE_PATH4);
          let result4 = bestSuperOverEconomyBowler(deliveries);
          saveData("bestSuperOverEconomyBowler",result4,DATA_JSON_FILE_PATH5);
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