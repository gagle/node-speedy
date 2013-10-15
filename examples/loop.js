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
	},
	"7": function (){
		array.forEach (function (){});
	}
});

/*
File: loop.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 8
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~24000ms (24s 0ms)

Higher is better (ops/sec)

0
  1,340,104 ± 0.0%
1
  1,342,411 ± 0.0%
2
  1,342,063 ± 0.0%
3
  1,009,996 ± 0.0%
4
  1,009,568 ± 0.0%
5
  18,652 ± 0.0%
6
  1,341,659 ± 0.0%
7
  36,010 ± 0.0%

Elapsed time: 24586ms (24s 586ms)
*/