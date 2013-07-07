"use strict";

var speedy = require ("../lib");

speedy.run ({
	literal: function (){
		return {};
	},
	constructor: function (){
		return new Object ();
	},
	create: function (){
		return Object.create (Object.prototype);
	}
});

/*
File: object-creation.js

Node v0.10.12
V8 v3.14.5.9
Speedy v0.0.4

Benchmarks: 3
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total benchmark time: ~9000ms (9s 0ms)

Higher is better (ops/sec)

literal
  143,887,810
constructor
  36,618,481
create
  8,014,581

Elapsed time: 9173ms (9s 173ms)
*/