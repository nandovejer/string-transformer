const copyValue = ({ btn, outputCopy }) => {

  const copyToClipboard = (event) => {
    event.preventDefault();
    const outputValue = outputCopy.value;
    if(!outputValue) return;
    
    navigator.clipboard
      .writeText(outputValue)
      .then(() => {
        console.log("Text in clipboard: " + outputValue);
      })
      .catch((err) => {
        console.error("Error clipboard: ", err);
      });
  };

  btn.addEventListener("click", copyToClipboard);
};

const resetInput = ({ btn, inputReset, outputReset }) => {
  const reset = (event) => {
    event.preventDefault();
    inputReset.value = "";
    outputReset.value = "";
  };

  btn.addEventListener("click", reset);
};

export { copyValue, resetInput };
