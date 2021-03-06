"use strict";

var speedy = require ("../lib");

speedy.run ({
  nextTick: function (done){
    process.nextTick (done);
  },
  setImmediate: function (done){
    setImmediate (done);
  },
  setTimeout: function (done){
    setTimeout (done, 0);
  }
});

/*
File: nexttick-vs-setimmediate-vs-setTimeout.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 3
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~9000ms (9s 0ms)

Higher is better (ops/sec)

nextTick
  4,060,465 ± 0.1%
setImmediate
  413,734 ± 0.1%
setTimeout
  64 ± 0.1%

Elapsed time: 9220ms (9s 220ms)
*/