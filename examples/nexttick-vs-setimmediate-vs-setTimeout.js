"use strict";

var speedy = require ("../lib");

speedy.run ({
	"nextTick": function (done){
		process.nextTick (done);
	},
	"setImmediate": function (done){
		setImmediate (done);
	},
	"setTimeout": function (done){
		setTimeout (done, 0);
	}
});

/*
Node v0.10.12
V8 v3.14.5.9

Benchmarks: 3
Amplifier: 100
Time per test: 1000ms (1s 0ms)
Runs per test: 3 (+1)
Total time per test: 4000ms (4s 0ms)
Total benchmark time: 12000ms (12s 0ms)

Higher is better

nextTick
  201369.917
setImmediate
  20937.195
setTimeout
  3.224

Benchmark finished
*/