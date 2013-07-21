"use strict";

var speedy = require ("../lib");

var fn1 = function (){};
var fn2;

speedy.run ({
	noop: function (){
		fn1 ();
	},
	"if": function (){
		if (fn2) fn2 ();
	}
});

/*
File: noop.js

Node v0.10.13
V8 v3.14.5.9
Speedy v0.0.7

Benchmarks: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

noop
  173,113,069 ± 0.0%
if
  172,320,774 ± 0.0%

Elapsed time: 6131ms (6s 131ms)
*/