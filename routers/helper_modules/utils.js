//useful module to get a random element in an array: used for movie.js
const getRandomElement = response => {
  const path = response.results;
  const resultsLength = path.length;
  const randomNumber = Math.floor(Math.random() * resultsLength);
  
  return path[randomNumber];
}

module.exports = {
  getRandomElement
};

