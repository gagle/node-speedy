"use strict";

var speedy = require ("../lib");

speedy.run ({
	"+": function (){
		var a = "";
		for (var i=0; i<1000; i++){
			a += "c";
		}
	},
	join: function (){
		var arr = [];
		for (var i=0; i<1000; i++){
			arr.push ("c");
		}
		arr.join ("");
	},
	concat: function (){
		var a = "";
		for (var i=0; i<1000; i++){
			a = a.concat ("c");
		}
	}
});

/*
File: string-concatenation.js

Node v0.10.13
V8 v3.14.5.9
Speedy v0.0.8

Benchmarks: 3
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~9000ms (9s 0ms)

Higher is better (ops/sec)

+
  154,431 ± 0.3%
join
  131,979 ± 0.0%
concat
  59,716 ± 0.0%

Elapsed time: 9135ms (9s 135ms)
*/