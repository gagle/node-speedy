"use strict";

var speedy = require ("../lib");

speedy.run ({
	"literal": function (){
		return [];
	},
	"constructor": function (){
		return new Array ();
	}
});

/*
Node v0.10.12
V8 v3.14.5.9

Benchmarks: 2
Amplifier: 100
Time per test: 1000ms (1s 0ms)
Runs per test: 3 (+1)
Total time per test: 4000ms (4s 0ms)
Total benchmark time: 8000ms (8s 0ms)

Higher is better

literal
  132774.455
constructor
  79610.726

Benchmark finished
*/