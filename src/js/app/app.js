import { strTo, transformers } from "../core.js";
import msg from "../data/msg.js";
import { copyValue, resetInput } from "../modules/utils.js";

const executeConverter = ({ mode, str, transformers, outputTextarea }) => {
  outputTextarea.value = strTo({ mode, str, transformers });
};

const updateFormMessage = ({
  transformerId,
  title,
  description,
  inputLabel,
  outputLabel,
}) => {
  title.textContent = msg[transformerId]
    ? msg[transformerId].title
    : msg.defaultConverter.title;
  description.textContent = msg[transformerId]
    ? msg[transformerId].description
    : msg.defaultConverter.description;
  inputLabel.textContent = msg[transformerId]
    ? msg[transformerId].inputLabel
    : msg.defaultConverter.inputLabel;
  outputLabel.textContent = msg[transformerId]
    ? msg[transformerId].outputLabel
    : msg.defaultConverter.outputLabel;
};

const updateForm = (transformerId) => {
  const form = document.querySelector("#formApp");
  const title = form?.querySelector(".js-st-titleSelected");
  const description = form?.querySelector(".js-st-descriptionSelected");
  const inputLabel = form?.querySelector("label[for=input]");
  const inputTextarea = form?.querySelector("#input");
  const outputLabel = form?.querySelector("label[for=output]");
  const outputTextarea = form?.querySelector("#output");

  if (
    !transformerId ||
    !form ||
    !title ||
    !inputTextarea ||
    !outputTextarea ||
    !inputLabel ||
    !outputLabel
  )
    return;

  updateFormMessage({
    transformerId,
    title,
    description,
    inputLabel,
    outputLabel,
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    updateForm(transformerId);
  })

  inputTextarea.addEventListener("change", (event) => {
    event.preventDefault();
    const currentValue = event.target.value;
    console.log("inputTextarea change", currentValue);
    executeConverter({
      mode: transformerId,
      str: currentValue,
      transformers: transformers,
      outputTextarea: outputTextarea,
    });
  });

  copyValue({
    btn: document.querySelector("#copyOutputBtn"),
    outputCopy: outputTextarea,
  });

  resetInput({
    btn: document.querySelector("#resetInputBtn"),
    inputReset: inputTextarea,
    outputReset: outputTextarea
  });
};

function createMenu(data) {
  const output = document.querySelector("#stMenu");
  if (!output || !data) return;
  const parser = new DOMParser();

  // Create menu
  const menuHtml = () => {
    const _data = Object.keys(data);
    let listItems = "";
    _data.forEach((item) => {
      listItems += `<option value="${item}">${item}</option>`;
    });
    const dropdownStructure = `<select><option value="" disabled selected>Select Transformer</option>${listItems}</select>`;
    return dropdownStructure;
  };

  // Init Event
  const parsedHtml = parser.parseFromString(menuHtml(), "text/html");
  const selector = parsedHtml.querySelector("select");
  selector.addEventListener("change", (event) => {
    event.preventDefault();
    updateForm(event.target.value);
  });

  output.appendChild(selector);
}


function app() {
  createMenu(transformers);
  console.log("app");
}
export default app;
