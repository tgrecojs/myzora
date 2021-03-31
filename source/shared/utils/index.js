const compose = (...fns) => (initialValue) =>
  fns.reduceRight((val, fn) => fn(val), initialValue);

// helpers
const convertString = (char) => (x = "") => x.split(" ").join(char);
const hyphenateString = convertString("-");
const specialCharactersRegex = new RegExp(/[^a-zA-Z]/g);
const removeSpecialChars = (s) => s.replace(specialCharactersRegex, " ");
const trim = (x) => x.trim();

// utility fns
const sanitizeString = compose(hyphenateString, trim, removeSpecialChars);

export { sanitizeString };
