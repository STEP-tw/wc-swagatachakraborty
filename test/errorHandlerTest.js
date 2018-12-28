const assert = require('assert');
const { isInvalid, parseError } = require('../src/errorHandler').validater;

describe('isInvalid', function(){
  it('should return true if there is some invalid option presesnt ', function(){
    let options = ['word', 'a', 'line'];
    assert.equal( isInvalid(options), true );
  });
  
  it('should return false if there is no invalid option presesnt ', function(){
    let options = ['word', 'line'];
    assert.equal( isInvalid(options), false );
  });
});

describe('parseError', function(){
  it('should give the parse error if there is one invalid option', function(){
    let options = ['word', 'a', 'line'];
    let expectedOutput = 'wc: illegal option -- a\nusage: wc [-clmw] [file ...]';
    assert.equal( parseError(options), expectedOutput );
  });

  it('should give the parse error of 1st invalid option if there is multiple invalid options', function(){
    let options = ['word', 'a', 'line', 'b'];
    let expectedOutput = 'wc: illegal option -- a\nusage: wc [-clmw] [file ...]';
    assert.equal( parseError(options), expectedOutput );
  });
});