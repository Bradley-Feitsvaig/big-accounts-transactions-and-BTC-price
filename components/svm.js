import SVM from 'ml-svm';

function model(datadet) {

    var options = { //Parameters for SVM
        C: 1000,
        tol: 10e-4,
        maxPasses: 100,
        maxIterations: 100000,
        kernel: 'rbf',
        kernelOptions: {
          sigma: 2
        }
      };
       
      var svm = new SVM(options); //New SVM
       
      // Train the classifier
      var features = datadet[0];
      var labels = datadet[1];
      svm.train(features,labels);
      return(svm)//Return trained SVM

}
export default model