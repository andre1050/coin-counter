/** Filename: coinsCalculator.js
    Abstract: ###
**/

define(["jquery", "use!underscore"], function ($, _) {

	// Private variable
	var parseInput = function (value) {

		var response;

		if (value > 10) {
			response = false;
		} else {
			response = {
				value: 95.95, 
				sumCoins: 17,
				allCoins: [
					{ coin: "£2", total: 8 },
					{ coin: "£1", total: 4 },
					{ coin: "50p", total: 7 },
					{ coin: "20p", total: 5 },
					{ coin: "2p", total: 6 },
					{ coin: "1p", total: 1 }
				]
			}
		}
		
		return response;
		
	};

	// Expose public variables and functions to be accessible outside of the module
    return {
        calculateCoins: function (value) {
        	return parseInput(value);
        }
    };
    
});