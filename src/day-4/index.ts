const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);
const assignments = input.split("\n");

const getNumberFromRanges = (start: number, end: number) => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

const ranges = assignments.map((assignment) => {
  const [firstStart, firstEnd] = assignment.split(",")[0].split("-");
  const [secondStart, secondEnd] = assignment.split(",")[1].split("-");
  const range1 = getNumberFromRanges(+firstStart, +firstEnd);
  const range2 = getNumberFromRanges(+secondStart, +secondEnd);
  return { range1, range2 };
});

const isFirstFullyArrayInSecond = (first: number[], second: number[]) => {
  let isOverlapping = true;
  first.forEach((e) => {
    isOverlapping = isOverlapping && second.includes(e);
  });
  return isOverlapping;
};

const isFirstPartiallyArrayInSecond = (first: number[], second: number[]) => {
  let isOverlapping = false;
  first.forEach((e) => {
    isOverlapping = isOverlapping || second.includes(e);
  });
  return isOverlapping;
};

const overlaps = ranges.filter(
  ({ range1, range2 }) =>
    isFirstFullyArrayInSecond(range1, range2) ||
    isFirstFullyArrayInSecond(range2, range1)
);

console.log("First part:", overlaps.length);

const seconDoverlaps = ranges.filter(
  ({ range1, range2 }) =>
    isFirstPartiallyArrayInSecond(range1, range2) ||
    isFirstPartiallyArrayInSecond(range2, range1)
);

console.log("Second part:", seconDoverlaps.length);
