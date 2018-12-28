const { joinByNewLine } = require('./util');

const validOptions = ['line', 'word', 'byte'];
const USAGE = 'usage: wc [-clmw] [file ...]';
const optionError = (option) => 'wc: illegal option -- ' + option;
const fileError = (fileName) => "wc: " + fileName + ": open: No such file or directory";


const validater =  {
  isInvalid: function(options) {
    return options.some(option => !validOptions.includes(option));
  },

  parseError: function(options) {
    let wrongOption = options
      .filter(option => !validOptions.includes(option))
      [0];
    return joinByNewLine( optionError(wrongOption) , USAGE );
  }
};

module.exports = { validater , fileError};