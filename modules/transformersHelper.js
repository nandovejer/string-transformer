/**
 * Transform from string
 * @param {json} 
 * @returns  string
 */
export const strTo = ({ mode, str, transformers }) => {
    return typeof str !== "string" || !transformers
      ? null
      : transformers[mode](str.trim());
  };
  