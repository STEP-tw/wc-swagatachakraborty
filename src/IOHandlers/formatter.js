const {
  rightJustifier,
  EMPTYSTRING,
  joinBySpace,
  isUndefiend } = require("../util");
const { fileError } = require('../wcLib/errorHandler');

const singleFileFormatter = function (fileLog) {
  if (fileLog.exist) {
    return oneLineReport(fileLog);
  };
  return fileError(fileLog.name);
};

const oneLineReport = function({ name, counts }) {
  const WIDTH = 8;
  let report = EMPTYSTRING;
  if ( !isUndefiend(counts.line) ) report += rightJustifier(WIDTH, counts.line);
  if ( !isUndefiend(counts.word) ) report += rightJustifier(WIDTH, counts.word);
	if ( !isUndefiend(counts.byte) ) report += rightJustifier(WIDTH, counts.byte);
  return joinBySpace(report, name);
};

module.exports = { singleFileFormatter, oneLineReport };
