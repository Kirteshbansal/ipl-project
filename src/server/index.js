const connection = require("./config");
const dataProcess = require("./dataProcess");
const ipl = require("./ipl");

async function main() {
  try {
    await connection.authenticate();
    console.log("connection successful");
    const result = await Promise.all([
      ipl.matchesPlayedPerYear(),
      ipl.matchesWonByEachTeam(),
      ipl.extraRunsConcededByEachTeam(),
      ipl.economicalBowlers(),
    ]);
    dataProcess.saveData(result);
    await connection.close();
    console.log("connection closed");
  } catch (err) {
    throw err;
  }
}

main().catch(console.error);
