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

module.exports = {
  teamWonTossAndMatch: teamWonTossAndMatch,
};
