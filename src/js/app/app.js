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
  const transformerId = transformerStatusEvent.get();
  if (!transformerId) return;
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputValue = form.elements.input.value;
    updateForm({ transformerId, inputValue });
  });

  inputTextarea.addEventListener("change", (event) => {
    event.preventDefault();
    const inputValue = event.target.value;
    updateForm({ transformerId, inputValue });
  });

  copyValue({
    btn: copyOutputBtn,
    outputCopy: outputTextarea,
  });

  resetInput({
    btn: resetInputBtn,
    inputReset: inputTextarea,
    outputReset: outputTextarea,
  });
};

const updateForm = ({ inputValue }) => {
  const transformerId = transformerStatusEvent.get();
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

  initEvents();

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

const transformerStatusEvent = {
  currentTransformerId: null,
  dispatch: (value = null) => {
    transformerStatusEvent.currentTransformerId = value;
    const transformerIdEvent = new CustomEvent("updateTransformerId", {
      detail: { transformerId: value },
    });
    document.dispatchEvent(transformerIdEvent);
  },
  get: () => transformerStatusEvent.currentTransformerId,
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
    transformerStatusEvent.dispatch(event.target.value);
    if (inputTextarea) {
      updateForm({ inputValue: inputTextarea.value });
    }
  });

  output.appendChild(selector);
}

function app() {
  transformerStatusEvent.dispatch(null);
  createMenu(transformers);
  updateForm({ inputValue: inputTextarea.value });
}

export default app;

/*
const form = document.querySelector("#formApp");
const title = form?.querySelector(".js-st-titleSelected");
const description = form?.querySelector(".js-st-descriptionSelected");
const inputLabel = form?.querySelector("label[for=input]");
const inputTextarea = form?.querySelector("#input");
const outputLabel = form?.querySelector("label[for=output]");
const outputTextarea = form?.querySelector("#output");

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

const updateForm = ({ transformerId, currentValue }) => {
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
    str: currentValue,
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
    event.preventDefault();
    updateForm({
      transformId: event.target.value,
      currentValue: form.elements.input.value,
    });
  });

  output.appendChild(selector);
}

const initEvents = () => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const currentValue = form.elements.input.value;
    updateForm({ transformerId, currentValue });
  });

  inputTextarea.addEventListener("change", (event) => {
    event.preventDefault();
    const currentValue = event.target.value;
    updateForm({ transformerId, currentValue });
  });

  copyValue({
    btn: document.querySelector("#copyOutputBtn"),
    outputCopy: outputTextarea,
  });

  resetInput({
    btn: document.querySelector("#resetInputBtn"),
    inputReset: inputTextarea,
    outputReset: outputTextarea,
  });
};

// Custom Event Like global status
const transformerStatusEvent = {
  get: () => {
    document.addEventListener("updateTransformerId", (event) => {
      console.log(event.detail.transformId);
      return event.detail.transformId;
    });
  },
  set: () => {},
  dispatch: () => {
    const transformerIdEvent = new CustomEvent("updateTransformerId", {
      detail: { transformerId: null },
    });
    document.dispatchEvent(transformerIdEvent);
  },
};

function app() {
  transformerStatusEvent.dispatch();
  console.log(transformerStatusEvent.get());

  // initEvents();
  // createMenu(transformers);
  // console.log("app");
}
export default app;
*/
