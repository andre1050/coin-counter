/** Filename: coinsCalculator.js
    Abstract: AMD Module that parses the user input and calculates the minimum number of coins to make a given value in pence.
	Author: Andre Silva - andre1050@gmail.com
**/

define(["jquery", "use!underscore"], function ($, _) {

	// Private @ Array with all available coins and their values in pence
	var availableCoins = [
		{ name: "£2",  pence: 200 },
		{ name: "£1",  pence: 100 },
		{ name: "50p", pence: 50  },
		{ name: "20p", pence: 20  },
		{ name: "10p", pence: 10  },
		{ name: "5p",  pence: 5   },
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

		// Pre-validation: look for non-valid characters (anything not a number, dot, £ or p).
		if (value.match(/[^0-9.£p]+/g)) {
			// If invalid characters are found, return false and leave
			return false;
		}

		// Keep reference to each special character we're working with
		var pound = "£",
			pence = "p",
			dot = ".";

		// Initialise counters and control variables
		var currPound = 0,
			currPence = 0,
			roundPenceUp = false;

		// Determine position of each character in the string
		var posOfPound = value.indexOf(pound),
			posOfPence = value.indexOf(pence),
			posOfDot = value.indexOf(dot);

		// Helper function to determine if the pence need to be rounded up;
		// For this, we isolate the 3rd character after the dot and check if it's equal or greater than 5;
		var determineIfRoundIsNeeded = function () {
			var thirdPlace = value.substring(posOfDot + 3, posOfDot + 4);
			if (parseInt(thirdPlace) >= 5) {
				roundPenceUp = true;
			}
		}
		
		// Parsing user input: if I was a RegExp guru, I would probably solve this
		// in a nicer way... but we can achieve the same results working with strings.
		if (posOfPound === 0) {
			if (posOfDot != -1) {
				// Pounds and pennies
				currPound = value.substring(posOfPound + 1, posOfDot);
				// Make sure there's a number after the dot
				if (posOfPence != posOfDot + 1) {
					currPence = value.substring(posOfDot + 1, posOfDot + 3);
					determineIfRoundIsNeeded();
				}
			} else {
				// Only pounds, no pennies
				currPound = value.substring(posOfPound + 1);
			}
		} else {
			// Pounds and pennies (pound sign may be omitted)
			if (posOfDot != -1) {
				currPound = value.substring(0, posOfDot);
				currPence = value.substring(posOfDot + 1, posOfDot + 3);
				determineIfRoundIsNeeded();
			} else {
				// Only pennies, no pounds
				currPence = value;
			}
			
		}

		// Parse both pounds and pence to whole numbers (this will discard the "p" at the end)
		currPound = parseInt(currPound);
		currPence = parseInt(currPence);

		// If the pence needs to be rounded up, do it here
		if (roundPenceUp) {
			currPence += 1;
		}

		// Return final value in pence (requires multiplying pound by 100)
		return (currPound * 100) + currPence;

	};

	// Expose public variables
    return {
        calculateCoins: function (value) {
        	// only entry point for other modules using this (except for testing)
        	return calculateCoins(value);
        },
        parseUserInput: function (value) {
        	// this method is only returned for testing purposes
        	return parseUserInput(value);
        }
    };
    
});