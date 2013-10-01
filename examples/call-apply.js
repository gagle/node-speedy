"use strict";

var speedy = require ("../lib");

var fn = function (a, b, c){
	this._a = a;
	this._b = b;
	this._c = c;
};

speedy.run ({
	call: function (){
		fn.call ({}, 1, 2, 3);
	},
	apply: function (){
		fn.apply ({}, [1, 2, 3]);
	}
});

/*
File: call-apply.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.0.8

Benchmarks: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

call
  19,738,093 ± 0.4%
apply
  12,947,688 ± 0.0%

Elapsed time: 6162ms (6s 162ms)
*/