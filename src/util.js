function max(arr) {
  return Math.max(...arr);
}

function min(arr) {
  return Math.min(...arr);
}

function shuffle(arr) {
  const arrCopy = arr.slice();
  let counter = arr.length;
  let index;
  let temp;

  while (counter) {
    index = Math.floor(Math.random() * counter--);
    temp = arrCopy[counter];
    arrCopy[counter] = arrCopy[index];
    arrCopy[index] = temp;
  }

  return arrCopy;
}

module.exports = { max, min, shuffle };
