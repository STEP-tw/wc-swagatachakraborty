const SPACE = " ";
const NEWLINE = "\n";
const EMPTYSTRING = "";
const DASH = '-';
const SEVENSPACES = '       ';
const SIXSPACES = '      ';

const startWithDash = string => string.startsWith(DASH);
const isEmptySrting = x => x == '';

const splitByNewLine = x => x.split(NEWLINE);
const splitBySpace = x => x.split(SPACE);

const joinBySpace = (x,y) => x + SPACE + y;
const joinByNewLine = (x,y) => x + NEWLINE + y;

const rightJustifier = function (width, text) {
  let leadingSpaces = width - text.toString().length;
  if(leadingSpaces < 1) leadingSpaces = 1;
  return new Array(leadingSpaces).fill(SPACE).join(EMPTYSTRING) + text;
};

const add = (x, y) => x + y;

module.exports = {
  SPACE,
  NEWLINE,
  EMPTYSTRING,
  add,
  isEmptySrting,
  startWithDash,
  splitByNewLine,
  splitBySpace,
  joinBySpace,
  SEVENSPACES,
  SIXSPACES,
  rightJustifier,
  joinByNewLine
};
