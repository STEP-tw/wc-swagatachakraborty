const assert = require("assert");
const { reportCount } = require("../../src/wcLib/fileHandler");

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