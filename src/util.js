// https://gist.github.com/axelpale/3118596
function combinations(arr, k) {
  if (k > arr.length || k <= 0) return [];
  if (k == arr.length) return [ arr ];

  const combs = [];

  if (k == 1) {
    for (let i = 0; i < arr.length; i++) {
      combs.push([ arr[i] ]);
    }
    return combs;
  }

  for (let i = 0; i < arr.length - k + 1; i++) {
    const head = arr.slice(i, i + 1);
    const tailcombs = combinations(arr.slice(i + 1), k - 1);
    for (let j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
}

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

module.exports = { combinations, max, min, shuffle };
