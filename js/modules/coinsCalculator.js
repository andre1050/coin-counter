/** Filename: coinsCalculator.js
    Abstract: ###
**/

define(["jquery", "use!underscore"], function ($, _) {

	// Private @ Array with all available coins and their respective value in pennies
	var availableCoins = [
		{ name: "£2",  value: 200 },
		{ name: "£1",  value: 100 },
		{ name: "50p", value: 50  },
		{ name: "20p", value: 20  },
		{ name: "2p",  value: 2   },
		{ name: "1p",  value: 1   },
	];

	// Public @ Calculates the miminim number of coins to make the value
	var calculateCoins = function (value) {

		// Parse user input to ensure we always work with pennies
		var valueInPennies = parseValue(value);

		// Initialise counters before calculating
		var coinTotals = {},
			counter = 0,
			penniesLeft = valueInPennies;

		// Iterate through the array of available coins...
		for (var i = 0; i < availableCoins.length; i++) {
			// Count how many times we can fit the pennies left in the current coin's value
			counter = Math.floor(penniesLeft / availableCoins[i].value);
			// Update the amount of pennies we have left for next iteration
			penniesLeft -= availableCoins[i].value * counter;
			// Save the number of coins used
			coinTotals[availableCoins[i].name] = counter;
		}

		// Initiate counters before describing
		var coinDetails = [],
			coinCounter = 0;

		// Iterate through the array of coins used...
		for (var coin in coinTotals) {
			// We want to ignore the coins that weren't used
			if (coinTotals[coin] > 0) {
				// Push into details array the total of coins used in previous calculation
				coinCounter += coinTotals[coin];
				coinDetails.push({ coin: coin, total: coinTotals[coin] });
			}
		}

		// Compose response array
		var response = {
			value: (valueInPennies / 100),
			sumCoins: coinCounter,
			allCoins: coinDetails 
		}
		
		return response;

	};

	var parseValue = function (value) {
		return parseInt(value);
	};
	
	// Expose public variables
    return {
        calculateCoins: function (value) {
        	return calculateCoins(value);
        },
    };
    
});