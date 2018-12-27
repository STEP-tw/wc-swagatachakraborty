const assert = require('assert');
const { format } = require('../src/formatter');
const { TAB, SPACE } = require("../src/util");

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

  describe('for multiple file', function () {
    it('should return string output with total when there is only one option -l', function () {
      let fileLogs =[{
        name: "multiple_words_in_one_line",
        content: "00\n1 2 3\n4 5\n",
        counts: {
          line: 3,
        }
      },
      {
        name: "file_with_empty_line",
        content: "0\n1\n\n2\n3\n4\n5\n6\n7\n8\n9\n",
        counts: {
          line: 11
        }
      }
    ];
      let expectedOutput = TAB + "3" + SPACE + "multiple_words_in_one_line" + '\n';
      expectedOutput += TAB + "11" + SPACE + "file_with_empty_line" + '\n',
      expectedOutput += TAB + "14" + SPACE + "total",
      assert.equal(format(fileLogs), expectedOutput);
    });

    it('should return string output with total for default option', function () {
      let fileLogs =[{
        name: "multiple_words_in_one_line",
        content: "00\n1 2 3\n4 5\n",
        counts: {
          line: 3,
          word: 6,
          byte: 13
        }
      },
      {
        name: "file_with_empty_line",
        content: "0\n1\n\n2\n3\n4\n5\n6\n7\n8\n9\n",
        counts: {
          line: 11,
          word: 10,
          byte: 21
        }
      }
    ];
      let expectedOutput = TAB + "3" + TAB + "6" + TAB + "13" + SPACE + "multiple_words_in_one_line" + '\n';
      expectedOutput += TAB + "11" + TAB + "10" + TAB + "21" + SPACE + "file_with_empty_line" + '\n',
      expectedOutput += TAB + "14" + TAB + "16" + TAB + "34" + SPACE + "total",
      assert.equal(format(fileLogs), expectedOutput);
    });
    
    it('should return string output with total when there is only one option -w', function () {
      let fileLogs =[{
        name: "multiple_words_in_one_line",
        content: "00\n1 2 3\n4 5\n",
        counts: {
          word: 6
        }
      },
      {
        name: "file_with_empty_line",
        content: "0\n1\n\n2\n3\n4\n5\n6\n7\n8\n9\n",
        counts: {
          word: 10
        }
      }
    ];
      let expectedOutput = TAB + "6" + SPACE + "multiple_words_in_one_line" + '\n';
      expectedOutput += TAB + "10" + SPACE + "file_with_empty_line" + '\n',
      expectedOutput += TAB + "16" + SPACE + "total",
      assert.equal(format(fileLogs), expectedOutput);
    });
  });
});