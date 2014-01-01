"use strict";

var speedy = require ("../lib");

speedy.run ({
  concat: function (){
    var a = [1, 2, 3, 4, 5];
    var b = [6, 7, 8, 9, 10];
    a = a.concat (b);
  },
  push: function (){
    var a = [1, 2, 3, 4, 5];
    var b = [6, 7, 8, 9, 10];
    for (var i=0; i<b.length; i++){
      a.push (b[i]);
    }
  }
});

/*
File: array-concat-vs-push.js

Node v0.10.22
V8 v3.14.5.9
Speedy v0.1.1

Tests: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

concat
  11,413,991 ± 0.0%
push
  9,960,090 ± 0.1%

Elapsed time: 6147ms (6s 147ms)
*/