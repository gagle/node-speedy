"use strict";

var speedy = require ("../lib");

speedy.run ({
	Number: function (){
		Number ("0x10");
	},
	"+": function (){
		+"0x10";
	}
});

/*
File: number-coercion.js

Node v0.10.13
V8 v3.14.5.9
Speedy v0.0.7

Benchmarks: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

Number
  17,611,244 ± 0.1%
+
  16,173,311 ± 0.0%

Elapsed time: 6051ms (6s 51ms)
*/