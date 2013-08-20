/** Filename: coinsInterfaceSpec.js
    Abstract: ###
**/

define(["coinsInterface"], function (coinsInterface) {

	// Validation Test Cases
	describe("Testing form input validation", function() {
	    it('Should ACCEPT an integer numeric value', function() {
	     	expect(coinsInterface.isFormInputValid("515")).toBeTruthy();
	    });
	    it('Should ACCEPT an natural numeric value', function() {
	     	expect(coinsInterface.isFormInputValid("28.235")).toBeTruthy();
	    });
	    it('Should REJECT an empty value', function() {
	     	expect(coinsInterface.isFormInputValid("")).toBeFalsy();
	    });
	});
  	
	return {
		specName: "coinsInterfaceSpec"
	}
    
});