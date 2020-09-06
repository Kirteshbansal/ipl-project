async function visualizeTeamWonTossAndMatch() {
  let data = await fetch("./output/teamWonTossAndMatch.json")
    .then((response) => response.json())
    .then((response) => response.teamWonTossAndMatch);

  const teamData = Object.entries(data);
  
  Highcharts.chart("teams-won-matches-and-toss", {
    chart: {
      type: "column",
    },
    title: {
      text: "1. Number of Times Each Team Won Both Toss And Match",
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      type: "category",
      labels: {
        rotation: -45,
        style: {
          fontSize: "13px",
          fontFamily: "Verdana, sans-serif",
        },
      },
    },
    yAxis: {
      title: {
        text: "Number of times",
      },
    },
    series: [
      {
        name: "Won toss & match",
        data: teamData,
      },
    ],
  });
}

visualizeTeamWonTossAndMatch();

async function visualizehighestTimesPOMPerSeason() {
  let data = await fetch("./output/highestTimesPOMPerSeason.json")
    .then((response) => response.json())
    .then((response) => response.highestTimesPOMPerSeason)
    .then((response) => Object.entries(response))
    .then((response) => response.map((response) => ({ name: response[1][0], data: [[response[0], response[1][1]]] })));

  Highcharts.chart("player-of-the-match-per-season", {
    chart: {
      type: "column",
    },
    title: {
      text: "2. Highest Times Player of The Match Per Season",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Number of times",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.f} times</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 1,
            borderWidth: 5
        }
    },
    series: data,
  });
}

visualizehighestTimesPOMPerSeason();


async function visualizestrikeRateOfPlayer() {
  let data = await fetch("./output/strikeRateOfPlayer.json")
    .then((response) => response.json())
    .then((response) => response["strikeRateOfMS Dhoni"]);

  const playerData = Object.entries(data);
  
  Highcharts.chart("strike-rate-of-player", {
    chart: {
      type: "column",
    },
    title: {
      text: "3. Strike Rate of MS Dhoni Per Season",
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      type: "category",
      labels: {
        rotation: 0,
        style: {
          fontSize: "13px",
          fontFamily: "Verdana, sans-serif",
        },
      },
    },
    yAxis: {
      title: {
        text: "Strike rate",
      },
    },
    series: [
      {
        name: "Strike rate",
        data: playerData,
      },
    ],
  });
}

visualizestrikeRateOfPlayer();


function CommonHighChart(container,title,yAxisTitle,name,data){

  Highcharts.chart(container, {
    chart: {
      type: "column",
    },
    title: {
      text: title,
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      type: "category",
      labels: {
        rotation: name === "Strike rate" ? 0 : -45,
        style: {
          fontSize: "13px",
          fontFamily: "Verdana, sans-serif",
        },
      },
    },
    yAxis: {
      title: {
        text: yAxisTitle,
      },
    },
    series: [
      {
        name: name,
        data: data,
      },
    ],
  });
}