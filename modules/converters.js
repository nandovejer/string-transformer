import checker from "./checker.js";
import msg from "./msg.js";
import {MAP_UPSIDE_DOWN,MAP_ASCII_TO_MORSE,MAP_MORSE_TO_ASCII } from "./dictionary.js";

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
export default converters;