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

Benchmarks: 3
Multiplier: 1
Time per test: 1000ms (1s 0ms)
Runs per test: 3
Total time per test: ~3000ms (3s 0ms)
Total benchmark time: ~9000ms (9s 0ms)

Higher is better

literal
  143,489
constructor
  36,410
create
  8,024

Elapsed time: 9151ms (9s 151ms)
*/