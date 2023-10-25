import { transformers } from "../modules/transformers.js";
import { strTo } from "../modules/transformersHelper.js";

export const testFullTransformers = () => {
    const STR_EXAMPLE = "  Ama ama AMA Y ensanCHa el AlMa   ";
    const array = Object.keys(transformers);
    array.map((item) => {
        const r = strTo({ item, STR_EXAMPLE, transformers });
        console.table({
            mode: item,
            input: STR_EXAMPLE,
            output: r
        });
    });
};