/**
 * Transform from string
 * @param {json}
 * @returns  string
 */
const strTo = ({ mode, str, transformers }) => {
  return typeof str !== "string" || !transformers
    ? null
    : transformers[mode](str.trim());
};

/**
 * JSON Rules:
 * - Not trim
 * - always return string
 */

import basic from "../js/modules/basic.js";
import namingConventions from "../js/modules/namingConventions.js";
import converters from "../js/modules/converters.js";

// Full Transformer
const transformers = {
  ...basic,
  ...namingConventions,
  ...converters,
};

export { strTo, transformers };
