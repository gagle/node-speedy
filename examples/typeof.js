"use strict";

var speedy = require ("../lib");

var s = "string";

//1 closure lookup and 1 variable definition per test

speedy.run ({
  cache: function (){
    var type = typeof s;
    type === "number";
    type === "string";
  },
  "no-cache": function (){
    var str = s;
    typeof str === "number";
    typeof str === "string";
  }
});

/*
File: typeof.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.1

Tests: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

cache
  82,518,276 ± 0.0%
no-cache
  148,560,774 ± 0.0%

Elapsed time: 6054ms (6s 54ms)
*/