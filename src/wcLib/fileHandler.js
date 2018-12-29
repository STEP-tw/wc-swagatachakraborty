const { fileCounters } = require('./counter');
const ENCODING = 'utf8';

const generateFileLogs = function(fs, options, files) {
  return files.map( createFileLog.bind(null, fs, options) );
};

const createFileLog = function (fs, options, fileName) {
  let log = { name: fileName };
  if( !fs.existsSync(fileName) ){
    log.exist = false;
    return log;
  }
  log.exist = true;
  log.content = fs.readFileSync(fileName, ENCODING);
  log.counts = reportCount(options, log.content);
  return log;
};

const reportCount = function(countOptions, content) {
  return countOptions.reduce( function(init, counter) {
    init[counter] = fileCounters[counter](content);
    return init;
  }, {});
};

module.exports = { generateFileLogs };
