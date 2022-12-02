const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

let Rock = ["A", "X"];
let Paper = ["B", "Y"];
let Scissors = ["C", "Z"];

const Rock_val = 1;
const Paper_val = 2;
const Scissors_val = 3;

const LOST_val = 0;
const DRAW_val = 3;
const WIN_val = 6;

const sign = (sign) => {
  if (Rock.includes(sign)) return "Rock";
  if (Paper.includes(sign)) return "Paper";
  if (Scissors.includes(sign)) return "Scissors";
};
const getFutureResult = (sign) => {
  switch (sign) {
    case "X":
      return "Lose";
      break;
    case "Y":
      return "Draw";
      break;
    case "Z":
      return "Win";
    default:
      break;
  }
};
const signScore = {
  Rock: Rock_val,
  Paper: Paper_val,
  Scissors: Scissors_val,
};

const resultScore = {
  Lose: LOST_val,
  Draw: DRAW_val,
  Win: WIN_val,
};

const getSignForResult = (sign, result) => {
  if (result == "Lose") {
    if (sign == "Rock") return "Scissors";
    if (sign == "Paper") return "Rock";
    if (sign == "Scissors") return "Paper";
  }
  if (result == "Draw") {
    return sign;
  }
  if (result == "Win") {
    if (sign == "Rock") return "Paper";
    if (sign == "Paper") return "Scissors";
    if (sign == "Scissors") return "Rock";
  }
};

const getScore = (sign) => {
  if (Rock.includes(sign)) return Rock_val;
  if (Paper.includes(sign)) return Paper_val;
  if (Scissors.includes(sign)) return Scissors_val;
};

let score_total = 0;
let score_total_exo2 = 0;
input.split("\n").forEach((line) => {
  let result = 0;
  let result_2 = 0;

  let [a, b] = line.split(" ");

  let a_sign = sign(a);
  let b_sign = sign(b);

  let b_result = getFutureResult(b);
  let b_sign_future = getSignForResult(a_sign, b_result);
  let b_score_future = signScore[b_sign_future];

  let a_score = signScore[a_sign];
  let b_score = signScore[b_sign];
  result_2 = resultScore[b_result] + b_score_future;

  if (a_sign == b_sign) result = DRAW_val + b_score;
  if (
    (a_sign === "Scissors" && b_sign === "Rock") ||
    (a_sign === "Rock" && b_sign === "Paper") ||
    (a_sign === "Paper" && b_sign === "Scissors")
  )
    result = WIN_val + b_score;
  if (
    (a_sign === "Rock" && b_sign === "Scissors") ||
    (a_sign === "Paper" && b_sign === "Rock") ||
    (a_sign === "Scissors" && b_sign === "Paper")
  )
    result = LOST_val + b_score;

  score_total += result;
  score_total_exo2 += result_2;

  console.log(a, b);
  console.log(a_score, b_result, b_sign_future, b_score_future, result_2);
});

console.log(score_total);
console.log(score_total_exo2);
console.log("Je t'aime Sara");
