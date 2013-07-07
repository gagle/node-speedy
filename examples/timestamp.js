"use strict";

var speedy = require ("../lib");
speedy.timeout(2000)
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

Benchmarks: 2
Multiplier: 1
Time per test: 1000ms (1s 0ms)
Runs per test: 3
Total time per test: ~3000ms (3s 0ms)
Total benchmark time: ~6000ms (6s 0ms)

Higher is better

now
  24,340
getTime
  10,154

Elapsed time: 6101ms (6s 101ms)
*/