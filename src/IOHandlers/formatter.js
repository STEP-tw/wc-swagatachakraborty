const {
  rightJustifier,
  EMPTYSTRING,
	joinBySpace,
	NEWLINE,
  isUndefiend } = require("../util");
const { fileError } = require('../wcLib/errorHandler');

let hasDisplayed = false;

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

const format = function (log, total) {
	if (hasDisplayed) return ;
	let	fileCounts = log.slice();
	if(fileCounts.length > 1){
		fileCounts.push(oneLineReport( {name:'total',counts: total} ));
	}
	hasNotDisplayed = true;
	return fileCounts.join(NEWLINE);
};

module.exports = { singleFileFormatter, oneLineReport, format };
