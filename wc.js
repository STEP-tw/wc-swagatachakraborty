const fs = require("fs");
const { parse } = require('./src/IOHandlers/parser');
const { validater } = require('./src/wcLib/errorHandler');
const { wc } = require('./src/wcLib/fileHandler');

const display = (content) => console.log(content);

const main = function() {
	let { options, files } = parse( process.argv.slice(2) );
  if( validater.isInvalid(options) ) {
		return display(validater.parseError(options)); 
  }
  return wc( fs, options, files, display );
};

main();