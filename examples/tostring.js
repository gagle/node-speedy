"use strict";

var speedy = require ("../lib");

speedy.run ({
	String: function (){
		String (123);
	},
	toString: function (){
		(123).toString ();
	},
	"\"\"": function (){
		123 + "";
	}
});

/*
File: tostring.js

Node v0.10.13
V8 v3.14.5.9
Speedy v0.0.8

Benchmarks: 3
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~9000ms (9s 0ms)

Higher is better (ops/sec)

String
  42,483,915 ± 0.0%
toString
  70,049,610 ± 0.0%
""
  108,087,114 ± 0.0%

Elapsed time: 9235ms (9s 235ms)
*/