const _ = require("lodash");

const connection = require("../config");
const static = require("../static");
const matches = require("../models/match");
const deliveries = require("../models/delivery");

async function seedMatches() {
  try {
    await connection.sync({ force: true });
    csv()
      .fromFile(static.MATCHES_FILE_PATH)
      .then((data) => matches.bulkCreate(data))
      .then(() => console.log("Matches data has been inserted into table."));
  } catch (err) {
    throw err;
  }
}

deliveries.removeAttribute("id");

async function seedDeliveries() {
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

async function main() {
  try {
    await Promise.all([seedMatches(), seedDeliveries()]);
  } catch (err) {
    throw err;
  }
}
main().catch((err) => console.log(err));
