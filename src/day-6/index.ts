const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);
const charPacket = input;

function areAllCharsDifferent(chars) {
  // Create a set from the array of characters
  const charSet = new Set(chars);
  // If the set size is equal to the array length, then all characters are different
  return charSet.size === chars.length;
}

const charList = charPacket.split("");

const getCharPacket = (charList, numberDistinctChar) => {
  const charCount = [];

  charList.some((char, index) => {
    const charProcessed = charList.slice(index, index + numberDistinctChar);
    if (areAllCharsDifferent(charProcessed)) {
      charCount.push(...charProcessed);
      return true;
    } else {
      charCount.push(char);
    }
  });
  return charCount;
};

console.log("Part 1 : " + getCharPacket(charList, 4).length);
console.log("Part 2 : " + getCharPacket(charList, 14).length);
