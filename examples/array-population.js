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

Node v0.10.13
V8 v3.14.5.9
Speedy v0.0.7

Benchmarks: 3
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~9000ms (9s 0ms)

Higher is better (ops/sec)



n = 100

push
  80,199,962 ± 0.1%
length
  53,423,748 ± 0.2%
index
  54,175,621 ± 0.0%

	

n = 10000

push
  68,572,205 ± 0.0%
length
  71,030,639 ± 0.0%
index
  72,475,634 ± 0.0%

	
	
n = 1000000

push
  22,375,926 ± 0.2%
length
  19,028,811 ± 0.3%
index
  19,295,626 ± 0.3%
*/