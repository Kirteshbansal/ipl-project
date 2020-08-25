function bestSuperOverEconomyBowler(deleveries){
    let result = {};
    for(let delivery of deleveries){
        if(parseInt(delivery["is_super_over"]) !== 0){
            let bowler = delivery["bowler"];
            // console.log(bowler)
            if(result[bowler]){
                result[bowler]["runs"] += parseInt(delivery["total_runs"]);
                result[bowler]["balls"] += 1;
            }else{
                result[bowler] = {};
                result[bowler]["runs"] = parseInt(delivery["total_runs"]);
                result[bowler]["balls"] = 1;
            } 
        }
    }
    const economyRate = (balls,runs) => (parseFloat(runs/(parseFloat(balls/6)))).toFixed(2);

    for(let bowler in result){
        result[bowler] = parseFloat(economyRate(result[bowler]["balls"],result[bowler]["runs"]));
    };
    let highestEconomyRate = Math.min(...Object.values(result));
    for(let economicalbowler in result){
        if(result[economicalbowler] == highestEconomyRate){
            // console.log({
            //     "bowler" : economicalbowler,
            //     "economy rate" : result[economicalbowler]
            // });
            return {
                "bowler" : economicalbowler,
                "economy rate" : result[economicalbowler]
            };
        }
    }
}

module.exports = bestSuperOverEconomyBowler;