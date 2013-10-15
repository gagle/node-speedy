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

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

literal
  132,550,266 ± 0.0%
constructor
  77,587,140 ± 0.0%

Elapsed time: 6054ms (6s 54ms)
*/