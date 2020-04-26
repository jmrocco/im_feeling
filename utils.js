//useful module to get a random element in an array
const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
  getRandomElement
};
