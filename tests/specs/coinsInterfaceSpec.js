/** Filename: coinsInterfaceSpec.js
    Abstract: Test spec for module CoinsInterface.js
**/

define(["coinsInterface"], function (coinsInterface) {

	// Validation Test Cases
	describe("Testing basic form validation", function() {
	    it('Should ACCEPT any whole number', function() {
	    	expect(coinsInterface.isFormInputValid("550")).toBeTruthy();
	    });
	    it('Should ACCEPT any real number', function() {
	    	expect(coinsInterface.isFormInputValid("15.495")).toBeTruthy();
	    });
	    it('Should ACCEPT any string', function() {
	    	expect(coinsInterface.isFormInputValid("loremIpsum")).toBeTruthy();
	    });
	    it('Should ACCEPT any mix of number and string', function() {
	    	expect(coinsInterface.isFormInputValid("£15.95p")).toBeTruthy();
	    });
	    it('Should REJECT an empty field', function() {
	     	expect(coinsInterface.isFormInputValid("")).toBeFalsy();
	    });
	});
  	
	return {
		specName: "coinsInterfaceSpec"
	}
    
});