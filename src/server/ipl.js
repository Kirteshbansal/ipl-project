const sequelize = require("sequelize");

const matches = require("./models/match");

// Number of matchhes played per year
async function matchesPlayedPerYear() {
  try {
    return await matches
      .findAll({
        attributes: [
          "season",
          [sequelize.fn("COUNT", sequelize.col("id")), "total_matches"],
        ],
        group: "season",
      })
      .then((d) => JSON.parse(JSON.stringify(d)));
  } catch (err) {
    throw err;
  }
}

module.exports = {
  matchesPlayedPerYear: matchesPlayedPerYear,
};
