const connection = require("./config");
const dataProcess = require("./dataProcess");
const ipl = require("./ipl");

async function main() {
  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });
  const result = await Promise.all([
    ipl.matchesPlayedPerYear(),
    ipl.matchesWonByEachTeam(),
  ]);
  dataProcess.saveData(result);
  connection.end();
}

main().catch(console.error);
