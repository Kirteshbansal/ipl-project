// Team won both toss and match function
function teamWonTossAndMatch(matches) {
  return matches.reduce((result, match) => {
    let tossWinner = match["toss_winner"];
    let matchWinner = match["winner"];
    if (tossWinner == matchWinner) {
      if (result[tossWinner]) {
        result[tossWinner] += 1;
      } else {
        result[tossWinner] = 1;
      }
    }
    return result;
  }, {});
}

//   Highest times player of the match per season
function highestTimesPOMPerSeason(matches) {
  return Object.entries(
    matches.reduce((data, match) => {
      let season = match["season"];
      let playerOfMatch = match["player_of_match"];
      if (data[season]) {
        if (data[season][playerOfMatch]) {
          data[season][playerOfMatch] += 1;
        } else {
          data[season][playerOfMatch] = 1;
        }
      } else {
        data[season] = {};
        data[season][playerOfMatch] = 1;
      }
      return data;
    }, {})
  ).reduce((result, match) => {
    let max = Object.entries(match[1]).sort((a, b) => b[1] - a[1])[0];
    result[match[0]] = max;
    return result;
  }, {});
}

module.exports = {
  teamWonTossAndMatch: teamWonTossAndMatch,
  highestTimesPOMPerSeason: highestTimesPOMPerSeason,
};
