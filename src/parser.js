const parse = function (args) {
  let firstArg = args[0];

  if( firstArg.startsWith('-') ){
    return { 
      options: getOption(firstArg),
      files: args.slice(1)
    };
  };
  
  return {
    options: getOption(firstArg),
    files: args.slice()
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