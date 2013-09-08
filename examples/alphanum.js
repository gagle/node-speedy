"use strict";

var speedy = require ("speedy");

var code = "z".charCodeAt (0);
var re = /[a-z0-9]/i;

speedy.run ({
	ascii: function (){
		(code >= 48 && code <= 57) || (code >= 65 && code <= 90) ||
				(code >= 97 && code <= 122);
	},
	regexp: function (){
		re.test ("z");
	}
});

/*
File: alphanum.js

Node v0.10.18
V8 v3.14.5.9
Speedy v0.0.8

Benchmarks: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

ascii
  158,732,098 ± 0.0%
regexp
  28,797,090 ± 0.0%

Elapsed time: 6053ms (6s 53ms)
*/