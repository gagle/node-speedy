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
Speedy v0.0.8

Benchmarks: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

in
  16,982,098 ± 0.0%
undefined
  152,094,766 ± 0.0%

Elapsed time: 6146ms (6s 146ms)
*/