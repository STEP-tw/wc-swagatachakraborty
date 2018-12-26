const assert = require('assert');
const { add } = require('../src/util');

describe('add', function(){
  it('should add given two numbers ', function(){
    assert.equal( add(1,2), 3 );
  });
});