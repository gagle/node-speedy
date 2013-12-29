"use strict";

var speedy = require ("../lib");

speedy.run ({
  "+": function (){
    var a = "";
    for (var i=0; i<1000; i++){
      a += "c";
    }
  },
  join: function (){
    var arr = [];
    for (var i=0; i<1000; i++){
      arr.push ("c");
    }
    arr.join ("");
  },
  concat: function (){
    var a = "";
    for (var i=0; i<1000; i++){
      a = a.concat ("c");
    }
  }
});

/*
File: string-concatenation.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 3
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~9000ms (9s 0ms)

Higher is better (ops/sec)

+
  148,679 ± 0.8%
join
  138,298 ± 0.0%
concat
  60,392 ± 0.0%

Elapsed time: 9081ms (9s 81ms)
*/