"use strict";

var speedy = require ("../lib");

speedy.run ({
	"in": function (){
		"a" in { a: null };
	},
	"getter": function (){
		({ a: true }).a;
	}
});

/*
File: check-object-property.js

Node v0.10.13
V8 v3.14.5.9
Speedy v0.0.8

Benchmarks: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

in
  19,155,210 ± 0.0%
getter
  116,940,967 ± 0.1%

Elapsed time: 6054ms (6s 54ms)
*/