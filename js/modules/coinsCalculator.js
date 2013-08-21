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
		
		// Pre-validation: look for non-valid characters (anything not number, dot, £ or p).
		if (value.match(/[^0-9.£p]+/g)) {
			// If invalid characters are found, return false and leave
			return false;
		}

		var pound = "£",
			pence = "p",
			dot = ".",
			userValue = value;

		var currPound = 0,
			currPence = 0,
			totalPence = 0,
			roundPenceUp = false;

		var posOfPound = value.indexOf(pound),
			posOfPence = value.indexOf(pence),
			posOfDot = value.indexOf(dot);
		
		if (posOfPound === 0) {
			if (posOfDot != -1) {
				currPound = value.substring(posOfPound + 1, posOfDot);
				if (posOfPence != posOfDot + 1) {
					currPence = value.substring(posOfDot + 1, posOfDot + 3);
					var thirdPlace = value.substring(posOfDot + 3, posOfDot + 4);
					if (parseInt(thirdPlace) >= 5) {
						roundPenceUp = true;
					}
				}
			} else {
				currPound = value.substring(posOfPound + 1);
			}
		} else {
			if (posOfDot != -1) {
				currPound = value.substring(0, posOfDot);
				currPence = value.substring(posOfDot + 1, posOfDot + 3);
				var thirdPlace = value.substring(posOfDot + 3, posOfDot + 4);
				if (parseInt(thirdPlace) >= 5) {
					roundPenceUp = true;
				}
			} else {
				currPence = value;
			}
			
		}

		currPound = parseInt(currPound);
		currPence = parseInt(currPence);

		if (roundPenceUp) {
			currPence += 1;
		}

		totalPence = (currPound * 100) + currPence;

		return totalPence;

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