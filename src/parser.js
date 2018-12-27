const { startWithDash } = require('./util');

const parse = function (args) {
  let firstArg = args[0];
  if( startWithDash(firstArg) ){
    return generateDetails(firstArg, args.slice(1));
  };
  return generateDetails(firstArg, args.slice());
};

const generateDetails = function (userGivenArg, files) {
  return {
    options: getOption(userGivenArg),
    files
  };
};

const getOption = function(args){
  switch(args) {
    case '-l': return ['line'];
    case '-w': return ['word'];
    case '-c': return ['byte'];
    default : return ['line', 'word', 'byte']; 
  };
};

module.exports = { parse };