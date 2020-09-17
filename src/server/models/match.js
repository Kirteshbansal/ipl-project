const sequelize = require("sequelize");

const connection = require("../config");

const matches = connection.define(
  "matches",
  {
    id: {
      type: sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    season: sequelize.INTEGER,
    city: sequelize.STRING,
    date: sequelize.DATEONLY,
    team1: sequelize.STRING,
    team2: sequelize.STRING,
    toss_winner: sequelize.STRING,
    toss_decision: sequelize.STRING,
    result: sequelize.STRING,
    dl_applied: sequelize.INTEGER,
    winner: sequelize.STRING,
    win_by_runs: sequelize.INTEGER,
    win_by_wickets: sequelize.INTEGER,
    player_of_match: sequelize.STRING,
    venue: sequelize.STRING,
    umpire1: sequelize.STRING,
    umpire2: sequelize.STRING,
    umpire3: sequelize.STRING,
  },
  {
    timestamps: false,
  }
);

module.exports = matches;
