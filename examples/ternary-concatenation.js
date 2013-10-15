"use strict";

var speedy = require ("../lib");

speedy.run ({
	ternary: function (){
		var s = "s";
		s += (false ? "s" : "") + "s";
	},
	if: function (){
		var s = "s";
		if (false) s += "s";
		s += "s";
	}
});

/*
File: ternary-concatenation.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

ternary
  61,252,388 ± 0.1%
if
  68,022,017 ± 0.1%

Elapsed time: 6055ms (6s 55ms)
*/