/**
 * JSON Rules:
 * - Not trim
 * - always return string
 */


import basic from "./basic.js";
import namingConventions from "./namingConventions.js";
import converters from "./converters.js";


// Full Transformer
export const transformers = {
  ...basic,
  ...namingConventions,
  ...converters,
};

