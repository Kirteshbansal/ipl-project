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

// Strike rate of a player
function strikeRateOfPlayer(matches, deliveries, playerName) {
  let playerDataPerMatch = deliveries.reduce((data, delivery) => {
    let batsman = delivery["batsman"];
    let id = delivery["match_id"];
    if (batsman == playerName) {
      if (data.hasOwnProperty(id)) {
        data[id]["balls"] += 1;
        data[id]["runs"] += parseInt(delivery["batsman_runs"]);
      } else {
        data[id] = {};
        data[id]["balls"] = 1;
        data[id]["runs"] = parseInt(delivery["batsman_runs"]);
      }
    }
    return data;
  }, {});

  let strikeRate = (balls, runs) => ((runs / balls) * 100).toFixed(2);

  return Object.entries(
    matches.reduce((result, match) => {
      let matchId = match["id"];
      let season = match["season"];
      if (playerDataPerMatch[matchId]) {
        if (result[season]) {
          result[season]["balls"] += playerDataPerMatch[matchId]["balls"];
          result[season]["runs"] += playerDataPerMatch[matchId]["runs"];
        } else {
          result[season] = {};
          result[season]["balls"] = playerDataPerMatch[matchId]["balls"];
          result[season]["runs"] = playerDataPerMatch[matchId]["runs"];
        }
      }
      return result;
    }, {})
  ).reduce((result, season) => {
    result[season[0]] = parseFloat(
      strikeRate(season[1]["balls"], season[1]["runs"])
    );
    return result;
  }, {});
}

// Highest times dissmissed player
function highestTimesDissmissedPlayer(deliveries) {
  const result = Object.entries(
    deliveries.reduce((data, delivery) => {
      let bowler = delivery["bowler"];
      let dismissedplayer = delivery["player_dismissed"];
      if (dismissedplayer) {
        let key = dismissedplayer + "-" + bowler;
        if (data[key]) {
          data[key] += 1;
        } else {
          data[key] = 1;
        }
      }
      return data;
    }, {})
  ).sort((a, b) => b[1] - a[1])[0];
  result[0] = result[0].split("-");
  return {
    "player name": result[0][0],
    "dissmisal count": result[1],
    "bowler name": result[0][1],
  };
}

// Best economy rate bowler in super overs
function bestSuperOverEconomyBowler(deleveries) {
  let result = deleveries.reduce((result, delivery) => {
    if (parseInt(delivery["is_super_over"]) !== 0) {
      let bowler = delivery["bowler"];
      if (result[bowler]) {
        result[bowler][0] += parseInt(delivery["total_runs"]);
        result[bowler][1] += 1;
      } else {
        result[bowler] = [];
        result[bowler][0] = parseInt(delivery["total_runs"]);
        result[bowler][1] = 1;
      }
    }
    return result;
  }, {});

  result = Object.entries(result);

  const economyRate = (balls, runs) =>
    parseFloat(runs / parseFloat(balls / 6)).toFixed(2);

  result = result
    .map((bowler) => [
      bowler[0],
      (bowler[1] = parseFloat(economyRate(bowler[1][1], bowler[1][0]))),
    ])
    .sort((a, b) => a[1] - b[1])[0];

  return { bowler: result[0], "economy rate": result[1] };
}

module.exports = {
  teamWonTossAndMatch: teamWonTossAndMatch,
  highestTimesPOMPerSeason: highestTimesPOMPerSeason,
  strikeRateOfPlayer: strikeRateOfPlayer,
  highestTimesDissmissedPlayer: highestTimesDissmissedPlayer,
  bestSuperOverEconomyBowler: bestSuperOverEconomyBowler,
};
