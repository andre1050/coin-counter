/** Filename: main.js
    Abstract: application bootstrap and basic set-up for Require.js
    Author: Andre Silva - andre1050@gmail.com
**/

// Basic set-up for Require.js
require.config({
	// All AMD-compatible files inside this folder will be automatically loaded
    baseUrl: 'js/modules',
    // Manually provide paths for libraries and vendor plugins
    paths: {
    	jquery: "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min",
    	underscore: "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min",
    	use: "https://cdnjs.cloudflare.com/ajax/libs/use.js/0.2.0/use.min"
    },
    // Non-AMD files with be loaded with Use.js, which will make sure
    // they follow the AMD pattern without any source code changes required
    use: {
        "underscore": {
            attach: "_"
        }
    }
});

// Application bootstrap
require(["jquery", "use!underscore", "coinsInterface"], function($, _, coinsInterface) {
    
    // Let's initialise the application by callig the method
    // that will bind the submission handler to the form.
    coinsInterface.initialiseForm();
    
});