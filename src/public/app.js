function fetchAndVisualizeData() {
  fetch("./output/data.json")
    .then((response) => response.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) {
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeMatchesWonByEachTeam(data.matchesWonByEachTeam);
  visualizeExtraRunsConcededByEachTeam(data.extraRunsConcededByEachTeam);
}

// visualizeMatchesPlayedPerYear
function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = matchesPlayedPerYear.map((el) => Object.values(el));
  CommonHighChart(
    "matches-played-per-year",
    "1. Total Number of Matches Played Per Year",
    "No. of Matches",
    "Years",
    seriesData
  );
}

// visualizeMatchesWonByEachTeam
function visualizeMatchesWonByEachTeam(matchesWonByEachTeam) {
  let seriesData = matchesWonByEachTeam.reduce((result, team) => {
    const winner = team["winner"];
    const season = team["season"];
    const totalWins = team["total_wins"];
    if (result[winner]) {
      result[winner].push([season, totalWins]);
    } else {
      result[winner] = [];
      result[winner].push([season, totalWins]);
    }
    return result;
  }, {});
  seriesData = Object.entries(seriesData).map((team) => ({
    name: team[0],
    data: team[1],
  }));

  multipleBarHighChart(
    "matches-won-by-each",
    "2. Number of matches Won By Each Team Over All the Years of IPL",
    "Matches Won",
    seriesData
  );
}

// visualizeExtraRunsConcededByEachTeam
function visualizeExtraRunsConcededByEachTeam(extraRunsConcededByEachTeam) {
  const seriesData = extraRunsConcededByEachTeam.map((el) => Object.values(el));
  const angle = -45;
  CommonHighChart(
    "extra-runs",
    "3.Extra Runs Conceded by Each Team in 2016",
    "Runs",
    "Teams",
    seriesData,
    angle
  );
}

function CommonHighChart(container, title, yAxisTitle, name, data, angle = 0) {
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
        rotation: angle,
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

function multipleBarHighChart(container, title, yAxistitle, data) {
  Highcharts.chart(container, {
    chart: {
      type: "column",
    },
    title: {
      text: title,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: yAxistitle,
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.f} times</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 1,
        borderWidth: 5,
      },
    },
    series: data,
  });
}
