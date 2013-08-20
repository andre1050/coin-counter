/** Filename: coinsCalculatorSpec.js
    Abstract: ###
**/

define(["coinsCalculator"], function (coinsCalculator) {
  	
  	// Validation Test Cases
	describe("Testing parsing function", function() {
	    it('Should ACCEPT what it should', function() {
	    	var value = "";
	     	expect(coinsCalculator.valueInPence(value)).toBeTruthy();
	    });
	});

	return {
		specName: "coinsCalculatorSpec"
	}
    
});