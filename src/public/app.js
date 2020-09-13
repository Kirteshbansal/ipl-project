function fetchAndVisualizeData() {
  fetch("./output/data.json")
    .then((response) => response.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) {
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
}

// visualizeMatchesPlayedPerYear
function visualizeMatchesPlayedPerYear(inputData) {
  const seriesData = inputData.map((el) => Object.values(el));
  CommonHighChart(
    "matches-played-per-year",
    "1. Total Number of Matches Played Per Year",
    "No. of Matches",
    "Years",
    seriesData
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
