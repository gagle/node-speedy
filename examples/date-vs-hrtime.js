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

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

date
  23,447,936 ± 0.1%
hrtime
  3,262,705 ± 0.0%

Elapsed time: 6055ms (6s 55ms)
*/