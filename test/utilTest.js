const assert = require('assert');
const { add, rightJustifier } = require('../src/util');

describe('add', function(){
  it('should add given two numbers ', function(){
    assert.equal( add(1,2), 3 );
  });
});

describe('rightJustifier', function(){
  it('should justify the given text right according to the width provided ', function(){
    let expectedOutput = '    a';
    assert.equal( rightJustifier(5,'a'), expectedOutput );
  });

  it('should return the given text with one leading space when the width is < text\'s length ', function(){
    let expectedOutput = ' aa';
    assert.equal( rightJustifier(1,'aa'), expectedOutput );
  });

  it('should return the given text with one leading space when the width is = text\'s length ', function(){
    let expectedOutput = ' a';
    assert.equal( rightJustifier(1,'a'), expectedOutput );
  });
});