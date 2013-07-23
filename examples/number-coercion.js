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
	}
});

/*
File: number-coercion.js

Node v0.10.13
V8 v3.14.5.9
Speedy v0.0.8

Benchmarks: 3
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~9000ms (9s 0ms)

Higher is better (ops/sec)

Number
  39,851,676 ± 0.0%
+
  32,630,632 ± 0.0%
parseInt
  58,444,256 ± 0.0%

Elapsed time: 9078ms (9s 78ms)
*/