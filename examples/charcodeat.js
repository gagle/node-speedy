"use strict";

var speedy = require ("../lib");

var s = "abcdefghijklmnopqrstuvwxyz";

speedy.run ({
  "char": function (){
    var c;
    for (var i=0, ii=s.length; i<ii; i++){
      c = s[i];
      c.charCodeAt (0);
    }
  },
  "string": function (){
    var c;
    for (var i=0, ii=s.length; i<ii; i++){
      c = s[i];
      s.charCodeAt (i);
    }
  }
});

/*
File: charcodeat.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

char
  7,333,696 ± 0.1%
string
  13,264,620 ± 0.0%

Elapsed time: 6055ms (6s 55ms)
*/