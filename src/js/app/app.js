import { strTo, transformers } from "../core.js";
import msg from "../data/msg.js";
import { copyValue, resetInput } from "../modules/utils.js";

const form = document.querySelector("#formApp");
const title = form?.querySelector(".js-st-titleSelected");
const description = form?.querySelector(".js-st-descriptionSelected");
const inputLabel = form?.querySelector("label[for=input]");
const inputTextarea = form?.querySelector("#input");
const outputLabel = form?.querySelector("label[for=output]");
const outputTextarea = form?.querySelector("#output");
const copyOutputBtn = form?.querySelector("#copyOutputBtn");
const resetInputBtn = form?.querySelector("#resetInputBtn");

const transformerStatus = {
  set: (value = null) => (window.transformerId = value),
  get: () => window.transformerId,
};

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

const initEvents = () => {
  const transformerId = transformerStatus.get();

  const submitForm = (event) => {
    event.preventDefault();
    console.log("submit form");
    const inputValue = form.elements.input.value;
    updateForm({ transformerId, inputValue });
  };

  const inputTextareaChange = (event) => {
    event.preventDefault();
    console.log("change input textarea");
    const inputValue = event.target.value;
    updateForm({ transformerId, inputValue });
  };

  copyValue({
    btn: copyOutputBtn,
    outputCopy: outputTextarea,
  });

  resetInput({
    btn: resetInputBtn,
    inputReset: inputTextarea,
    outputReset: outputTextarea,
  });

  form.addEventListener("submit", submitForm);
  inputTextarea.addEventListener("change", inputTextareaChange);
};

const updateForm = ({ inputValue }) => {
  const transformerId = transformerStatus.get();
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

  executeConverter({
    mode: transformerId,
    str: inputValue,
    transformers: transformers,
    outputTextarea: outputTextarea,
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
    console.log("change");
    transformerStatus.set(event.target.value);
    if (inputTextarea) {
      updateForm({ inputValue: inputTextarea.value });
    }
  });

  output.appendChild(selector);
}

function app() {
  transformerStatus.set();
  createMenu(transformers);
  updateForm({ inputValue: inputTextarea.value });
  initEvents();
}

export default app;
