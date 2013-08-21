/** Filename: coinsInterfaceSpec.js
    Abstract: Test spec for module CoinsInterface.js
    Author: Andre Silva - andre1050@gmail.com
**/

define(["coinsInterface"], function (coinsInterface) {

	// Validation Test Cases
	describe("Testing basic form validation", function() {

		// Declare test variable
	  	var value;

	    it('Should ACCEPT any whole number', function() {
	    	value = "550";
	    	expect(coinsInterface.isFormInputValid(value)).toBeTruthy();
	    });
	    it('Should ACCEPT any real number', function() {
	    	value = "15.495";
	    	expect(coinsInterface.isFormInputValid(value)).toBeTruthy();
	    });
	    it('Should ACCEPT any string', function() {
	    	value = "Lorem Ipsum";
	    	expect(coinsInterface.isFormInputValid(value)).toBeTruthy();
	    });
	    it('Should ACCEPT any mix of number and string', function() {
	    	value = "£15.95p";
	    	expect(coinsInterface.isFormInputValid(value)).toBeTruthy();
	    });
	    it('Should REJECT an empty field', function() {
	    	value = "";
	     	expect(coinsInterface.isFormInputValid(value)).toBeFalsy();
	    });
	});
  	
	return {
		specName: "coinsInterfaceSpec"
	}
    
});