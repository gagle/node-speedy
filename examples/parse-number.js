"use strict";

var speedy = require ("../lib");

speedy.run ({
  Number: function (){
    Number ("1.1");
  },
  "+": function (){
    +"1.1";
  },
  "~~": function (){
    //It's the same as "+" but it also crops the decimal part and returns a 0 if
    //it's not a numeric string, so if you need to sanitize a number, this is
    //the best way
    ~~"1.1";
  },
  "|": function (){
    //Same as ~~
    "1.1"|0;
  },
  parseInt: function (){
    //It's not the same as Number but shares some similarities
    parseInt ("1.1");
  },
  parseFloat: function (){
    //It's not the same as Number but shares some similarities
    parseFloat ("1.1");
  },
  json: function (){
    JSON.parse ("1.1");
  }
});

/*
File: parse-number.js

Node v0.10.24
V8 v3.14.5.9
Speedy v0.1.1

Tests: 7
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~21000ms (21s 0ms)

Higher is better (ops/sec)

Number
  12,891,656 ± 0.1%
+
  10,929,749 ± 0.0%
~~
  11,250,825 ± 0.1%
|
  11,200,030 ± 0.0%
parseInt
  18,031,903 ± 0.0%
parseFloat
  16,969,334 ± 0.0%
json
  10,750,916 ± 0.0%

Elapsed time: 21179ms (21s 179ms)
*/