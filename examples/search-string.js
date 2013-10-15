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
File: search-string.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 7
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~21000ms (21s 0ms)

Higher is better (ops/sec)

exec
  10,579,829 ± 0.3%
test
  13,993,127 ± 0.0%
match
  10,173,318 ± 0.0%
search
  12,119,924 ± 0.0%
indexof
  23,026,196 ± 0.0%
match-str
  4,356,299 ± 0.0%
search-str
  12,639,951 ± 0.0%

Elapsed time: 21178ms (21s 178ms)
*/