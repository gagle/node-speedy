"use strict";

var speedy = require ("../lib");

speedy.run ({
  String: function (){
    String (123);
  },
  toString: function (){
    (123).toString ();
  },
  "\"\"": function (){
    123 + "";
  },
  json: function (){
    JSON.stringify (123);
  }
});

/*
File: tostring.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 4
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~12000ms (12s 0ms)

Higher is better (ops/sec)

String
  43,853,572 ± 0.0%
toString
  70,294,449 ± 0.0%
""
  108,588,313 ± 0.0%
json
  18,739,207 ± 0.1%

Elapsed time: 12293ms (12s 293ms)
*/