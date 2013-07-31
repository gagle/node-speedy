"use strict";

var speedy = require ("../lib");

speedy.run ({
	String: function (){
		String (123);
	},
	toString: function (){
		(123).toString ();
	},
	"\"\"": function (){
		123 + "";
	},
	json: function (){
		JSON.stringify (123);
	}
});

/*
File: tostring.js

Node v0.10.15
V8 v3.14.5.9
Speedy v0.0.8

Benchmarks: 4
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~12000ms (12s 0ms)

Higher is better (ops/sec)

String
  43,356,789 ± 0.0%
toString
  70,357,490 ± 0.0%
""
  109,046,072 ± 0.0%
json
  18,314,696 ± 0.0%

Elapsed time: 12292ms (12s 292ms)
*/