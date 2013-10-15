"use strict";

var speedy = require ("../lib");

var a1 = [], i1 = 0;
var a2 = [], i2 = 0;
var a3 = [], i3 = 0;
var n = 100;

speedy.run ({
	push: function (){
		if (i1 === n){
			a1 = [];
			i1 = 0;
		}
		i1++;
		a1.push (1);
	},
	length: function (){
		if (i2 === n){
			a2 = [];
			i2 = 0;
		}
		i2++;
		a2[a2.length] = 1;
	},
	index: function (){
		if (i3 === n){
			a3 = [];
			i3 = 0;
		}
		a3[i3++] = 1;
	}
});

/*
The results vary depending on the array length



File: array-population.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 3
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~9000ms (9s 0ms)

Higher is better (ops/sec)



n = 100

push
  82,890,473 ± 0.0%
length
  52,293,355 ± 0.1%
index
  52,790,295 ± 0.0%

	

n = 10000

push
  71,426,828 ± 0.0%
length
  70,783,269 ± 0.2%
index
  72,458,042 ± 0.0%

	
	
n = 1000000

push
  23,369,209 ± 0.6%
length
  19,272,770 ± 0.0%
index
  19,180,275 ± 0.3%
*/