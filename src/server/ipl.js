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

// Extra runs conceded per team in the year 2016
function extraRunsConcededByEachTeam() {
  const extraRunsConcededByEachTeamQuery =
    "SELECT `bowling_team`, SUM(`extra_runs`) AS extra_runs_conceded FROM `deliveries` LEFT JOIN matches ON match_id = id WHERE season = 2016 GROUP BY `bowling_team`";
  return dataProcess.queryExecuter(extraRunsConcededByEachTeamQuery);
}

module.exports = {
  matchesPlayedPerYear: matchesPlayedPerYear,
  matchesWonByEachTeam: matchesWonByEachTeam,
  extraRunsConcededByEachTeam: extraRunsConcededByEachTeam,
};
