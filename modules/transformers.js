/**
 * JSON Rules:
 * - Not trim
 * - always return string
 */


// # BASICS
const basics = {
  trim: (str) => str.trim(),
  lowerCase: (str) => str.toLowerCase(),
  upperCase: (str) => str.toUpperCase(),
};



// # NAMING CONVENTIONS
const namingConventions = {
  camelCase: (str) =>
    str.replace(/\s+(.)/g, (match, first) => first.toUpperCase()),
  pascalCase: (str) =>
    str.replace(/\b\w|\s+\w/g, (match) =>
      match.replace(/\s+/g, "").toUpperCase()
    ),
  snakeCase: (str) => str.replace(/\s+/g, "_").toLowerCase(),
  screamingSnakeCase: (str) => str.trim().replace(/\s+/g, "_").toUpperCase(),
  camelSnakeCase: (str) =>
    str.replace(/\s+(.)/g, (match, first) => "_" + first.toUpperCase()),
  kebabCase: (str) => str.trim().replace(/\s+/g, "-").toLowerCase(),
  screamingKebabCase: (str) => str.trim().replace(/\s+/g, "-").toUpperCase(),
  spongebobCase: (str) =>
    str
      .split("")
      .map((char, index) =>
        index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
      )
      .join(""),
  trainCase: (str) =>
    str.replace(/\s+(.)/g, (match, first) => "-" + first.toUpperCase()),
};

// # CONVERTERS
const converters = {
  binary2Utf8: (str) => {
    // Check if the string contains only 0s and 1s
    const isBinaryString = (str) => /^[0-1]+$/.test(str);
    if (!isBinaryString(str)) return "INPUT NO BINARY";

    // Splits the binary string into 8-bit chunks
    const binaryArray = str.match(/.{1,8}/g);
    // Converts each 8-bit fragment to a decimal number.
    const decimalArray = binaryArray.map((bin) => parseInt(bin, 2));
    // Converts each decimal number to a UTF-8 character
    const charArray = decimalArray.map((num) => String.fromCharCode(num));
    // Combines all characters in a string
    return charArray.join("");
  },
  utf82binary: (str) => {
    // Iterate over each character of the text string
    const binaryArray = Array.from(str).map((char) => {
      // Convert each character to its corresponding ASCII value
      const asciiValue = char.charCodeAt(0);
      // Convert each ASCII value to a binary string
      let binaryValue = asciiValue.toString(2);
      // Pad each binary string with leading zeros to make it 8 bits long
      return binaryValue.padStart(8, "0");
    });
    // Join all binary strings into one binary string, separated by spaces
    return binaryArray.join(" ");
  },
  reverseText: (str) => str.split("").reverse().join(""),
  upsideDownText: (str) => {
    const upsideDownMap = {
      a: "\u0250",
      b: "q",
      c: "\u0254",
      d: "p",
      e: "\u01DD",
      f: "\u025F",
      g: "\u0183",
      h: "\u0265",
      i: "\u0131",
      j: "\u027E",
      k: "\u029E",
      l: "l",
      m: "\u026F",
      n: "u",
      o: "o",
      p: "d",
      q: "b",
      r: "\u0279",
      s: "s",
      t: "\u0287",
      u: "n",
      v: "\u028C",
      w: "\u028D",
      x: "x",
      y: "\u028E",
      z: "z",
      ".": "\u02D9",
      ",": "'",
      "?": "\u00BF",
      "!": "\u00A1",
      "(": ")",
      ")": "(",
      "[": "]",
      "]": "[",
      "{": "}",
      "}": "{",
    };
    const charArray = str.split("");
    const upsideDownArray = charArray.map(
      (char) => upsideDownMap[char.toLowerCase()] || char
    );
    const reversedArray = upsideDownArray.reverse();
    const upsideDownText = reversedArray.join("");
    return upsideDownText;
  },
  escapeHtml2String: (str) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;"),

  escapeString2Html: (str) =>
    str
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'"),
};

///////////////////////////




// Full Transformer
export const transformers = {
  ...basics,
  ...namingConventions,
  ...converters,
};


/**
 * Transform from string
 * @param {json} 
 * @returns  string
 */
export const strTo = ({ mode, str }) => {
  return typeof str !== "string" || !transformers
    ? null
    : transformers[mode](str.trim());
};
