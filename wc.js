const fs = require("fs");
const { parse } = require('./src/IOHandlers/parser');
const { validater } = require('./src/wcLib/errorHandler');
const { generateFileLogs } = require('./src/wcLib/fileHandler');
const { format } = require("./src/IOHandlers/formatter");

const main = function() {
  let { options, files } = parse( process.argv.slice(2) );
  if( validater.isInvalid(options) ) {
    return validater.parseError(options);
  }
  let countReport = generateFileLogs( fs, options, files );
  return format(countReport);
};

console.log(main());
