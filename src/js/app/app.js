import { strTo, transformers } from "../core.js";

const buildMenu = (data) => {
  const output = document.querySelector("#stMenu");
  if (!output || !data) return;

  const _data = Object.keys(data); // Asegúrate de que 'data' es el objeto correcto
  let listItems = "";

  _data.forEach((item) => {
    listItems += `<option value="${item}">${item}</option>`; // Puedes modificar el href según sea necesario
  });

  const dropdownStructure = `
    <select>
        <option value="" disabled selected>Select Transformer</option>
        ${listItems}
    </select>
    `;

  output.innerHTML = dropdownStructure;
};

function app() {
  buildMenu(transformers);
  console.log("app");
}
export default app;
