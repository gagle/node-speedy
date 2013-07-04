"use strict";

var speedy = require ("../lib");

speedy.run ({
	"literal": function (){
		return {};
	},
	"constructor": function (){
		return new Object ();
	},
	"create": function (){
		return Object.create (Object.prototype);
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

literal
  142226.746
constructor
  36544.587
create
  8058.053

Benchmark finished
*/