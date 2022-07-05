import fs from 'fs';

/*Parse data set from csv file 
Input- modeltype: oneDay,threeDays,week
Output-parsed train/test Dataset according to modeltype value*/
function parseData(modelType,filePath) {
    var features = [];
    var labels = [];
    var labelIndex = {oneDay: 3, threeDays: 4, week: 5};
    var textByLine = fs.readFileSync(filePath).toString().split("\n");
    var i;
    var j = labelIndex[modelType];
    for (i = 1; i < textByLine.length-1; i++) {
        features.push([Number(textByLine[i].split(",")[1]),Number(textByLine[i].split(",")[2])]);
        labels.push(Number(textByLine[i].split(",")[j]));
    }
    return([features,labels])
} 
export default parseData