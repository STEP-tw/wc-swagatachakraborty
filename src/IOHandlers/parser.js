const { startWithDash } = require('../util');
const { validOptions } = require('../wcLib/errorHandler')

const parse = function (args) {
  let { givenOptions, files} = separateOptionFile(args);
  if( givenOptions.length == 0 ) 
    return getParseObject( validOptions, files );
  return getParseObject( extractOptions(givenOptions), files );
};

const getParseObject = function (options, files) {
  return {options, files};
};

const extractOptions = function (args) {
  let uniqueOptions = unique( args.join('').split('') );
  return uniqueOptions.map(getOption);
};

const unique = function (list) {
  return list.reduce(function (set, element) {
    if ( !set.includes(element) && !startWithDash(element) ) {
      set.push(element);
    }
    return set;
  }, []);
};

const separateOptionFile = function (args) {
  for(let index = 0; index < args.length; index++) {
    if( !startWithDash(args[index]) )
      return {
        givenOptions : args.slice(0, index),
        files : args.slice(index)
      };
  }
};

const getOption = function(arg){
  switch(arg) {
    case 'l': return 'line';
    case 'w': return 'word';
    case 'c': return 'byte';
    default : return arg;
  };
};

module.exports = { parse };