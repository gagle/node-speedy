"use strict";

var speedy = require ("../lib");

speedy.run ({
	toLowerCase: function (){
		"ABC".toLowerCase () === "abc".toLowerCase ();
	},
	regexp: function (){
		/^ABC$/i.test ("abc");
	},
	match: function (){
		!!"ABC".match (/^abc$/i);
	}
});

/*
File: case-insensitive-string-comparison.js

Node v0.10.13
V8 v3.14.5.9
Speedy v0.0.8

Benchmarks: 3
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~9000ms (9s 0ms)

Higher is better (ops/sec)

toLowerCase
  14,666,483 ± 0.0%
regexp
  24,502,498 ± 0.1%
match
  16,072,184 ± 0.0%

Elapsed time: 9078ms (9s 78ms)
*/