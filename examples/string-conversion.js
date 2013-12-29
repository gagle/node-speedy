"use strict";

var speedy = require ("../lib");

var cast1 = function (value){
  if (value === "undefined") return undefined;
  if (value === "null") return null;
  if (value === "true") return true;
  if (value === "false") return false;
  var v = Number (value);
  return isNaN (v) ? value : v;
};

var cast2 = function (value){
  var v = Number (value);
  return !isNaN(v) ? v : 
      value === "undefined" ? undefined
      : value === "null" ? null
      : value === "true" ? true
      : value === "false" ? false
      : value;
}

var cast3 = function (value){
  try{
    return (new Function ("return " + value + ";"))();
  }catch (e){
    return value;
  }
};

var cast4 = function (value){
  if (value === "undefined") return undefined;
  try{
    return JSON.parse (value);
  }catch (e){
    return value;
  }
};

var fn = function (cast){
  cast ("undefined");
  cast ("null");
  cast ("true");
  cast ("false");
  cast ("12");
  cast ("12.34");
  cast ("asd");
};

speedy.run ({
  "cast 1": function (){
    fn (cast1);
  },
  "cast 2": function (){
    fn (cast2);
  },
  "cast 3": function (){
    fn (cast3);
  },
  "cast 4": function (){
    fn (cast4);
  }
});

/*
File: string-conversion.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 4
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~12000ms (12s 0ms)

Higher is better (ops/sec)

cast 1
  6,267,986 ± 0.3%
cast 2
  3,328,173 ± 0.0%
cast 3
  59,331 ± 0.0%
cast 4
  88,774 ± 0.1%

Elapsed time: 12114ms (12s 114ms)
*/