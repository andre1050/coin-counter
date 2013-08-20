/** Filename: coinsCalculator.js
    Abstract: AMD Module that parses the user input and calculates the minimum number of coins to make a given value in pence.
**/

define(["jquery", "use!underscore"], function ($, _) {

	// Private @ Array with all available coins and their values in pence
	var availableCoins = [
		{ name: "£2",  pence: 200 },
		{ name: "£1",  pence: 100 },
		{ name: "50p", pence: 50  },
		{ name: "20p", pence: 20  },
		{ name: "2p",  pence: 2   },
		{ name: "1p",  pence: 1   },
	];

	// Public @ Calculates the miminim number of coins to make the value
	var calculateCoins = function (value) {

		// Parse user input to ensure we always work with pence not pounds
		var valueInPence = parseUserInput(value);

		// If parsing was not successful, then return false and leave
		if (!valueInPence) {
			return false;
		}

		// Initialise counters before calculating number of coins needed
		var coinTotals = {},
			counter = 0,
			penceLeft = valueInPence;

		// Iterate through the array of available coins...
		for (var i = 0; i < availableCoins.length; i++) {
			// Count how many times we can fit the pennies we have left in the current coin's value
			counter = Math.floor(penceLeft / availableCoins[i].pence);
			// Update the amount of pennies we have left for next iteration
			penceLeft -= availableCoins[i].pence * counter;
			// Save the number of coins used
			coinTotals[availableCoins[i].name] = counter;
		}

		// Initiate counters before describing the coins needed above
		var coinDetails = [],
			coinCounter = 0;

		// Iterate through the array of coins used...
		for (var coin in coinTotals) {
			// We want to ignore the coins that weren't used
			if (coinTotals[coin] > 0) {
				// Push into details array the total of coins used
				coinCounter += coinTotals[coin];
				coinDetails.push({ coin: coin, total: coinTotals[coin] });
			}
		}

		// Compose response array
		var response = {
			value: (valueInPence / 100),
			sumCoins: coinCounter,
			allCoins: coinDetails 
		}

		return response;

	};

	// Public @ Parses user input and tries to return amound in pence; will return false otherwise
	// This method is only made public for testing purposes.
	var parseUserInput = function (value) {
		return parseInt(value);
	};

	// Expose public variables
    return {
        calculateCoins: function (value) {
        	return calculateCoins(value);
        },
        parseUserInput: function (value) {
        	return parseUserInput(value);
        }
    };
    
});