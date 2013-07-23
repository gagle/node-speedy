"use strict";

var speedy = require ("../lib");

speedy.run ({
	ternary: function (){
		var s = "s";
		s += (false ? "s" : "") + "s";
	},
	"if": function (){
		var s = "s";
		if (false) s += "s";
		s += "s";
	}
});

//If the boolean value is true the both results are the same

/*
File: ternary-concatenation.js

Node v0.10.13
V8 v3.14.5.9
Speedy v0.0.8

Benchmarks: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

ternary
  60,211,585 ± 0.0%
if
  68,274,787 ± 0.0%

Elapsed time: 6131ms (6s 131ms)
*/