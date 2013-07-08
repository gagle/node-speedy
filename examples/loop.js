"use strict";

var speedy = require ("../lib");

var array = [];
for (var i=0; i<1000; i++){
	array[i] = i;
};

speedy.run ({
	"0": function (){
		for (var i=0; i<array.length; i++);
	},
	"1": function (){
		for (var i=0, ii=array.length; i<ii; i++);
	},
	"2": function (){
		for (var i=array.length-1; i>=0; i--);
	},
	"3": function (){
		for (var i=array.length; i--;);
	},
	"4": function (){
		var i = array.length;
		while (i--);
	},
	"5": function (){
		for (var i in array);
	},
	"6": function (){
		var i;
		for (i=0; i<array.length; i++);
	}
});

/*
File: loop.js

Node v0.10.12
V8 v3.14.5.9
Speedy v0.0.4

Benchmarks: 7
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total benchmark time: ~21000ms (21s 0ms)

Higher is better (ops/sec)

0
  1,339,182
1
  1,340,928
2
  1,340,219
3
  1,009,091
4
  1,009,334
5
  17,815
6
  1,339,237

Elapsed time: 21342ms (21s 342ms)
*/