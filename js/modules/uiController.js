/** Filename: uiController.js
    Abstract: ###
**/

define(["jquery", "use!underscore", "coinCounter"], function ($, _, coinCounter) {

	// Private @ Reference to each DOM element
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

	// Private @ Currency symbol
	var currency = "£";

	// Private @ Contents of each template
	var templates = {
		coins: $(".js-template-coin").html()
	};

	// Public @ Initialise the form
	var initialiseForm = function () {
		elements.theForm.theForm.on("submit", function () {
			var value = elements.theForm.amount.val();
			if (value.length < 1) {
				elements.theForm.message.show();
				elements.results.wrapper.hide();
			} else {
				requestCalculations(value);
				elements.theForm.message.hide();
			}
			return false;
		});
	};
	
	var requestCalculations = function (value) {
		var coinCalculation = coinCounter.calculateCoins(value);
		if (coinCalculation) {
			updateResults(coinCalculation);
			elements.results.wrapper.show();
		} else {
			elements.theForm.message.show();
			elements.results.wrapper.hide();
		};
	};

	var updateResults = function (results) {
		console.log("Showing Results...", results);
		
		// Update Summary
		elements.results.theValue.html(results.value);
		elements.results.coins.html(results.sumCoins);

		// Reset Coin Container
		elements.results.container.html("");

		var output = "";
		for (coin in results.allCoins) {
			var contents = _.template(templates.coins, results.allCoins[coin]);
			output += contents;
		}

		elements.results.container.html(output);

	};

	

	// Expose public variables and functions to be accessible outside of the module
    return {
        initialiseForm: initialiseForm
    };
    
});