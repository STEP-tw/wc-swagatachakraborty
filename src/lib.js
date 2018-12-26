const {
  TAB,
  SPACE,
  NEWLINE,
  EMPTYSTRING,
  add,
  splitByNewLine
} = require("./util");

const wc = function(fs, fileName) {
  let content = fs.readFileSync(fileName, "utf8");
  let lines = fileCounter.line(content);
  let words = fileCounter.word(content);
  let bytes = fileCounter.byte(content);
  let result = TAB + lines + TAB + words + TAB + bytes + SPACE + fileName;
  return result;
};

const fileCounter = {
  line: function(content) {
    return splitByNewLine(content).length - 1;
  },

  word: function(content) {
    return splitByNewLine(content)
      .map(countWordsInLine)
      .reduce(add, 0);
  },

  byte: function(content) {
    return content.split(EMPTYSTRING).length;
  }
};

const countWordsInLine = function(line) {
  return line.split(SPACE).reduce(function(x, y) {
    if (y != EMPTYSTRING && y != NEWLINE) return ++x;
    return x;
  }, 0);
};

module.exports = { wc, TAB, SPACE };
