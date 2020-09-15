const sequelize = require("sequelize");

const connection = require("../config");
const static = require("../static");

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

async function main() {
  try {
    await connection.sync();
    csv()
      .fromFile(static.MATCHES_FILE_PATH)
      .then((data) => matches.bulkCreate(data))
      .then(() => console.log("Matches data has been inserted into table."));
  } catch (err) {
    throw err;
  }
}
main().catch(console.error);

module.exports = matches;
