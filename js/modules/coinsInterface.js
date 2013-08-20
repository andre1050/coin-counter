/** Filename: coinsInterface.js
    Abstract: AMD Module that handles the DOM activity (Form and Results) for the coinsCalculator module.
**/

define(["jquery", "use!underscore", "coinsCalculator"], function ($, _, coinsCalculator) {

	// Private @ Reference to each DOM element wrapped in a jQuery object
	var elements = {
		theForm: {
			theForm: $(".js-form"),
			amount: $(".js-amount"),
			submit: $(".js-submit"),
			message: $(".js-message")
		},
		results: {
			wrapper: $(".js-wrapper"),
			theValue: $(".js-result-value"),
			coins: $(".js-result-coins"),
			container: $(".js-container")
		}
	};

	// Private @ Unparsed contents of each HTML template
	var templates = {
		coins: $(".js-template-coin").html()
	};

	// Private @ Currency symbol to be appended to strings
	var currency = "£";

	// Public @ Add basic form validation and handle submissions
	var initialiseForm = function () {
		elements.theForm.theForm.on("submit", function () {
			var value = elements.theForm.amount.val();
			if (!isFormInputValid(value)) {
				// Input is Invalid
				elements.theForm.message.show();
				elements.results.wrapper.hide();
			} else {
				// Input is Valid
				requestCalculations(value);
				elements.theForm.message.hide();
			}
			return false;
		});
	};
	
	// Public @ Basic form input validation
	var isFormInputValid = function (value) {
		if ($.trim(value).length > 0) {
			return true;
		} else {
			return false;
		}
	}

	// Private @ Request calculation from the module and check for type of response received
	var requestCalculations = function (value) {
		var coinCalculation = coinsCalculator.calculateCoins(value);
		console.log("Result from Calculation: ", coinCalculation);
		if (coinCalculation) {
			// Response is Object - OK
			updateResults(coinCalculation);
			elements.theForm.message.hide();
			elements.results.wrapper.show();
		} else {
			// Response is False - Error
			elements.theForm.message.show();
			elements.results.wrapper.hide();
		};
	};
	
	// Private @ Update DOM after results have been received
	var updateResults = function (results) {
		
		// Update Summary
		elements.results.theValue.html(currency + results.value);
		elements.results.coins.html(results.sumCoins);

		// Update Coins
		var output = "";
		for (coin in results.allCoins) {
			output += _.template(templates.coins, results.allCoins[coin]);
		}

		// Write coins to container
		elements.results.container.html(output);

	};

	// Expose public variables
    return {
        initialiseForm: initialiseForm,
        isFormInputValid: function (value) {
        	return isFormInputValid(value);
        }
    };
    
});