const { fileCounters, addCount} = require('./counter');
const { singleFileFormatter, formatAndDisplay } = require('../IOHandlers/formatter');
const ENCODING = 'utf8';

const wc = function(fs, options, files) {
	files.reduce( (init, fileName, index) => reader(fs, options, fileName, index, files.length, init), [] );
};

let total =  {line: 0, word: 0, byte: 0};

const reader = function (fs, options, fileName, index, maxLength, initialVlue) {
	fs.readFile(fileName, ENCODING, (error, data) => {
		let name = fileName;
		let exist = true;
		let formatedOutput;
		if(error){
			exist = false;
			formatedOutput = singleFileFormatter({ name, exist });
		}

		if(exist){
		 total = addCount( reportCount(options, data), total);
		 formatedOutput = singleFileFormatter({ name, exist, data, counts });
		}

		initialVlue[index] = formatedOutput;
		if(initialVlue.length == maxLength && !initialVlue.includes(undefined)){
			formatAndDisplay(initialVlue, total);
		}
	});

	return initialVlue;
};

const reportCount = function(countOptions, content) {
  return countOptions.reduce( function(init, counter) {
    init[counter] = fileCounters[counter](content);
    return init;
  }, {});
};

module.exports = { wc, reportCount };
