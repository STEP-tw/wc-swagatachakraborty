const fs = require("fs");
const { parse } = require('./src/IOHandlers/parser');
const { validater } = require('./src/wcLib/errorHandler');
const { wc } = require('./src/wcLib/fileHandler');

const main = function() {
	let { options, files } = parse( process.argv.slice(2) );
  if( validater.isInvalid(options) ) {
		return console.log(validater.parseError(options)); 
  }
  return wc( fs, options, files );
};

main();