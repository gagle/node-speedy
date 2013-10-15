"use strict";

var speedy = require ("../lib");

var o = {};

speedy.run ({
	"in": function (){
		"a" in o;
	},
	"undefined": function (){
		o.a !== undefined;
	}
});

/*
File: in-object.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

in
  16,979,118 ± 0.0%
undefined
  151,003,184 ± 0.0%

Elapsed time: 6146ms (6s 146ms)
*/