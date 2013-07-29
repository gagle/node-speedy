"use strict";

var speedy = require ("../lib");

speedy.run ({
	exec: function (){
		/abc/.exec ("xxxabcxxxabcxxx") !== null;
	},
	test: function (){
		/abc/.test ("xxxabcxxxabcxxx") !== false;
	},
	match: function (){
		"xxxabcxxxabcxxx".match (/abc/) !== null;
	},
	search: function (){
		"xxxabcxxxabcxxx".search (/abc/) !== -1;
	},
	indexof: function (){
		"xxxabcxxxabcxxx".indexOf ("abc") !== -1;
	},
	"match-str": function (){
		"xxxabcxxxabcxxx".match ("abc") !== null;
	},
	"search-str": function (){
		"xxxabcxxxabcxxx".search ("abc") !== -1;
	}
});

/*
Node v0.10.15
V8 v3.14.5.9
Speedy v0.0.8

Benchmarks: 7
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~21000ms (21s 0ms)

Higher is better (ops/sec)

exec
  10,508,332 ± 0.4%
test
  13,756,109 ± 0.0%
match
  10,006,580 ± 0.0%
search
  12,152,751 ± 0.0%
indexof
  23,029,848 ± 0.0%
match-str
  4,547,185 ± 0.0%
search-str
  12,479,392 ± 0.0%

Elapsed time: 21513ms (21s 513ms)
*/