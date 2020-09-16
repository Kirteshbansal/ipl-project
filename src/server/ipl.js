const sequelize = require("sequelize");

const matches = require("./models/match");
const deliveries = require("./models/delivery");

// Number of matches played per year
async function matchesPlayedPerYear() {
  try {
    return await matches.findAll({
      attributes: [
        "season",
        [sequelize.fn("COUNT", sequelize.col("id")), "total_matches"],
      ],
      raw: true,
      group: "season",
    });
  } catch (err) {
    throw err;
  }
}

// Number of matches won per team per year in IPL
async function matchesWonByEachTeam() {
  try {
    return await matches.findAll({
      attributes: [
        "season",
        "winner",
        [sequelize.fn("COUNT", sequelize.col("winner")), "total_wins"],
      ],
      raw: true,
      group: ["season", "winner"],
    });
  } catch (err) {
    throw err;
  }
}

// Extra runs conceded per team in the year 2016
async function extraRunsConcededByEachTeam() {
  deliveries.belongsTo(matches, { foreignKey: "match_id" });
  matches.hasMany(deliveries);
  try {
    const result = await deliveries.findAll({
      attributes: [
        "bowling_team",
        [
          sequelize.fn("SUM", sequelize.col("extra_runs")),
          "extra_runs_conceded",
        ],
      ],
      raw: true,
      include: [
        {
          model: matches,
          required: true,
          attributes: ["season"],
          where: {
            season: "2016",
          },
        },
      ],
      group: "bowling_team",
    });
    return result.map((team) => ({
      bowling_team: team["bowling_team"],
      extra_runs_conceded: Number(team["extra_runs_conceded"]),
    }));
  } catch (err) {
    throw err;
  }
}

module.exports = {
  matchesPlayedPerYear: matchesPlayedPerYear,
  matchesWonByEachTeam: matchesWonByEachTeam,
  extraRunsConcededByEachTeam: extraRunsConcededByEachTeam,
};
