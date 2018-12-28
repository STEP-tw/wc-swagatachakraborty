const fs = require("fs");
const { parse } = require('./src/parser');
const { validater } = require('./src/errorHandler');
const { generateFileLogs } = require('./src/fileHandler');
const { format } = require("./src/formatter");

const main = function() {
  let { options, files } = parse( process.argv.slice(2) );
  if( validater.isInvalid(options) ) {
    return validater.parseError(options);
  }
  let countReport = generateFileLogs( fs, options, files );
  return format(countReport);
};

console.log(main());
