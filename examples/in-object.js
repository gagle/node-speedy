"use strict";

var speedy = require ("../lib");

/*
The following functions check if an object has a property but they are quite
different.
*/

var o = {};

speedy.run ({
	"in": function (){
		"a" in o;
	},
	"undefined": function (){
		o.a !== undefined;
	},
	"hasOwnProperty": function (){
		o.hasOwnProperty ("a");
	}
});

/*
File: in-object.js

Node v0.10.21
V8 v3.14.5.9
Speedy v0.1.1

Tests: 3
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~9000ms (9s 0ms)

Higher is better (ops/sec)

in
  16,356,927 ± 0.5%
undefined
  151,198,856 ± 0.0%
hasOwnProperty
  26,712,654 ± 0.0%

Elapsed time: 9079ms (9s 79ms)
*/