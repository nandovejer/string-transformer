import transformer from "./modules/transformer.js";
const strTo = ({ mode, str }) => {
  return typeof str !== "string" || !transformer
    ? null
    : transformer[mode](str.trim());
};

/////////////
const TEST = () => {
  const STR_EXAMPLE = "  Ama ama AMA Y ensanCHa el AlMa   ";
  const array = Object.keys(transformer);
  array.map((item) => {
    const r = strTo({ mode: item, str: STR_EXAMPLE });
    console.table({
        mode: item, 
        input: STR_EXAMPLE,
        output: r
    });
  });
};
TEST();
///////