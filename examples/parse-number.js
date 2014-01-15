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

Node v0.10.22
V8 v3.14.5.9
Speedy v0.1.1

Tests: 6
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~18000ms (18s 0ms)

Higher is better (ops/sec)

Number
  13,078,691 ± 0.0%
+
  10,973,905 ± 0.0%
~~
  11,283,532 ± 0.1%
parseInt
  18,084,790 ± 0.0%
parseFloat
  16,902,449 ± 0.0%
json
  10,656,040 ± 0.0%

Elapsed time: 18411ms (18s 411ms)
*/