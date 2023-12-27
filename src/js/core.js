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
import naming from "./modules/naming.js";
import { converters } from "../js/modules/converters.js";
import { fun } from "../js/modules/fun.js";

// Full Transformer
const transformers = {
  ...basic,
  ...naming,
  ...converters,
  ...fun
};

export { strTo, transformers };
