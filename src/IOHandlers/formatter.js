const {
  rightJustifier,
  EMPTYSTRING,
  joinBySpace,
  joinByNewLine,
  NEWLINE } = require("../util");
const { fileError } = require('../wcLib/errorHandler');
const { addCount } = require('../wcLib/counter');

const format = function(fileLogs) {
  let result = fileLogs.map( singleFileFormatter ).join(NEWLINE);
  if (fileLogs.length == 1) return result;
  return joinByNewLine(result, countTotal(fileLogs));
};

const singleFileFormatter = function (fileLog) {
  if (fileLog.exist) {
    return oneLineReport(fileLog);
  };
  return fileError(fileLog.name);
};

const countTotal = function(fileLogs) {
  let total = { name : 'total' };
  let init = { line: 0, word: 0, byte: 0 };
  total.counts = fileLogs.reduce(function (init, fileLog) {
    if( !fileLog.exist ) return init;
    return  addCount(init, fileLog.counts);
  }, init);
  return oneLineReport(total);
};

const oneLineReport = function({ name, counts }) {
  const WIDTH = 8;
  let report = EMPTYSTRING;
   if (counts.line) report += rightJustifier(WIDTH, counts.line);
   if (counts.word) report += rightJustifier(WIDTH, counts.word);
   if (counts.byte) report += rightJustifier(WIDTH, counts.byte);
   return joinBySpace(report, name);
};

module.exports = { format };
