"use strict";

var speedy = require ("../lib");

var fn1 = function (){
	this.a = 1;
}.bind ({});

var me2 = {};
var fn2 = function (){
	me2.a = 1;
};

speedy.run ({
	bind: fn1,
	closure: fn2
});

/*
File: bind.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

bind
  8,521,553 ± 0.0%
closure
  141,914,040 ± 0.0%

Elapsed time: 6053ms (6s 53ms)
*/