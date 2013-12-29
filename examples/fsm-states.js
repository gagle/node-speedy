"use strict";

var speedy = require ("../lib");

var o1 = {};
var o2 = {};
var o3 = {};
var o = o3;

var n1 = 0;
var n2 = 1;
var n3 = 2;
var n = n3;

var s1 = "0";
var s2 = "1";
var s3 = "2";
var s = s3;

speedy.run ({
  objects: function (){
    if (o === o1){}
    else if (o === o2){}
    else{}
  },
  numbers: function (){
    if (n === n1){}
    else if (n === n2){}
    else{}
  },
  strings: function (){
    if (s === s1){}
    else if (s === s2){}
    else{}
  }
});

/*
File: fsm-states.js

Node v0.10.21
V8 v3.14.5.9
Speedy v0.1.1

Tests: 3
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~9000ms (9s 0ms)

Higher is better (ops/sec)

objects
  140,958,058 ± 0.0%
numbers
  156,758,532 ± 0.0%
strings
  130,173,592 ± 0.1%

Elapsed time: 9080ms (9s 80ms)
*/