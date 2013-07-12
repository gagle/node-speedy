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
Speedy v0.0.5

Benchmarks: 3
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total benchmark time: ~9000ms (9s 0ms)

Higher is better (ops/sec)

literal
  139,331,074 +/- 0.2%
constructor
  36,154,771 +/- 0.1%
create
  7,995,637 +/- 0.0%

Elapsed time: 9188ms (9s 188ms)
*/