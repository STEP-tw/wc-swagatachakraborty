const { 
  add,
  joinByTab,
  joinBySpace,
  joinByNewLine,
  NEWLINE } = require("./util");

const format = function(fileLogs) {
  let result = fileLogs.map(singleFileReport).join(NEWLINE);
  if (fileLogs.length == 1) return result;
  return joinByNewLine(result, countTotal(fileLogs));
};

const countTotal = function(fileLogs) {
  let total = {};
  let init = { line: 0, word: 0, byte: 0 };
  total.counts = fileLogs.reduce( 
    (init, fileLog) => addCount(init, fileLog.counts), init
  );
  total.name = 'total';
  return singleFileReport(total);
};

const addCount = function (count1, count2) {
  let result = {};
  if (count2.line) result.line = add(count1.line, count2.line);
  if (count2.word) result.word = add(count1.word, count2.word);
  if (count2.byte) result.byte = add(count1.byte, count2.byte);
  return result;
};

const singleFileReport = function({ name, counts }) {
  let str = "";
  if (counts.line) str = joinByTab(str, counts.line);
  if (counts.word) str = joinByTab(str, counts.word);
  if (counts.byte) str = joinByTab(str, counts.byte);
  return joinBySpace(str, name);
};
module.exports = { format };
