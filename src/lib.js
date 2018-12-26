const {
  TAB,
  SPACE,
  EMPTYSTRING,
  add,
  splitByNewLine,
  isEmptySrting,
} = require("./util");

const wc = function(fs, options, files) {
  let content = fs.readFileSync(files[0], "utf8");
  let counts = options.map( x => fileCounter[x](content) );
  return TAB + counts.join(TAB) + SPACE +files;
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
  return line.split(SPACE).reduce(function(count, word) {
    if ( isEmptySrting(word) ) return count;
    return ++count;
  }, 0);
};

module.exports = { wc };
