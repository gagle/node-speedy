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

Node v0.10.13
V8 v3.14.5.9
Speedy v0.0.7

Benchmarks: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

now
  24,171,448 ± 0.1%
getTime
  10,063,260 ± 0.0%

Elapsed time: 6162ms (6s 162ms)
*/