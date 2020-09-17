const sequelize = require("sequelize");

const connection = require("../config");

let deliveries = connection.define("deliveries", {
  match_id: {
    type: sequelize.INTEGER,
  },
  inning: sequelize.INTEGER,
  batting_team: sequelize.STRING,
  bowling_team: sequelize.STRING,
  over: sequelize.INTEGER,
  ball: sequelize.INTEGER,
  batsman: sequelize.STRING,
  non_striker: sequelize.STRING,
  bowler: sequelize.STRING,
  is_super_over: sequelize.INTEGER,
  wide_runs: sequelize.INTEGER,
  bye_runs: sequelize.INTEGER,
  legbye_runs: sequelize.INTEGER,
  noball_runs: sequelize.INTEGER,
  penalty_runs: sequelize.INTEGER,
  batsman_runs: sequelize.INTEGER,
  extra_runs: sequelize.INTEGER,
  total_runs: sequelize.INTEGER,
  player_dismissed: sequelize.STRING,
  dismissal_kind: sequelize.STRING,
  fielder: sequelize.STRING,
});

deliveries.removeAttribute("id");

module.exports = deliveries;
