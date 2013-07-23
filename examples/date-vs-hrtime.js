"use strict";

var speedy = require ("../lib");

var s1 = Date.now ();
var s2 = process.hrtime ();

speedy.run ({
	date: function (){
		Date.now () - s1;
	},
	hrtime: function (){
		process.hrtime (s2);
	}
});

/*
File: date-vs-hrtime.js

Node v0.10.13
V8 v3.14.5.9
Speedy v0.0.8

Benchmarks: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

date
  23,648,206 ± 0.0%
hrtime
  3,303,525 ± 0.0%

Elapsed time: 6162ms (6s 162ms)
*/