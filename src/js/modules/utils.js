const copyValue = ({ btn, outputCopy }) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    navigator.clipboard
      .writeText(outputCopy.value)
      .then(() => {
        console.log("Text in clipboard: " + outputCopy.value);
      })
      .catch((err) => {
        console.error("Error clipboard: ", err);
      });
  });
};

const resetInput = ({ btn, inputReset, outputReset }) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    inputReset.value = "";
    outputReset.value = "";
  });
};

export { copyValue, resetInput };
