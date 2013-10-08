"use strict";

var speedy = require ("../lib");

var s = "abc";

speedy.run ({
	"switch": function (){
		switch (s){
			case "a": break;
			case "b": break;
			case "c": break;
			case "d": break;
			case "e": break;
			case "f": break;
			case "abc": break;
		}
	},
	"if-else": function (){
		if (s === "a"){}
		else if (s === "b"){}
		else if (s === "c"){}
		else if (s === "d"){}
		else if (s === "e"){}
		else if (s === "f"){}
		else if (s === "abc"){}
	}
});

/*
File: switch.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.0.8

Benchmarks: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

switch
  53,929,132 ± 0.0%
if-else
  139,994,667 ± 0.0%

Elapsed time: 6147ms (6s 147ms)
*/