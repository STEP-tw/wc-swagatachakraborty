const assert = require("assert");
const { wc } = require("../src/lib");
const { TAB, SPACE } = require("../src/util");

describe("wc", function() {
  let files = {
    "10_line_file": "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n",
    file_with_empty_line: "0\n1\n\n2\n3\n4\n5\n6\n7\n8\n9\n",
    multiple_words_in_one_line: "00\n1 2 3\n4 5\n"
  };
  
  let fs = {
    readFileSync: function(x) {
      return files[x];
    }
  };

  describe("default option - single file", function() {
    let options = ['line', 'word', 'byte'];
    it("should return line, word, byte count with file name, when there is only one existing file ", function() {
      let file = ["10_line_file"];
      let expectedOutput = TAB + "10" + TAB + "10" + TAB + "20" + SPACE + file;
      assert.equal(wc(fs, options, file), expectedOutput);
    });

    it("should return line, word, byte count with file name, when there is only one existing file with empty line ", function() {
      let file = ["file_with_empty_line"];
      let expectedOutput = TAB + "11" + TAB + "10" + TAB + "21" + SPACE + file;
      assert.equal(wc(fs, options, file), expectedOutput);
    });

    it("should return all count, when there is only one existing file with multiple words in one line ", function() {
      let file = ["multiple_words_in_one_line"];
      let expectedOutput = TAB + "3" + TAB + "6" + TAB + "13" + SPACE + file;
      assert.equal(wc(fs, options, file), expectedOutput);
    });
  });

  describe("one option - single file", function() {
    it("should return line count with file name, when there is only one existing file, \'-l\' ", function() {
      let file = ["multiple_words_in_one_line"];
      let expectedOutput = TAB + "3" + SPACE + file;
      let options = ['line'];
      assert.equal(wc(fs, options, file), expectedOutput);
    });

    it("should return word count with file name, when there is only one existing file with empty line, \'-w\' ", function() {
      let file = ["file_with_empty_line"];
      let expectedOutput = TAB + "10" + SPACE + file;
      let options = ['word'];
      assert.equal(wc(fs, options, file), expectedOutput);
    });
    
    it("should return byte count when there is only one existing file with multiple words in one line, \'c\' ", function() {
      let file = ["multiple_words_in_one_line"];
      let expectedOutput = TAB + "13" + SPACE + file;
      let options = ['byte'];
      assert.equal(wc(fs, options,file), expectedOutput);
    });
  });
});
