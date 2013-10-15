"use strict";

var speedy = require ("../lib");

speedy.run ({
	Number: function (){
		Number ("1.1");
	},
	"+": function (){
		+"1.1";
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

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 4
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~12000ms (12s 0ms)

Higher is better (ops/sec)

Number
  13,078,063 ± 0.1%
+
  10,982,975 ± 0.0%
parseFloat
  16,901,142 ± 0.0%
json
  10,823,115 ± 0.0%

Elapsed time: 12293ms (12s 293ms)
*/