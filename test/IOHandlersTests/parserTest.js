const assert = require('assert');
const { parse } = require('../../src/IOHandlers/parser');

describe('parse', function(){
  it('should return object of options and files when - \'-l file\'', function(){
    let args = ['-l', 'file'];
    let expectedOutput = {
      options: ['line'],
      files: ['file']
    }
    assert.deepEqual( parse(args), expectedOutput );
  });

  it('should return object of options and files when - \'-w file\'', function(){
    let args = ['-w', 'file'];
    let expectedOutput = {
      options: ['word'],
      files: ['file']
    }
    assert.deepEqual( parse(args), expectedOutput );
  });

  it('should return object of options and files when - \'-c file\'', function(){
    let args = ['-c', 'file'];
    let expectedOutput = {
      options: ['byte'],
      files: ['file']
    }
    assert.deepEqual( parse(args), expectedOutput );
  });

  it('should return object of options and files when - \'-a file\'', function(){
    let args = ['-a', 'file'];
    let expectedOutput = {
      options: ['a'],
      files: ['file']
    }
    assert.deepEqual( parse(args), expectedOutput );
  });

  it('should return object of options and files when - \'file\'', function(){
    let args = ['file'];
    let expectedOutput = {
      options: ['line', 'word', 'byte'],
      files: ['file']
    }
    assert.deepEqual( parse(args), expectedOutput );
  });

  it('should return object of options and files when - \'file\'', function(){
    let args = ['-lw','file'];
    let expectedOutput = {
      options: ['line', 'word'],
      files: ['file']
    }
    assert.deepEqual( parse(args), expectedOutput );
  });

  it('should return object of options and files when - \'file\'', function(){
    let args = ['-l', '-w','file'];
    let expectedOutput = {
      options: ['line', 'word'],
      files: ['file']
    }
    assert.deepEqual( parse(args), expectedOutput );
  });
});