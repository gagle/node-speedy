"use strict";

var speedy = require ("../lib");

var fn1 = function (){};
var fn2;

speedy.run ({
  noop: function (){
    //"if" does one more closure lookup
    fn1 ();
  },
  if: function (){
    if (fn2) fn2 ();
  }
});

/*
File: noop.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

noop
  171,897,675 ± 0.1%
if
  172,696,560 ± 0.0%

Elapsed time: 6147ms (6s 147ms)
*/