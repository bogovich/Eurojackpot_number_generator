/* 
Script generates 5 standard numbers + 2 euro numbers.
The five standard numbers should have a sum between LOW_SUM_LIMIT and HIGH_SUM_LIMIT with the exception of sums in avoidSum

Generator includes four different strategies, of which one is randomly picked.
These strategies combine having 3 or 2 odd numbers with 2 or 3 even numbers, with 2 or 3 numbers being in the lower range and 3 or 2 numbers in the higher range.
*/

let buttonGen;

buttonGen = document.querySelector("#generate-button");

const euroNumPairs = [
  [1, 6],
  [3, 4],
  [5, 2],
  [1, 8],
  [3, 6],
  [5, 4],
  [7, 2],
  [5, 10],
  [7, 8],
  [9, 6],
];

//
const LOW_SUM_LIMIT = 106;
const HIGH_SUM_LIMIT = 129;

const avoidSum = [102, 103, 105, 107, 109, 125];

const stratArr = [
  { lowOddLimit: 2, lowEvenLimit: 1, highOddLimit: 1, highEvenLimit: 1 },
  { lowOddLimit: 1, lowEvenLimit: 2, highOddLimit: 2, highEvenLimit: 0 },
  { lowOddLimit: 2, lowEvenLimit: 1, highOddLimit: 0, highEvenLimit: 2 },
  { lowOddLimit: 1, lowEvenLimit: 2, highOddLimit: 1, highEvenLimit: 1 },
];

const lowOdd = "1,3,5,7,9,11,13,15,17,19,21,23,25"
  .split(",")
  .map((el) => parseInt(el));
const lowEven = "2,4,6,8,10,12,14,16,18,20,22,24"
  .split(",")
  .map((el) => parseInt(el));
const highOdd = "27,29,31,33,35,37,39,41,43,45,47,49"
  .split(",")
  .map((el) => parseInt(el));
const highEven = "26,28,30,32,34,36,38,40,42,44,46,48,50"
  .split(",")
  .map((el) => parseInt(el));

const numberSort = (a, b) => {
  return a - b;
};

const getRandom = (arr, num) => {
  if (num === 1) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  let arrCopy = [...arr];
  let result = [];
  for (let i = 0; i < num; i++) {
    let len = arrCopy.length;
    let randEl = arrCopy[Math.floor(Math.random() * len)];
    result.push(randEl);
    arrCopy = arrCopy.filter((el) => el !== randEl);
  }
  return result;
};

const generatePrimaryNumbers = (stratArgs) => {
  let score = 0;

  let finalNums = [];
  while (
    score < LOW_SUM_LIMIT ||
    score > HIGH_SUM_LIMIT ||
    avoidSum.includes(score)
  ) {
    let chosenNums = [];
    chosenNums.push(getRandom(lowOdd, stratArgs.lowOddLimit));
    chosenNums.push(getRandom(lowEven, stratArgs.lowEvenLimit));
    chosenNums.push(getRandom(highOdd, stratArgs.highOddLimit));
    chosenNums.push(getRandom(highEven, stratArgs.highEvenLimit));

    score = chosenNums.reduce((total, number) => total + number, 0);
    if (
      score >= LOW_SUM_LIMIT ||
      score < HIGH_SUM_LIMIT ||
      !avoidSum.includes(score)
    ) {
      finalNums = [...chosenNums].flat().sort(numberSort);
    }
  }
  return finalNums;
};

const generateEuroNumbers = () => {
  return euroNumPairs[Math.floor(Math.random() * euroNumPairs.length)].sort(
    numberSort
  );
};

const generateEuroJackpot = () => {
  let chosenStrat = getRandom(stratArr, 1);
  let primaryNumbers = generatePrimaryNumbers(chosenStrat);
  let euroNumbers = generateEuroNumbers();
  let winningObj = { primary: primaryNumbers, euro: euroNumbers };
  return winningObj;
};

const showGeneratedNumbers = () => {
  let winningNums = generateEuroJackpot();

  var primaryEls = [].slice.call(document.querySelectorAll(".prim-num"));
  primaryEls.forEach(function (div, idx) {
    if (winningNums.primary.length >= idx) {
      div.textContent = winningNums.primary[idx];
      div.style.color = "#000000";
    }
  });

  var euroEls = [].slice.call(document.querySelectorAll(".euro-num"));
  euroEls.forEach(function (div, idx) {
    if (winningNums.euro.length >= idx) {
      div.textContent = winningNums.euro[idx];
      div.style.color = "#000000";
    }
  });
};

buttonGen.addEventListener("click", showGeneratedNumbers);

let winningNums = generateEuroJackpot();
console.table(winningNums.euro[0]);
