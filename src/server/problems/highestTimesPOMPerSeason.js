function highestTimesPOMPerSeason(matches){
    // {
    //     2018:{
    //         dhoni : 1;
    //         kohli : 5
    //     },
        //    2019:{

        //    }
    // }
    const result = {}
    for(let match of matches){
        let season = match['season'];
        let playerOfMatch = match["player_of_match"];

        if(result[season]){
            if(result[season][playerOfMatch]){
                result[season][playerOfMatch] += 1;
            }else{
                result[season][playerOfMatch] = 1;
            }
        }else{
            result[season] = {};
            result[season][playerOfMatch] = 1;
        }
    }
    // console.log(result);

    for(let i in result){
    let max = Object.entries(result[i]).sort((a,b) => b[1] - a[1])[0];
    result[i] = max
    
}
console.log(result)
    return result;
}

module.exports = highestTimesPOMPerSeason;



