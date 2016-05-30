Counting the Pennies
====================

Simple JavaScript app to calculate the minimum number of Sterling coins needed for any amount of pennies.

![](http://andretc.com/demos/ctp/ctp_cover.png)

[Live Demo](http://andretc.com/demos/ctp/)

#### Update May 2016: 

This was built as an assignement for a job back in 2013. The code is mostly vanilla JavaScript using AMD with RequireJS. There's some jQuery to manipulate the DOM and Underscope to help with the arrays.

At the time I decided to keep all DOM manipulation in a separate module at `js\modules\coinsInterface.js`, just so that the algorithm itself at `js\modules\coinsCalculator.js` could be kept "clean" and distributed more easily.

