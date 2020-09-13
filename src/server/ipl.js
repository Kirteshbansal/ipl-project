const dataProcess = require("./dataProcess");

// Number of matches played per year
function matchesPlayedPerYear() {
  const matchesPlayedPerYearQuery =
    "SELECT `season`, count(id) AS matchesCount FROM `matches` GROUP BY season";
  return dataProcess.queryExecuter(matchesPlayedPerYearQuery);
}

// Number of matches won per team per year in IPL
function matchesWonByEachTeam() {
  const matchesWonByEachTeamQuery =
    "SELECT `season`, winner ,COUNT(winner) AS total_wins FROM matches GROUP BY season,winner;";
  return dataProcess.queryExecuter(matchesWonByEachTeamQuery);
}

module.exports = {
  matchesPlayedPerYear: matchesPlayedPerYear,
  matchesWonByEachTeam: matchesWonByEachTeam,
};
