function highestTimesDissmissedPlayer(matches,deliveries){
    let dissmissedPlayers = {};
    for(let delivery of deliveries){
        let bowler = delivery["bowler"];
        let dismissedplayer = delivery["player_dismissed"]
        if(dismissedplayer){
            if(dissmissedPlayers[dismissedplayer]){
                if(dissmissedPlayers[dismissedplayer][bowler]){
                    dissmissedPlayers[dismissedplayer][bowler] += 1;
                }else{
                    dissmissedPlayers[dismissedplayer][bowler] = 1;
                }  
            }else{
                dissmissedPlayers[dismissedplayer] = {};
                dissmissedPlayers[dismissedplayer][bowler] = 1;
            }
        }
    }
    // console.log(dissmissedPlayers)
    
    let result = {};
    let maxDissmisals = 0;
    for(let batsman in dissmissedPlayers){
        // console.log(batsman,dissmissedPlayers[batsman])
        for(let bowler in dissmissedPlayers[batsman]){
            // console.log(bowler,dissmissedPlayers[batsman][bowler])
            if(dissmissedPlayers[batsman][bowler] > maxDissmisals){
        //       console.log(batsman[bowler])
                maxDissmisals = dissmissedPlayers[batsman][bowler]
                result["player name"] = batsman;
                result["dissmisal count"] = dissmissedPlayers[batsman][bowler];
                result["bowler name"] = bowler;
            }
        }
    }
    // console.log(result)
    return result;
}

module.exports = highestTimesDissmissedPlayer;