function strikeRateOfMSDhoni(matches,deliveries){

    let data = {};
    for(let delivery of deliveries){
        let batsman = delivery["batsman"];
        let id = delivery["match_id"];
        if(batsman == "MS Dhoni"){
            // console.log(batsman, id);
            if(data.hasOwnProperty(id)){
                // console.log(data[id])
                    data[id]["balls"] += 1;
                    data[id]["runs"] += parseInt(delivery["batsman_runs"]);    
            }else{
                data[id] = {};
                data[id]["balls"] = 1;
                data[id]["runs"] = parseInt(delivery["batsman_runs"]); 
            }
        }
    }
    // console.log(data)

    let strikeRate = (balls,runs) => ((runs/balls)*100).toFixed(2);
    let result = {};
    for(let match of matches){
        let matchId = match["id"];
        let season = match["season"];
        // console.log(matchId,season,data[matchId])
            if(data[matchId]){
                if(result[season]){
                result[season]["balls"] += data[matchId]["balls"];
                result[season]["runs"] += data[matchId]["runs"];
            }else{
                result[season] = {}
                result[season]["balls"] = data[matchId]["balls"];
                result[season]["runs"] = data[matchId]["runs"];
            }
        }
    }
    for(let season in result){
        result[season] = strikeRate(result[season]["balls"],result[season]["runs"])
    }
    // console.log(result)
    return result;
}


module.exports = strikeRateOfMSDhoni;