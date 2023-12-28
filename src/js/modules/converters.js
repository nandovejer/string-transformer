import checker from "./checker.js";
import msg from "../data/msg.js";
import {
  MAP_UPSIDE_DOWN,
  MAP_ASCII_TO_MORSE,
  MAP_MORSE_TO_ASCII,
} from "../data/dictionary.js";

function binary2Utf8(str) {
  if (!checker.isBinary(str)) return msg.isBinary.format;
  const binaryArray = str.match(/.{1,8}/g);
  const decimalArray = binaryArray.map((bin) => parseInt(bin, 2));
  const charArray = decimalArray.map((num) => String.fromCharCode(num));
  return charArray.join("");
}

function utf82binary(str) {
  const binaryArray = Array.from(str).map((char) => {
    const asciiValue = char.charCodeAt(0);
    let binaryValue = asciiValue.toString(2);
    return binaryValue.padStart(8, "0");
  });
  return binaryArray.join(" ");
}

function base64ToASCII(str) {
  return checker.isBase64(str) ? atob(str) : msg.isBase64.format;
}

function ASCIIToBase64(str) {
  return btoa(str);
}

function text2Morse(str) {
  return str
    .toUpperCase()
    .split("")
    .map((char) => MAP_ASCII_TO_MORSE[char] || "")
    .join(" ");
}

function morse2Text(str) {
  if (!checker.isMorse(str)) return msg.isMorse.format;
  const morseWords = str.split(" / ");
  const asciiWords = morseWords.map((word) => {
    const morseChars = word.split(" ");
    const asciiChars = morseChars.map((char) => MAP_MORSE_TO_ASCII[char] || "");
    return asciiChars.join("");
  });
  return asciiWords.join(" ");
}

function escapeHtml2String(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function escapeString2Html(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

const opposite = {
  utf8_binary: ["binary2Utf8", "utf82binary"],
  ASCII_Base64: ["base64ToASCII", "ASCIIToBase64"],
  text2Morse: ["text2Morse", "morse2Text"],
  escapeHTML_String: ["escapeHtml2String", "escapeString2Html"],
};

const converters = {
  binary2Utf8: binary2Utf8,
  utf82binary: utf82binary,
  base64ToASCII: base64ToASCII,
  ASCIIToBase64: ASCIIToBase64,
  text2Morse: text2Morse,
  morse2Text: morse2Text,
  escapeHtml2String: escapeHtml2String,
  escapeString2Html: escapeString2Html,
};

export {
  binary2Utf8,
  utf82binary,
  base64ToASCII,
  ASCIIToBase64,
  text2Morse,
  morse2Text,
  escapeHtml2String,
  escapeString2Html,
  opposite,
  converters,
};
