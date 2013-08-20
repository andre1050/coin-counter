/** Filename: coinsCalculatorSpec.js
    Abstract: Test spec for module coinsCalculator.js
**/

define(["coinsCalculator"], function (coinsCalculator) {
  	
  	// Parsing Test Cases
	describe("Testing user input parsing", function() {
	    it('Should ACCEPT single digit', function() {
	    	var value = "4";
	     	expect(coinsCalculator.parseUserInput(value)).toEqual(4);
	    });
	    it('Should ACCEPT double digit', function() {
	    	var value = "85";
	     	expect(coinsCalculator.parseUserInput(value)).toEqual(85);
	    });
	    it('Should ACCEPT pence symbol', function() {
	    	var value = "197p";
	     	expect(coinsCalculator.parseUserInput(value)).toEqual(197);
	    });
	    it('Should ACCEPT pence symbol single digit', function() {
	    	var value = "2p";
	     	expect(coinsCalculator.parseUserInput(value)).toEqual(2);
	    });
	    it('Should ACCEPT pounds decimal', function() {
	    	var value = "1.87";
	     	expect(coinsCalculator.parseUserInput(value)).toEqual(187);
	    });
	    it('Should ACCEPT pound symbol', function() {
	    	var value = "£1.23";
	     	expect(coinsCalculator.parseUserInput(value)).toEqual(123);
	    });
	    it('Should ACCEPT single digit pound symbol', function() {
	    	var value = "£2";
	     	expect(coinsCalculator.parseUserInput(value)).toEqual(200);
	    });
	    it('Should ACCEPT double digit pound symbol', function() {
	    	var value = "£10";
	     	expect(coinsCalculator.parseUserInput(value)).toEqual(1000);
	    });
	    it('Should ACCEPT pound and pence symbol', function() {
	    	var value = "£1.87p";
	     	expect(coinsCalculator.parseUserInput(value)).toEqual(187);
	    });
	    it('Should ACCEPT missing pence', function() {
	    	var value = "£1p";
	     	expect(coinsCalculator.parseUserInput(value)).toEqual(100);
	    });
	    it('Should ACCEPT missing pence but present decimal point', function() {
	    	var value = "£1.p";
	     	expect(coinsCalculator.parseUserInput(value)).toEqual(100);
	    });
	    it('Should ACCEPT buffered zeros', function() {
	    	var value = "001.41p";
	     	expect(coinsCalculator.parseUserInput(value)).toEqual(141);
	    });
	    it('Should ACCEPT rounding three decimal places to two', function() {
	    	var value = "4.235p";
	     	expect(coinsCalculator.parseUserInput(value)).toEqual(424);
	    });
	    it('Should ACCEPT rounding with symbols', function() {
	    	var value = "£1.257422457p";
	     	expect(coinsCalculator.parseUserInput(value)).toEqual(126);
	    });
	});

	return {
		specName: "coinsCalculatorSpec"
	}
    
});