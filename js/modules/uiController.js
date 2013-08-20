/** Filename: uiController.js
    Abstract: ###
**/

define(["jquery", "use!underscore", "coinCounter"], function ($, _, coinCounter) {

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
			if (value.length < 1) {
				// Input is Valid
				elements.theForm.message.show();
				elements.results.wrapper.hide();
			} else {
				// Input is Invalid
				requestCalculations(value);
				elements.theForm.message.hide();
			}
			return false;
		});
	};
	
	// Private @ Request calculation from the module and check for type of response received
	var requestCalculations = function (value) {
		var coinCalculation = coinCounter.calculateCoins(value);
		if (coinCalculation) {
			// Response is Object - OK
			updateResults(coinCalculation);
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
		var output = "", 
			contents;

		for (coin in results.allCoins) {
			var contents = _.template(templates.coins, results.allCoins[coin]);
			output += contents;
		}

		// Write coins to container
		elements.results.container.html(output);

	};

	// Expose public variables to be accessible outside the module
    return {
        initialiseForm: initialiseForm
    };
    
});