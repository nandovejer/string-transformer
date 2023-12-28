import { testFullTransformers } from "./src/test/test.js";
import app from "./src/js/app/app.js";

document.addEventListener("DOMContentLoaded", () => {
  testFullTransformers();
  app();
});
