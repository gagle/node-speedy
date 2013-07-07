"use strict";

var speedy = require ("../lib");

speedy.run ({
	nextTick: function (done){
		process.nextTick (done);
	},
	setImmediate: function (done){
		setImmediate (done);
	},
	setTimeout: function (done){
		setTimeout (done, 0);
	}
});

/*
File: nexttick-vs-setimmediate-vs-setTimeout.js

Node v0.10.12
V8 v3.14.5.9

Benchmarks: 3
Multiplier: 1
Time per test: 1000ms (1s 0ms)
Runs per test: 3
Total time per test: ~3000ms (3s 0ms)
Total benchmark time: ~9000ms (9s 0ms)

Higher is better

nextTick
  399,862
setImmediate
  40,802
setTimeout
  6

Elapsed time: 9200ms (9s 200ms)
*/