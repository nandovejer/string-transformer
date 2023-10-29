/**
 * JSON Rules:
 * - Not trim
 * - always return string
 */


// CONSTANTS
const MAP_UPSIDE_DOWN = {
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

const MAP_ASCII_TO_MORSE = {
  'A': '.-', 'B': '-...',
  'C': '-.-.', 'D': '-..',
  'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....',
  'I': '..', 'J': '.---',
  'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.',
  'O': '---', 'P': '.--.',
  'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-',
  'U': '..-', 'V': '...-',
  'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..',
  '1': '.----', '2': '..---',
  '3': '...--', '4': '....-',
  '5': '.....', '6': '-....',
  '7': '--...', '8': '---..',
  '9': '----.', '0': '-----',
  '.': '.-.-.-', ',': '--..--',
  ':': '---...', '?': '..--..',
  "'": '.----.', '-': '-....-',
  '/': '-..-.', '(': '-.--.',
  ')': '-.--.-', '&': '.-...',
  ';': '-.-.-.', '=': '-...-',
  '+': '.-.-.', '_': '..--.-',
  '"': '.-..-.', '$': '...-..-',
  '!': '-.-.--', '@': '.--.-.',
  ' ': '/'
};
const MAP_MORSE_TO_ASCII = {
  '.-': 'A', '-...': 'B',
  '-.-.': 'C', '-..': 'D',
  '.': 'E', '..-.': 'F',
  '--.': 'G', '....': 'H',
  '..': 'I', '.---': 'J',
  '-.-': 'K', '.-..': 'L',
  '--': 'M', '-.': 'N',
  '---': 'O', '.--.': 'P',
  '--.-': 'Q', '.-.': 'R',
  '...': 'S', '-': 'T',
  '..-': 'U', '...-': 'V',
  '.--': 'W', '-..-': 'X',
  '-.--': 'Y', '--..': 'Z',
  '.----': '1', '..---': '2',
  '...--': '3', '....-': '4',
  '.....': '5', '-....': '6',
  '--...': '7', '---..': '8',
  '----.': '9', '-----': '0',
  '.-.-.-': '.', '--..--': ',',
  '---...': ':', '..--..': '?',
  '.----.': "'", '-....-': '-',
  '-..-.': '/', '-.--.': '(',
  '-.--.-': ')', '.-...': '&',
  '-.-.-.': ';', '-...-': '=',
  '.-.-.': '+', '..--.-': '_',
  '.-..-.': '"', '...-..-': '$',
  '-.-.--': '!', '.--.-.': '@',
  '/': ' '
};


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
    if (!checker.isBinary(str)) return msg.isBinary.format;

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
  
    const charArray = str.split("");
    const upsideDownArray = charArray.map(
      (char) => MAP_UPSIDE_DOWN[char.toLowerCase()] || char
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
  base64ToASCII: (str) => checker.isBase64(str) ? atob(str) : msg.isBase64.format,
  ASCIIToBase64: (str) => btoa(str),
  text2Morse: (str) => str.toUpperCase().split('').map(char => MAP_ASCII_TO_MORSE[char] || '').join(' '),
  morse2Text: (str) => {
    if(!checker.isMorse(str)) return msg.isMorse.format;
    const morseWords = str.split(' / ');
    const asciiWords = morseWords.map(word => {
      const morseChars = word.split(' ');
      const asciiChars = morseChars.map(char => MAP_MORSE_TO_ASCII[char] || '');
      return asciiChars.join('');
    });
    return asciiWords.join(' ');
  }


};

// CHECK FORMAT OF STRING
const checker = {
  isBase64: (str) => {
    // CASE 1: It checks if the length of the string is a multiple of 4, which is a characteristic of Base64 strings.
    if (str.length % 4 !== 0) {
      return false;
    }
    // CASE 2: A regular expression is used to check if the string contains only Base64 valid characters.
    const base64Regex = /^(?:[A-Za-z\d+/]{4})*(?:[A-Za-z\d+/]{2}==|[A-Za-z\d+/]{3}=)?$/;
    if (!base64Regex.test(str)) {
      return false;
    }
    // CASE 3: An attempt is made to decode the string with atob() and then re-encode it with btoa(). 
    // If the resulting string matches the original string, then it is likely to be a valid Base64 string.
    const decoded = atob(str);
    const reEncoded = btoa(decoded);
    return str === reEncoded;
  },
  isBinary: (str) => /^[0-1]+$/.test(str),
  isMorse: (str) => /^[.-\s/]*$/.test(str)
}

// MESSAGES
const msg = {
  isBinary: {
    format: "Sorry, this string is not a string type binary"
  },
  isBase64: {
    format: "Sorry, this string is not a string type base64"
  },
  isMorse: {
    format: "Sorry, this string is not a morse format. Example: .- ==> A"
  }
}

///////////////////////////




// Full Transformer
export const transformers = {
  ...basics,
  ...namingConventions,
  ...converters,
};

