const LEGAL_FORMATS = [
  /^1\s?\(\d{3}\)([\s-]?\d{3}){2}\d$/, // 1(xxx)xxx xxxx - explcit country + area code
  /^1\s?\d{3}([\s-]?\d{3}){2}\d$/, // 1xxxxxx xxxx - explcit country + area code w/o parens
  /^\(\d{3}\)([\s-]?\d{3}){2}\d$/, // (xxx)xxx xxxx - explicit area code
  /^\d{3}([\s-]?\d{3}){2}\d$/, // xxxxxx xxxx - explicit no area code
  // ^ anchors to front of string
  // $ anchors to end of string
  // {3} means 3 occurrences of a thing
  // ? means optional
  // () create groupings of rules
];

const telephoneCheck = (candidate) => {
  return LEGAL_FORMATS.reduce((acc, curr) => {
    return acc || curr.test(candidate);
  }, false);
};