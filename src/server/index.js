const fs = require("fs");
const csv = require("csvtojson");
const path = require("path");

const ipl = require("./ipl");

const MATCHES_FILE_PATH = path.join(__dirname, "../data/matches.csv");
const DELIVERIES_FILE_PATH = path.join(__dirname, "../data/deliveries.csv");
const DATA_JSON_FILE_PATH1 = path.join(__dirname, "../public/output/teamWonTossAndMatch.json");
const DATA_JSON_FILE_PATH2 = path.join(__dirname, "../public/output/highestTimesPOMPerSeason.json");
const DATA_JSON_FILE_PATH3 = path.join(__dirname, "../public/output/strikeRateOfMSDhoni.json");
const DATA_JSON_FILE_PATH4 = path.join(__dirname, "../public/output/highestTimesDissmissedPlayer.json");
const DATA_JSON_FILE_PATH5 = path.join(__dirname, "../public/output/bestSuperOverEconomyBowler.json");

function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then((matches) => {
      csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then((deliveries) => {
          let result = ipl.teamWonTossAndMatch(matches);
          saveData("teamWonTossAndMatch", result, DATA_JSON_FILE_PATH1);
          let result1 = ipl.highestTimesPOMPerSeason(matches);
          const player = "MS Dhoni";
          saveData("highestTimesPOMPerSeason", result1, DATA_JSON_FILE_PATH2);
          let result2 = ipl.strikeRateOfPlayer(matches, deliveries,player);
          saveData(`strikeRateOf${player}`, result2, DATA_JSON_FILE_PATH3);
          let result3 = ipl.highestTimesDissmissedPlayer(deliveries);
          saveData("highestTimesDissmissedPlayer",result3,DATA_JSON_FILE_PATH4);
          let result4 = ipl.bestSuperOverEconomyBowler(deliveries);
          saveData("bestSuperOverEconomyBowler", result4, DATA_JSON_FILE_PATH5);
        });
    });
}

function saveData(key, result, DATA_JSON_FILE_PATH) {
  const jsonData = {};

  jsonData[key] = result;

  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(DATA_JSON_FILE_PATH, jsonString, "utf8", (err) => {
    if (err) {
      console.error(err);
    }
  });
}

main();
