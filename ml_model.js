let model;

async function loadModel() {
  // model = await tf.loadLayersModel('path/to/your/model.json');
}

async function predictWeather(inputDateString) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const inputDate = new Date(inputDateString);
  const day = inputDate.getDate();
  const month = inputDate.getMonth() + 1;  // JavaScript months are 0-indexed
  const year = inputDate.getFullYear();
  console.log(day)

  // // Create the tensor from the input date
  // const tensorData = tf.tensor([[day, month, year]]);
  
  // const prediction = model.predict(tensorData);
  // const predictionArray = await prediction.array();
  // const predictedTemperature = predictionArray[0][0];
  // const predictedRainProbability = predictionArray[0][1];

  // return {
  //   temperature: predictedTemperature.toFixed(2),
  //   rain: (predictedRainProbability * 100).toFixed(2)
  // };
  return{
    temperature: 25,
    rain: 20
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadModel();
});
