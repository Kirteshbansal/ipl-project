const dataProcess = require("./dataProcess");
const ipl = require("./ipl");

async function main() {
  try {
    const result = await Promise.all([
      ipl.matchesPlayedPerYear(),
      ipl.matchesWonByEachTeam(),
    ]);
    dataProcess.saveData(result);
  } catch (err) {
    throw err;
  }
}

main().catch(console.error);
