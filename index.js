import model from './components/svm.js';
import parseData from './components/parser.js';
import plotScatter from './components/plots.js';


const run = async ()=>{
  /*Parse train dataset */
  var trainDatasetOneDay = parseData("oneDay",'./trainDATASET.csv');
  var trainDatasetThreeDays = parseData("threeDays",'./trainDATASET.csv');
  var trainDatasetWeek = parseData("week",'./trainDATASET.csv');

  /*Parse test dataset */
  var testDatasetOneDay = parseData("oneDay",'./testDATASET.csv');
  var testDatasetThreeDays = parseData("threeDays",'./testDATASET.csv');
  var testDatasetWeek = parseData("week",'./testDATASET.csv');

  /*train 3 model, 1-model for 1 day prediction, 2-model for 3 dayw prediction, 3-model for week prediction */
  var oneDayModel = model(trainDatasetOneDay);
  var threeDaysModel = model(trainDatasetThreeDays);
  var weekModel = model(trainDatasetWeek);

  /*Get predictions for testDATASET*/
  var oneDayModelPredictions = [testDatasetOneDay[0],getPredictions(oneDayModel,testDatasetOneDay[0])];
  var threeDaysModelPredictions = [testDatasetThreeDays[0],getPredictions(threeDaysModel,testDatasetThreeDays[0])];
  var weekModelPredictions = [testDatasetWeek[0],getPredictions(weekModel,testDatasetWeek[0])];

  /*Check and print models accuracy*/
  console.log('\x1b[36m%s\x1b[0m',`"One day" model accuracy is: ${modelAccuracy(oneDayModelPredictions[1],testDatasetOneDay[1])}`);
  console.log('\x1b[36m%s\x1b[0m',`"Three days" model accuracy is: ${modelAccuracy(threeDaysModelPredictions[1],testDatasetThreeDays[1])}`);
  console.log('\x1b[36m%s\x1b[0m',`"Week" model accuracy is: ${modelAccuracy(weekModelPredictions[1],testDatasetWeek[1])}`);

  /*Show plots*/
  plotScatter(oneDayModelPredictions);//Scatter plot for test predictions for 1 day model
  plotScatter(threeDaysModelPredictions);//Scatter plot for test predictions for 3 days model
  plotScatter(weekModelPredictions);//Scatter plot for test predictions for week model

}
run()


/*getPredictions:
Input- relevant model, relevant dataset
Output- Array with oredictions for test dataset*/
function getPredictions(model,dataset) {
  var predictions = [];
  for (var i  in dataset){
    var x = model.predict(dataset[i]);
    predictions.push(x);
  }
  return predictions;
}

/*modelAccuracy
Input- predictions:array of predicted values, trueLabels:array of true labels for test dataset
Output- model accuracy in percentage*/
function modelAccuracy(predictions,trueLabels) {
  var correctPredictions = 0;
  for (var i  in predictions){
    if(predictions[i] == trueLabels[i]){
      correctPredictions++;
    }
  }
  return (correctPredictions/predictions.length)*100;
}