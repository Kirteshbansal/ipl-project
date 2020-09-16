const sequelize = require("sequelize");
const _ = require("lodash");

const path = require("path");

const connection = require("../config");
const static = require("../static");

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

async function main() {
  try {
    await connection.sync({ force: true });
    let json = await csv().fromFile(static.DELIVERIES_FILE_PATH);
    const chunkSize = 16000;
    const chunks = _.chunk(json, chunkSize);
    return chunks.reduce((acc, chunk, i) => {
      return acc.then(() => {
        return deliveries.bulkCreate(chunk).then(() => {
          console.log("Done with", i);
        });
      });
    }, Promise.resolve());
  } catch (err) {
    throw err;
  }
}
main().catch((err) => console.log(err));

module.exports = deliveries;
