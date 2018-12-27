const {
  TAB,
  SPACE,
  EMPTYSTRING,
  add,
  splitByNewLine,
  isEmptySrting
} = require("./util");

const wc = function(fs, options, files) {
  let fileLogs = files.map( createFileLog.bind(null, fs, options) );
  return fileLogs;
};

const format = function (fileLogs) {
  let result = fileLogs.map(function(x) {
    let str = "";
    if(x.counts.line) str += TAB + x.counts.line;
    if(x.counts.word) str += TAB + x.counts.word;
    if(x.counts.byte) str += TAB + x.counts.byte;
    return str + SPACE + x.name;
  });
  return result.join('\n');
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
  return line.split(SPACE).reduce(function(count, word) {
    if ( isEmptySrting(word) ) return count;
    return ++count;
  }, 0);
};

module.exports = { wc, format };
