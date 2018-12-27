const {
  EMPTYSTRING,
  add,
  splitByNewLine,
  splitBySpace,
  isEmptySrting
} = require("./util");

const generateFileLogs = function(fs, options, files) {
  return files.map( createFileLog.bind(null, fs, options) );
};

const createFileLog = function (fs, options, fileName) {
  let log = { name: fileName };
  log.content = fs.readFileSync(fileName, 'utf8');
  log.counts = countReporter(options, log.content);
  return log;
};

const countReporter = function (options, content) {
  let report = {};
  if(options.includes('line')) report.line = fileCounter.line(content);
  if(options.includes('word')) report.word = fileCounter.word(content);
  if(options.includes('byte')) report.byte = fileCounter.byte(content);
  return report;
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
  return splitBySpace(line).reduce(function(count, word) {
    if ( isEmptySrting(word) ) return count;
    return ++count;
  }, 0);
};

module.exports = { generateFileLogs };
