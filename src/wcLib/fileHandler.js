const { fileCounters, addCount} = require('./counter');
const { singleFileFormatter, format } = require('../IOHandlers/formatter');
const ENCODING = 'utf8';

const wc = function(fs, options, files, display) {
	files.forEach( reader(fs, options, display, files.length, []) );
};

const reader = function (fs, options, display, maxLength, initialValue) {
	let total =  {line: 0, word: 0, byte: 0};

	return function(fileName, index) {
		fs.readFile(fileName, ENCODING, (error, data) => {
			let name = fileName;
			let exist = true;
			let formatedOutput;
			if(error) {
				exist = false;
				formatedOutput = singleFileFormatter({ name, exist });
			}

			if(exist) {
				let counts = reportCount(options, data);
				total = addCount( counts, total);
				formatedOutput = singleFileFormatter({ name, exist, data, counts });
			}

			initialValue[index] = formatedOutput;
			if(initialValue.length == maxLength && !initialValue.includes(undefined)){
				display( format(initialValue, total) );
			}
		});
	};
};

const reportCount = function(countOptions, content) {
  return countOptions.reduce( function(init, counter) {
    init[counter] = fileCounters[counter](content);
    return init;
  }, {});
};

module.exports = { wc, reportCount };
