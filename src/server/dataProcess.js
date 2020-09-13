const static = require("./static");
const con = require("./config");

exports.saveData = (result) => {
  const jsonData = {
    matchesPlayedPerYear: result[0],
  };

  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(static.DATA_JSON_FILE_PATH, jsonString, "utf8", (err) => {
    if (err) {
      console.error(err);
    }
  });
};

exports.queryExecuter = (inputQuery) => {
  return new Promise((resolve, reject) => {
    con.query(inputQuery, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
