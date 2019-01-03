const assert = require('assert');
const { 
	addCount
 } = require('../../src/wcLib/counter');

 describe('addCount', function(){
	 it('should add the counts of two given objects and return the count object ', function(){
		 let count1 = { line: 5, word: 2, byte: 4};
		 let count2 = { line: 5, word: 3, byte: 4};
		 let expectedOutput = {
			 line: 10,
			 word: 5,
			 byte: 8
		 };
		 assert.deepEqual( addCount(count1, count2), expectedOutput );
	 });

	 it('should add the counts of two given objects and return the count object ', function(){
		let count1 = { line: 5, byte: 4};
		let count2 = { line: 5, byte: 4};
		let expectedOutput = {
			line: 10,
			byte: 8
		};
		assert.deepEqual( addCount(count1, count2), expectedOutput );
	});

	it('should add the counts of two given objects and return the count object ', function(){
		let count1 = { word: 2, byte: 4};
		let count2 = { word: 3, byte: 4};
		let expectedOutput = {
			word: 5,
			byte: 8
		};
		assert.deepEqual( addCount(count1, count2), expectedOutput );
	});

	it('should add the counts of two given objects and return the count object ', function(){
		let count1 = { line: 5, word: 2};
		let count2 = { line: 5, word: 3};
		let expectedOutput = {
			line: 10,
			word: 5
		};
		assert.deepEqual( addCount(count1, count2), expectedOutput );
	});
});