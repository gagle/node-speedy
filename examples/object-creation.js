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

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 3
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~9000ms (9s 0ms)

Higher is better (ops/sec)

literal
  143,964,776 ± 0.1%
constructor
  36,601,799 ± 0.0%
create
  8,154,970 ± 0.0%

Elapsed time: 9220ms (9s 220ms)
*/