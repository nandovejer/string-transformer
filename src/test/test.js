import { strTo, transformers } from "../js/core.js";

export const testFullTransformers = () => {
  const STR_EXAMPLE = "  Ama ama AMA Y ensanCHa el AlMa   ";
  const array = Object.keys(transformers);
  console.log(array);
  array.map((item) => {
    const r = strTo({
      mode: item,
      str: STR_EXAMPLE,
      transformers: transformers,
    });
    console.table({
      mode: item,
      input: STR_EXAMPLE,
      output: r,
    });
  });
};
