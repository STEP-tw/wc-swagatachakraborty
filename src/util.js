const TAB = "      ";
const SPACE = " ";
const NEWLINE = "\n";
const EMPTYSTRING = "";

const splitByNewLine = x => x.split(NEWLINE);
const isEmptySrting = x => x == '';

const add = (x, y) => x + y;

module.exports = {
  TAB,
  SPACE,
  EMPTYSTRING,
  add,
  splitByNewLine,
  isEmptySrting,
};
