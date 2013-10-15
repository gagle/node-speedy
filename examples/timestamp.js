"use strict";

var speedy = require ("../lib");

speedy.run ({
	now: function (){
		Date.now ();
	},
	getTime: function (){
		new Date ().getTime ();
	}
});

/*
File: timestamp.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

now
  24,383,290 ± 0.0%
getTime
  9,773,471 ± 0.0%

Elapsed time: 6146ms (6s 146ms)
*/