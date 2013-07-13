"use strict";

var speedy = require ("../lib");

speedy.run ({
	literal: function (){
		return [];
	},
	constructor: function (){
		return new Array ();
	}
});

/*
File: array-creation.js

Node v0.10.13
V8 v3.14.5.9
Speedy v0.0.6

Benchmarks: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total benchmark time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

literal
  133,534,838 ± 0.1%
constructor
  79,540,605 ± 0.1%

Elapsed time: 6147ms (6s 147ms)
*/