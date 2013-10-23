"use strict";

var speedy = require ("../lib");

speedy.run ({
	Number: function (){
		Number ("1.1");
	},
	"+": function (){
		+"1.1";
	},
	"~~": function (){
		//It's the same as "+" but it also crops the decimal part and returns a 0 if
		//it's not a numeric string, so if you need to sanitize a number, this is
		//the best way
		~~"1.1";
	},
	parseFloat: function (){
		//It's not the same as Number but shares some similarities
		parseFloat ("1.1");
	},
	json: function (){
		JSON.parse ("1.1");
	}
});

/*
File: parse-number.js

Node v0.10.21
V8 v3.14.5.9
Speedy v0.1.1

Tests: 5
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~15000ms (15s 0ms)

Higher is better (ops/sec)

Number
  13,014,401 ± 0.1%
+
  11,078,243 ± 0.0%
~~
  11,337,886 ± 0.0%
parseFloat
  16,981,702 ± 0.0%
json
  10,712,992 ± 0.2%

Elapsed time: 15366ms (15s 366ms)
*/