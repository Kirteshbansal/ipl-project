const static = require("./static");

exports.saveData = (result) => {
  const jsonData = {
    matchesPlayedPerYear: result[0],
    matchesWonByEachTeam: result[1],
    extraRunsConcededByEachTeam: result[2],
  };

  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(static.DATA_JSON_FILE_PATH, jsonString, "utf8", (err) => {
    if (err) {
      console.error(err);
    }
  });
};
