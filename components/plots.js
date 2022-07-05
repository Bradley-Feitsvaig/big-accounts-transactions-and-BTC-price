import {plot} from 'nodeplotlib'

/* Build scatter plot, uses nodeplotlib library */
function plotScatter(dataForPlot) {
  var arrangedDataForPlots = getData(dataForPlot);
  var trace1 = {
      x: arrangedDataForPlots[0],
      y: arrangedDataForPlots[1],
      mode: "markers",
      name: "BTC price increased",
      marker: {
        color: "rgb(164, 194, 244)",
        size: 12,
        line: {
          color: "white",
          width: 0.5
        }
      },
      type: "scatter"
    };
  var trace2 = {
    x: arrangedDataForPlots[2],
    y: arrangedDataForPlots[3],
    mode: "markers",
    name: "BTC price decreased",
    marker: {
      color: "rgb(255, 217, 102)",
      size: 12,
      line: {
        color: "white",
        width: 0.5
      }
    },
    type: "scatter"
  };
  var data = [trace1, trace2];
  var layout = {
    title: "BTC analysis",
    xaxis: {
      title: "BTC purchase amount"
    },
    yaxis: {
      title: "Changes (in fraction) of BTC in last week"
    }
  };
  var graphOptions = {layout: layout};
  plot(data, graphOptions);
}
export default plotScatter


/* Function arranges the data to suitble format for plots*/
function getData(dataForPlot) {
  var xtrace1 = [];
  var ytrace1 = [];
  var xtrace2 = [];
  var ytrace2 = [];
  for (var i  in dataForPlot[1]){
    if(dataForPlot[1][i] == 1){
      xtrace1.push(dataForPlot[0][i][0]);
      ytrace1.push(dataForPlot[0][i][1]);
    }
    else{
      xtrace2.push(dataForPlot[0][i][0]);
      ytrace2.push(dataForPlot[0][i][1]);
    }
  }
  return [xtrace1,ytrace1,xtrace2,ytrace2];
}