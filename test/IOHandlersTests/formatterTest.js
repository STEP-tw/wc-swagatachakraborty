const assert = require("assert");
const { singleFileFormatter, format } = require("../../src/IOHandlers/formatter");
const { SPACE, SEVENSPACES, SIXSPACES } = require("../../src/util");

describe("singleFileFormatter", function () {
	it('should return line, char as 1 and word as 0 if the file is empty ', function () {
		let fileLogs = {
			name: 'empty_file',
			exist: true,
			content: '',
			counts: {
				line: 1,
				word: 0,
				byte: 1
			}
		};
		let expectedOutput = SEVENSPACES + '1';
		expectedOutput += SEVENSPACES + '0';
		expectedOutput += SEVENSPACES + '1';
		expectedOutput += SPACE + 'empty_file';
		assert.equal(singleFileFormatter(fileLogs), expectedOutput);
	});

	it("should return line count with file name when there is only one option -l", function () {
		let fileLogs = {
			exist: true,
			name: "multiple_words_in_one_line",
			content: "00\n1 2 3\n4 5\n",
			counts: {
				line: 3
			}
		};
		let expectedOutput = SEVENSPACES + "3" + SPACE + "multiple_words_in_one_line";
		assert.equal(singleFileFormatter(fileLogs), expectedOutput);
	});

	it("should return word count with file name when there is only one option -w", function () {
		let fileLogs = {
			name: "file_with_empty_line",
			exist: true,
			content: "0\n1\n\n2\n3\n4\n5\n6\n7\n8\n9\n",
			counts: {
				word: 10
			}
		};
		let expectedOutput = SIXSPACES + "10" + SPACE + "file_with_empty_line";
		assert.equal(singleFileFormatter(fileLogs), expectedOutput);
	});

	it("should return byte count with file name when there is only one option -c", function () {
		let fileLogs = {
			name: "multiple_words_in_one_line",
			exist: true,
			content: "00\n1 2 3\n4 5\n",
			counts: {
				byte: 13
			}
		};
		let expectedOutput = SIXSPACES + "13" + SPACE + "multiple_words_in_one_line";
		assert.equal(singleFileFormatter(fileLogs), expectedOutput);
	});

	it("should return line, word and byte counts with file name for default options", function () {
		let fileLogs = {
			name: "multiple_words_in_one_line",
			exist: true,
			content: "00\n1 2 3\n4 5\n",
			counts: {
				line: 3,
				word: 6,
				byte: 13
			}
		};
		let expectedOutput = SEVENSPACES + "3" + SEVENSPACES + "6" + SIXSPACES + "13" + SPACE + "multiple_words_in_one_line";
		assert.equal(singleFileFormatter(fileLogs), expectedOutput);
	});

	it("should return missing file error if the given file doesn't exist", function () {
		let fileLogs = {
			name: "multiple_words_in_one_line",
			exist: false,
		};
		let expectedOutput = "wc: multiple_words_in_one_line: open: No such file or directory";
		assert.equal(singleFileFormatter(fileLogs), expectedOutput);
	});
});

describe('format', function(){
	it('should return line, word and byte counts with file name for default option, when there is single file', function(){
		let log = ['      15      58     475 wc.js'];
		let total = { line: 15, word: 58, byte: 475 };
		let expectedOutput = '      15      58     475 wc.js';
		assert.equal( format(log, total), expectedOutput );
	});
	
	it('should give all counts with total when there is more than one file for default option', function(){
		let log = [
			'      15      58     475 wc.js',
			'      1       7      45 TODO'
		];
		
		let total = { line: 16, word: 65, byte: 520 };
		let expectedOutput = log.concat('      16      65     520 total').join('\n');
		assert.equal( format(log, total), expectedOutput );
	});

	it('should give all counts with total and error for missing file', function(){
		let log = [
			'      15      58     475 wc.js',
			'wc: multiple_words_in_one_line: open: No such file or directory'
		];
		
		let total = { line: 15, word: 58, byte: 475 };
		let expectedOutput = log.concat('      15      58     475 total').join('\n');
		assert.equal( format(log, total), expectedOutput );
	});
});