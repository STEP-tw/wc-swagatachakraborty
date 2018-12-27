const assert = require("assert");
const { wc, format } = require("../src/lib");
const { TAB, SPACE } = require("../src/util");

const files = {
  "10_line_file": "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n",
  "file_with_empty_line": "0\n1\n\n2\n3\n4\n5\n6\n7\n8\n9\n",
  "multiple_words_in_one_line": "00\n1 2 3\n4 5\n"
};

const fs = {
  readFileSync: function(x) {
    return files[x];
  }
};

describe("wc", function() {
  describe("default option - single file", function() {
    let options = ['line', 'word', 'byte'];
    it("should return line, word, byte count with file name, when there is only one existing file ", function() {
      let file = ["10_line_file"];
      let expectedOutput = [{
        name: "10_line_file",
        content: "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n",
        counts: {
          line: 10,
          word: 10,
          byte: 20
        }
      }];
      assert.deepEqual(wc(fs, options, file), expectedOutput);
    });

    it("should return line, word, byte count with file name, when there is only one existing file with empty line ", function() {
      let file = ["file_with_empty_line"];
      let expectedOutput = [{
        name: "file_with_empty_line",
        content: "0\n1\n\n2\n3\n4\n5\n6\n7\n8\n9\n",
        counts: {
          line: 11,
          word: 10,
          byte: 21
        }
      }];
      assert.deepEqual(wc(fs, options, file), expectedOutput);
    });

    it("should return all count, when there is only one existing file with multiple words in one line ", function() {
      let file = ["multiple_words_in_one_line"];
      let expectedOutput =[{
        name: "multiple_words_in_one_line",
        content: "00\n1 2 3\n4 5\n",
        counts: {
          line: 3,
          word: 6,
          byte: 13
        }
      }];
      assert.deepEqual(wc(fs, options, file), expectedOutput);
    });
  });
  
  describe("one option - single file", function() {
    it("should return line count with file name, when there is only one existing file, \'-l\' ", function() {
      let file = ["multiple_words_in_one_line"];
      let expectedOutput =[{
        name: "multiple_words_in_one_line",
        content: "00\n1 2 3\n4 5\n",
        counts: {
          line: 3,
        }
      }];
      let options = ['line'];
      assert.deepEqual(wc(fs, options, file), expectedOutput);
    });
    
    it("should return word count with file name, when there is only one existing file with empty line, \'-w\' ", function() {
      let file = ["file_with_empty_line"];
      let expectedOutput = [{
        name: "file_with_empty_line",
        content: "0\n1\n\n2\n3\n4\n5\n6\n7\n8\n9\n",
        counts: {
          word: 10
        }
      }];
      let options = ['word'];
      assert.deepEqual(wc(fs, options, file), expectedOutput);
    });
    
    it("should return byte count when there is only one existing file with multiple words in one line, \'c\' ", function() {
      let file = ["multiple_words_in_one_line"];
      let expectedOutput =[{
        name: "multiple_words_in_one_line",
        content: "00\n1 2 3\n4 5\n",
        counts: {
          byte: 13
        }
      }];
      let options = ['byte'];
      assert.deepEqual(wc(fs, options,file), expectedOutput);
    });
  });
});

describe('format', function () {
  describe('for single file', function () {
    it('should return the wc actual string output with file name when there is only one option -l', function () {
      let fileLogs =[{
        name: "multiple_words_in_one_line",
        content: "00\n1 2 3\n4 5\n",
        counts: {
          line: 3,
        }
      }];
      let expectedOutput = TAB + "3" + SPACE + "multiple_words_in_one_line";
      assert.equal(format(fileLogs), expectedOutput);
    });
    
    it('should return the wc actual string output with file name when there is only one option -w', function () {
      let fileLogs = [{
        name: "file_with_empty_line",
        content: "0\n1\n\n2\n3\n4\n5\n6\n7\n8\n9\n",
        counts: {
          word: 10
        }
      }];
      let expectedOutput = TAB + "10" + SPACE + "file_with_empty_line";
      assert.equal(format(fileLogs), expectedOutput);
    });
    
    it('should return the wc actual string output with file name when there is only one option -c', function () {
      let fileLogs = [{
        name: "multiple_words_in_one_line",
        content: "00\n1 2 3\n4 5\n",
        counts: {
          byte: 13
        }
      }];
      let expectedOutput = TAB + "13" + SPACE + "multiple_words_in_one_line";
      assert.equal(format(fileLogs), expectedOutput);
    });
    
    it('should return the wc actual string output with file name for default options', function () {
      let fileLogs = [{
        name: "multiple_words_in_one_line",
        content: "00\n1 2 3\n4 5\n",
        counts: {
          line: 3,
          word: 6,
          byte: 13
        }
      }];
      let expectedOutput = TAB + "3" + TAB + "6" + TAB + "13" + SPACE + "multiple_words_in_one_line";
      assert.equal(format(fileLogs), expectedOutput);
    });    
  });
});