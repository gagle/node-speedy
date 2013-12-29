"use strict";

var speedy = require ("../lib");

var fn = function (a, b, c){
  this._a = a;
  this._b = b;
  this._c = c;
};

//1 closure lookup per test, otherwise apply will create a new array every time
var arr = [1, 2, 3];
var n = 1;

speedy.run ({
  call: function (){
    fn.call ({}, n, 2, 3);
  },
  apply: function (){
    fn.apply ({}, arr);
  }
});

/*
File: call-vs-apply.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

call
  19,160,967 ± 0.4%
apply
  13,384,675 ± 0.3%

Elapsed time: 6054ms (6s 54ms)
*/