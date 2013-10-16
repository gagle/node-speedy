"use strict";

var speedy = require ("../lib");

var s = "string";

speedy.run ({
	cache: function (){
		var type = typeof s;
		type === "number";
		type === "string";
	},
	"no-cache": function (){
		typeof s === "number";
		typeof s === "string";
	}
});

/*
File: typeof.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

cache
  82,349,483 ± 0.0%
no-cache
  147,240,709 ± 0.0%

Elapsed time: 6147ms (6s 147ms)
*/