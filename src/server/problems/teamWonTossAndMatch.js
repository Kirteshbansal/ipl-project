function teamWonTossAndMatch(matches){
    var teams = {}
    
    for(let match of matches){
        if(match['toss_winner'] == match['winner']){
            // console.log(match['toss_winner']," and ",match['winner'])
        if(teams.hasOwnProperty(match['toss_winner'])){
            teams[match['toss_winner']] +=1;
        }else{
            teams[match['toss_winner']] =1;
        }
        }
    }    
    return teams;
  }

module.exports = teamWonTossAndMatch;