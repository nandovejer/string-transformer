const checker = {
    isBase64: (str) => {
      // CASE 1: It checks if the length of the string is a multiple of 4, which is a characteristic of Base64 strings.
      if (str.length % 4 !== 0) {
        return false;
      }
      // CASE 2: A regular expression is used to check if the string contains only Base64 valid characters.
      const base64Regex = /^(?:[A-Za-z\d+/]{4})*(?:[A-Za-z\d+/]{2}==|[A-Za-z\d+/]{3}=)?$/;
      if (!base64Regex.test(str)) {
        return false;
      }
      // CASE 3: An attempt is made to decode the string with atob() and then re-encode it with btoa(). 
      // If the resulting string matches the original string, then it is likely to be a valid Base64 string.
      const decoded = atob(str);
      const reEncoded = btoa(decoded);
      return str === reEncoded;
    },
    isBinary: (str) => /^[0-1]+$/.test(str),
    isMorse: (str) => /^[.-\s/]*$/.test(str)
  }

  export default checker;