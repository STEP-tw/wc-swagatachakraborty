const {
  joinByTab,
  joinBySpace,
  joinByNewLine,
  NEWLINE } = require("./util");
const { fileError } = require('./errorHandler');
const { addCount } = require('./counter');

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
    if( fileLog.exist )
      return  addCount(init, fileLog.counts)
    return init;
  }, init);
  return oneLineReport(total);
};

const oneLineReport = function({ name, counts }) {
  let options = Object.keys(counts);
  let report = options.reduce(function (init, count) {
      return joinByTab(init, counts[count]);
    }, "");
  return joinBySpace(report, name);
};

module.exports = { format };
