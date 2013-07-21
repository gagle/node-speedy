"use strict";

var speedy = require ("../lib");

speedy.run ({
	ternary: function (){
		var s = "s";
		s += (true ? "s" : "") + "s";
	},
	"if": function (){
		var s = "s";
		if (true) s += "s";
		s += "s";
	}
});

/*
File: ternary-concatenation.js

Node v0.10.13
V8 v3.14.5.9
Speedy v0.0.7

Benchmarks: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

ternary
  40,437,668 ± 0.6%
if
  40,541,298 ± 0.0%

Elapsed time: 6141ms (6s 141ms)
*/