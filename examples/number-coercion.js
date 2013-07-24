"use strict";

var speedy = require ("../lib");

speedy.run ({
	Number: function (){
		Number ("16");
	},
	"+": function (){
		+"16";
	},
	parseInt: function (){
		//It's not the same as Number but shares some functionalities
		parseInt ("16");
	},
	json: function (){
		JSON.parse ("16");
	}
});

/*
File: number-coercion.js

Node v0.10.13
V8 v3.14.5.9
Speedy v0.0.8

Benchmarks: 4
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~12000ms (12s 0ms)

Higher is better (ops/sec)

Number
  39,775,729 ± 0.0%
+
  32,393,493 ± 0.0%
parseInt
  58,092,646 ± 0.0%
json
  20,502,235 ± 0.0%

Elapsed time: 12280ms (12s 280ms)
*/