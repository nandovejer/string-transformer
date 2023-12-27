// # NAMING CONVENTIONS
const namingConventions = {
    camelCase: (str) =>
      str.replace(/\s+(.)/g, (match, first) => first.toUpperCase()),
    pascalCase: (str) =>
      str.replace(/\b\w|\s+\w/g, (match) =>
        match.replace(/\s+/g, "").toUpperCase()
      ),
    snakeCase: (str) => str.replace(/\s+/g, "_").toLowerCase(),
    screamingSnakeCase: (str) => str.trim().replace(/\s+/g, "_").toUpperCase(),
    camelSnakeCase: (str) =>
      str.replace(/\s+(.)/g, (match, first) => "_" + first.toUpperCase()),
    kebabCase: (str) => str.trim().replace(/\s+/g, "-").toLowerCase(),
    screamingKebabCase: (str) => str.trim().replace(/\s+/g, "-").toUpperCase(),
    spongebobCase: (str) =>
      str
        .split("")
        .map((char, index) =>
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        )
        .join(""),
    trainCase: (str) =>
      str.replace(/\s+(.)/g, (match, first) => "-" + first.toUpperCase()),
  };

  export default namingConventions;