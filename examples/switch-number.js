"use strict";

var speedy = require ("../lib");

var n = 6;

speedy.run ({
  "switch": function (){
    switch (n){
      case 0: break;
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: break;
      case 5: break;
      case 6: break;
    }
  },
  "if-else": function (){
    if (n === 0){}
    else if (n === 1){}
    else if (n === 2){}
    else if (n === 3){}
    else if (n === 4){}
    else if (n === 5){}
    else if (n === 6){}
  }
});

/*
File: switch-number.js

Node v0.10.21
V8 v3.14.5.9
Speedy v0.1.1

Tests: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

switch
  148,173,246 ± 0.0%
if-else
  152,684,970 ± 0.0%

Elapsed time: 6053ms (6s 53ms)
*/