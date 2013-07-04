"use strict";

var speedy = require ("../lib");

var a1 = [], i1 = 0;
var a2 = [], i2 = 0;
var a3 = [], i3 = 0;
var n = 1000000;

speedy.run ({
	"push": function (){
		if (i1 === n){
			a1 = [];
			i1 = 0;
		}
		i1++;
		a1.push (1);
	},
	"length": function (){
		if (i2 === n){
			a2 = [];
			i2 = 0;
		}
		i2++;
		a2[a2.length] = 1;
	},
	"index": function (){
		if (i3 === n){
			a3 = [];
			i3 = 0;
		}
		a3[i3++] = 1;
	}
});

/*
The results vary depending on the array length



Node v0.10.12
V8 v3.14.5.9

Benchmarks: 3
Amplifier: 100
Time per test: 1000ms (1s 0ms)
Runs per test: 3 (+1)
Total time per test: 4000ms (4s 0ms)
Total benchmark time: 12000ms (12s 0ms)

Higher is better



n = 100

push
  79625.159
length
  52866.271
index
  53640.561

	

n = 10000

push
  67890.990
length
  69908.273
index
  71660.495

	
	
n = 1000000

push
  22624.323
length
  19070.792
index
  19400.825
	
	
	
Benchmark finished
*/