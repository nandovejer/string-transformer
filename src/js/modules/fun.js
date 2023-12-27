import { MAP_UPSIDE_DOWN } from "../data/dictionary.js";

function reverseText(str) {
  return str.split("").reverse().join("");
}

function upsideDownText(str) {
  const charArray = str.split("");
  const upsideDownArray = charArray.map(
    (char) => MAP_UPSIDE_DOWN[char.toLowerCase()] || char
  );
  const reversedArray = upsideDownArray.reverse();
  return reversedArray.join("");
}

const fun = {
  reverseText: reverseText,
  upsideDownText: upsideDownText,
};

export { reverseText, upsideDownText, fun };
