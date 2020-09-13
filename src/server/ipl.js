const dataProcess = require("./dataProcess");

// Number of matches played per year
function matchesPlayedPerYear() {
  const matchesPlayedPerYearQuery =
    "SELECT `season`, count(id) AS matchesCount FROM `matches` GROUP BY season";
  return dataProcess.queryExecuter(matchesPlayedPerYearQuery);
}

module.exports = {
  matchesPlayedPerYear: matchesPlayedPerYear,
};
