const assert = require("assert");
const { generateFileLogs } = require("../src/fileHandler");

const files = {
  "10_line_file": "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n",
  "file_with_empty_line": "0\n1\n\n2\n3\n4\n5\n6\n7\n8\n9\n",
  "multiple_words_in_one_line": "00\n1 2 3\n4 5\n"
};

const fs = {
  readFileSync: function(x) {
    return files[x];
  },
  existsSync: function(x) {
    return files[x] != undefined;
  }
};

describe("generateFileLogs", function() {
  describe("default option - single file", function() {
    let options = ['line', 'word', 'byte'];
    it("should return line, word, byte count with file name, when there is only one existing file ", function() {
      let file = ["10_line_file"];
      let expectedOutput = [{
        name: "10_line_file",
        exist : true,
        content: "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n",
        counts: {
          line: 10,
          word: 10,
          byte: 20
        }
      }];
      assert.deepEqual(generateFileLogs(fs, options, file), expectedOutput);
    });
    
    it("should return line, word, byte count with file name, when there is only one existing file with empty line ", function() {
      let file = ["file_with_empty_line"];
      let expectedOutput = [{
        name: "file_with_empty_line",
        exist : true,
        content: "0\n1\n\n2\n3\n4\n5\n6\n7\n8\n9\n",
        counts: {
          line: 11,
          word: 10,
          byte: 21
        }
      }];
      assert.deepEqual(generateFileLogs(fs, options, file), expectedOutput);
    });
    
    it("should return all count, when there is only one existing file with multiple words in one line ", function() {
      let file = ["multiple_words_in_one_line"];
      let expectedOutput =[{
        name: "multiple_words_in_one_line",
        exist : true,
        content: "00\n1 2 3\n4 5\n",
        counts: {
          line: 3,
          word: 6,
          byte: 13
        }
      }];
      assert.deepEqual(generateFileLogs(fs, options, file), expectedOutput);
    });

    it("should returnn name and exist status when there is unexisting file with default option", function() {
      let file = ["file"];
      let expectedOutput =[{
        name: "file",
        exist : false
      }];
      let options = ['line', 'word', 'byte'];
      assert.deepEqual(generateFileLogs(fs, options,file), expectedOutput);
    });
  });
  
  describe("one option - single file", function() {
    it("should return line count with file name, when there is only one existing file, \'-l\' ", function() {
      let file = ["multiple_words_in_one_line"];
      let expectedOutput =[{
        name: "multiple_words_in_one_line",
        exist : true,
        content: "00\n1 2 3\n4 5\n",
        counts: {
          line: 3,
        }
      }];
      let options = ['line'];
      assert.deepEqual(generateFileLogs(fs, options, file), expectedOutput);
    });
    
    it("should return word count with file name, when there is only one existing file with empty line, \'-w\' ", function() {
      let file = ["file_with_empty_line"];
      let expectedOutput = [{
        name: "file_with_empty_line",
        exist : true,
        content: "0\n1\n\n2\n3\n4\n5\n6\n7\n8\n9\n",
        counts: {
          word: 10
        }
      }];
      let options = ['word'];
      assert.deepEqual(generateFileLogs(fs, options, file), expectedOutput);
    });
    
    it("should return byte count when there is only one existing file with multiple words in one line, \'c\' ", function() {
      let file = ["multiple_words_in_one_line"];
      let expectedOutput =[{
        name: "multiple_words_in_one_line",
        exist : true,
        content: "00\n1 2 3\n4 5\n",
        counts: {
          byte: 13
        }
      }];
      let options = ['byte'];
      assert.deepEqual(generateFileLogs(fs, options,file), expectedOutput);
    });
      
      it("should returnn name and exist status when there is unexisting file with, \'c\' ", function() {
        let file = ["file"];
        let expectedOutput =[{
          name: "file",
          exist : false
        }];
        let options = ['byte'];
        assert.deepEqual(generateFileLogs(fs, options,file), expectedOutput);
    });
  });
  
  describe("default option - multiple file", function() {
    let options = ['line', 'word', 'byte'];
    it("should return line, word, byte count with file name, when there are all existing file ", function() {
      let file = ["10_line_file", "file_with_empty_line"];
      let expectedOutput = [{
        name: "10_line_file",
        exist : true,
        content: "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n",
        counts: {
          line: 10,
          word: 10,
          byte: 20
        }
      },
      {
        name: "file_with_empty_line",
        exist : true,
        content: "0\n1\n\n2\n3\n4\n5\n6\n7\n8\n9\n",
        counts: {
          line: 11,
          word: 10,
          byte: 21
        }
      }];
      assert.deepEqual(generateFileLogs(fs, options, file), expectedOutput);
    });

    it("should return name and existing status when there is missing file", function() {
      let file = ["file", "file_with_empty_line"];
      let expectedOutput = [{
        name: "file",
        exist : false,
      },
      {
        name: "file_with_empty_line",
        exist : true,
        content: "0\n1\n\n2\n3\n4\n5\n6\n7\n8\n9\n",
        counts: {
          line: 11,
          word: 10,
          byte: 21
        }
      }];
      assert.deepEqual(generateFileLogs(fs, options, file), expectedOutput);
    });
  });
  
  describe("one option - single file", function() {
    it("should return line count with file name, when there are all existing file, \'-w\' ", function() {
      let file = ["multiple_words_in_one_line", "file_with_empty_line"];
      let expectedOutput =[{
        name: "multiple_words_in_one_line",
        exist : true,
        content: "00\n1 2 3\n4 5\n",
        counts: {
          word: 6
        }
      },
      {
        name: "file_with_empty_line",
        exist : true,
        content: "0\n1\n\n2\n3\n4\n5\n6\n7\n8\n9\n",
        counts: {
          word: 10
        }
      }];
      let options = ['word'];
      assert.deepEqual(generateFileLogs(fs, options, file), expectedOutput);
    });
  });
});
