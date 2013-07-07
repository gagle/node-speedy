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

Node v0.10.12
V8 v3.14.5.9
Speedy v0.0.4

Benchmarks: 3
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total benchmark time: ~9000ms (9s 0ms)

Higher is better (ops/sec)



n = 100

push
  78,857,023
length
  53,745,306
index
  54,472,051

	

n = 10000

push
  67,062,914
length
  71,096,686
index
  72,976,490

	
	
n = 1000000

push
  22,672,867
length
  19,203,283
index
  19,162,379
*/