const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);
const [stacks, steps] = input.split("\n\n");

const quantityStacks = stacks
  .split("\n")
  .slice(-1)
  .pop()
  ?.trim()
  .split(/   /g).length;

const lines = stacks.split("\n").slice(0, -1);

const splitString = (str, numChars) => {
  // Create an array to store the result
  var result = [];

  // Create a variable to keep track of the current index
  var currentIndex = 0;

  // Loop until the current index is greater than or equal to the length of the string
  while (currentIndex < str.length) {
    // Get the substring of the specified number of characters from the current index
    var substring = str.substring(currentIndex, currentIndex + numChars);
    const cleanedSubstring = substring.match(/\[([^\]]+)\]/)?.[1];
    // Add the substring to the result array
    result.push(cleanedSubstring);

    // Increment the current index by the number of characters in the substring
    currentIndex += numChars;
  }

  // Return the result
  return result;
};

const cleanedLines = lines.map((line) => splitString(line, 4));
const stackOfCredList = Array.from({ length: quantityStacks }, () => []);
cleanedLines.reverse().forEach((line) => {
  line.forEach((char, i) => {
    if (char) stackOfCredList[i].push(char);
  });
});

//STEPS
const stepsList = steps.split("\n").map((step) => step.match(/\d+/g));
const stack1 = stackOfCredList.map((stack) => [...stack]);
const stack2 = stackOfCredList.map((stack) => [...stack]);

const Part1 = (stepsList, stackList) => {
  stepsList.forEach((step) => {
    const [quantityToMove, from, to] = step;

    const fromStack = stackList[from - 1];
    const toStack = stackList[to - 1];
    var movedElements = fromStack.splice(-quantityToMove).reverse();
    toStack.push(...movedElements);
  });
  const lastCrateList = stackList
    .map((stack) => stack[stack.length - 1])
    .join("");
  return lastCrateList;
};

const Part2 = (stepsList, stackList) => {
  stepsList.forEach((step) => {
    const [quantityToMove, from, to] = step;

    const fromStack = stackList[from - 1];
    const toStack = stackList[to - 1];
    var movedElements = fromStack.splice(-quantityToMove);
    toStack.push(...movedElements);
  });
  const lastCrateList = stackList
    .map((stack) => stack[stack.length - 1])
    .join("");
  return lastCrateList;
};

console.log("Part 1: " + Part1(stepsList, stack1));
console.log("Part 2: " + Part2(stepsList, stack2));

// console.log(stepsList);
// const [quantityToMove, from, to] = steps.split("\n")[0].match(/\d+/g);
// console.log(quantityToMove, from, to);
