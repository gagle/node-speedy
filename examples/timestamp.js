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

Node v0.10.12
V8 v3.14.5.9
Speedy v0.0.5

Benchmarks: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total benchmark time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

now
  24,340,626 +/- 0.0%
getTime
  10,043,085 +/- 0.1%

Elapsed time: 6131ms (6s 131ms)
*/