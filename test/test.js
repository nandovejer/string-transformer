import { transformers, strTo } from "../modules/transformers.js";

export const testFullTransformers = () => {
    const STR_EXAMPLE = "  Ama ama AMA Y ensanCHa el AlMa   ";
    const array = Object.keys(transformers);
    array.map((item) => {
      const r = strTo({ mode: item, str: STR_EXAMPLE });
      console.table({
        mode: item,
        input: STR_EXAMPLE,
        output: r
      });
    });
  };