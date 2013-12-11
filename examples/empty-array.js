"use strict";

var speedy = require ("../lib");

speedy.run ({
  new: function (){
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    arr = [];
  },
  length: function (){
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    arr.length = 0;
  }
});

/*
File: empty-array.js

Node v0.10.22
V8 v3.14.5.9
Speedy v0.1.1

Tests: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

new
  196,498,961 ± 0.0%
length
  17,941,559 ± 0.1%

Elapsed time: 6131ms (6s 131ms)
*/