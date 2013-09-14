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
		//It's not the same as Number but shares some functionalities
		parseFloat ("1.1");
	},
	json: function (){
		JSON.parse ("1.1");
	}
});

/*
File: number-coercion.js

Node v0.10.15
V8 v3.14.5.9
Speedy v0.0.8

Benchmarks: 4
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~12000ms (12s 0ms)

Higher is better (ops/sec)

Number
  13,054,391 ± 0.0%
+
  10,987,569 ± 0.0%
parseFloat
  16,906,143 ± 0.0%
json
  10,595,120 ± 0.0%

Elapsed time: 12185ms (12s 185ms)
*/