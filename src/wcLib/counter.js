const {
  add,
  splitByNewLine,
  splitBySpace,
  isEmptySrting
} = require("../util");

const fileCounters = {
  line: function(content) {
    return splitByNewLine(content).length - 1;
  },

  word: function(content) {
    return splitByNewLine(content)
      .map(countWordsInLine)
      .reduce(add, 0);
  },

  byte: function(content) {
    return content.length;
  }
};

const countWordsInLine = function(line) {
  return splitBySpace(line).reduce(function(count, word) {
    if ( isEmptySrting(word) ) return count;
    return ++count;
  }, 0);
};

const addCount = function (count1, count2) {
  let result = {};
  if (count2.line) result.line = add(count1.line, count2.line);
  if (count2.word) result.word = add(count1.word, count2.word);
  if (count2.byte) result.byte = add(count1.byte, count2.byte);
  return result;
};

module.exports = { fileCounters, addCount};