const assert = require("assert");
const { reportCount, wc } = require("../../src/wcLib/fileHandler");
const { SEVENSPACES, SPACE, SIXSPACES } = require('../../src/util');

const fs = {
  readFile: function(x, encoding, callBack) {
		let error = files[x] == undefined;
		let data = files[x];
    return callBack(error, data);
  }
};

const files = {
  "10_line_file": "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n",
  "file_with_empty_line": "0\n1\n\n2\n3\n4\n5\n6\n7\n8\n9\n",
  "empty_file": '\n',
  "multiple_words_in_one_line": "00\n1 2 3\n4 5\n"
};

describe('reportCount', function(){
	it('should give object that contain all the counts according to the option', function(){
		let expectedOutput = {
			line: 10,
			word: 10,
			byte: 20
		};
		let options = ['line', 'word', 'byte'];
		let content = files["10_line_file"];
		assert.deepEqual( reportCount(options, content), expectedOutput );
	});

	it('should give object that contain all the counts according to the option', function(){
		let expectedOutput = {
			line: 1,
			word: 0,
			byte: 1
		};
		let options = ['line', 'word', 'byte'];
		let content = files["empty_file"];
		assert.deepEqual( reportCount(options, content), expectedOutput );
	});

	it('should give object that contain all the counts according to the option', function(){
		let expectedOutput = {
			word: 6,
			byte: 13
		};
		let options = ['word', 'byte'];
		let content = files["multiple_words_in_one_line"];
		assert.deepEqual( reportCount(options, content), expectedOutput );
	});

	it('should give object that contain all the counts according to the option', function(){
		let expectedOutput = {
			line: 11
		};
		let options = ['line'];
		let content = files["file_with_empty_line"];
		assert.deepEqual( reportCount(options, content), expectedOutput );
	});
});

describe('wc', function() {
	it('should return line, word, byte counts when there is only one existing file with default option', function() {
		const display = function (content) {
			assert.equal(content, expectedOutput);
		};

		let options = ['line', 'word', 'byte'];
		let files = ['empty_file'];
		let expectedOutput = SEVENSPACES + '1';
		expectedOutput += SEVENSPACES + '0';
		expectedOutput += SEVENSPACES + '1';
		expectedOutput += SPACE + 'empty_file';
		wc(fs, options, files, display);
	});

	it('should return all counts when there are multiple existing files with total for default option', function(done) {
		const display = function (content) {
			assert.equal(content, expectedOutput);
			done();
		};

		let options = ['line', 'word', 'byte'];
		let files = ['empty_file', 'multiple_words_in_one_line'];

		let expectedOutput = SEVENSPACES + '1';
		expectedOutput += SEVENSPACES + '0';
		expectedOutput += SEVENSPACES + '1';
		expectedOutput += SPACE + 'empty_file\n';
		expectedOutput += SEVENSPACES + "3";
		expectedOutput += SEVENSPACES + "6";
		expectedOutput += SIXSPACES + "13";
		expectedOutput += SPACE + "multiple_words_in_one_line\n";
		expectedOutput += SEVENSPACES + '4';
		expectedOutput += SEVENSPACES + '6';
		expectedOutput += SIXSPACES + '14 total';

		wc(fs, options, files, display);
	});

	it('should return line, word, byte counts when there is only one existing file with default option', function() {
		const display = function (content) {
			assert.equal(content, expectedOutput);
		};

		let options = ['line', 'word', 'byte'];
		let files = ['empty'];
		let expectedOutput = 'wc: empty: open: No such file or directory'
		wc(fs, options, files, display);
	});
});