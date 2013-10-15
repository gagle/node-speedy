"use strict";

var speedy = require ("../lib");

speedy.run ({
	toLowerCase: function (){
		"ABC".toLowerCase () === "abc".toLowerCase ();
	},
	test: function (){
		/^ABC$/i.test ("abc");
	},
	match: function (){
		!!"ABC".match (/^abc$/i);
	}
});

/*
File: case-insensitive-string-comparison.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 3
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~9000ms (9s 0ms)

Higher is better (ops/sec)

toLowerCase
  14,483,687 ± 0.0%
test
  24,385,809 ± 0.0%
match
  15,678,777 ± 0.1%

Elapsed time: 9077ms (9s 77ms)
*/