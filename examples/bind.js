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
	me: fn2
});

/*
File: bind.js

Node v0.10.13
V8 v3.14.5.9
Speedy v0.0.7

Benchmarks: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

bind
  8,970,513 ± 0.0%
me
  141,976,230 ± 0.0%

Elapsed time: 6162ms (6s 162ms)
*/