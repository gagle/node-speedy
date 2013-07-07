"use strict";

var speedy = require ("../lib");

var a1 = [], i1 = 0;
var a2 = [], i2 = 0;
var a3 = [], i3 = 0;
var n = 1000000;

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

Benchmarks: 3
Multiplier: 1
Time per test: 1000ms (1s 0ms)
Runs per test: 3
Total time per test: ~3000ms (3s 0ms)
Total benchmark time: ~9000ms (9s 0ms)

Higher is better



n = 100

push
  79,059
length
  53,893
index
  54,570

	

n = 10000

push
  68,002
length
  70,922
index
  72,941

	
	
n = 1000000

push
  22,330
length
  18,952
index
  19,192
*/