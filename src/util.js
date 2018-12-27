const TAB = "      ";
const SPACE = " ";
const NEWLINE = "\n";
const EMPTYSTRING = "";
const DASH = '-';

const startWithDash = string => string.startsWith(DASH);
const isEmptySrting = x => x == '';

const splitByNewLine = x => x.split(NEWLINE);
const splitBySpace = x => x.split(SPACE);

const joinByTab = (x,y) => x + TAB + y;
const joinBySpace = (x,y) => x + SPACE + y;
const joinByNewLine = (x,y) => x + NEWLINE + y;

const add = (x, y) => x + y;

module.exports = {
  TAB,
  SPACE,
  NEWLINE,
  EMPTYSTRING,
  add,
  isEmptySrting,
  startWithDash,
  splitByNewLine,
  splitBySpace,
  joinByTab,
  joinBySpace,
  joinByNewLine
};
