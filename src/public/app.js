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
        name: "Teams",
        data: teamData,
      },
    ],
  });
}

visualizeTeamWonTossAndMatch();
