const { fileCounters, addCount} = require('./counter');
const { singleFileFormatter, oneLineReport } = require('../IOHandlers/formatter');
const ENCODING = 'utf8';

const wc = function(fs, options, files) {
	let formatedOutput =  files.reduce( (init, fileName, index) => reader(fs, options, fileName, index, files.length, init), [] );
	return formatedOutput;
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
		 let counts = reportCount(options, data);
		 total = addCount(counts, total);
		 formatedOutput = singleFileFormatter({ name, exist, data, counts });
		}

		initialVlue[index] = formatedOutput;
		if(initialVlue.length == maxLength && !initialVlue.includes(undefined)){
			if(maxLength > 1){
				initialVlue.push(oneLineReport({name:'total',counts: total}));
			}
			console.log(initialVlue.join('\n'));
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
