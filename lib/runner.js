"use strict";

var events = require ("events");
var util = require ("util");

var SAMPLES = 4;
var TIMEOUT = 1000;

//setImmediate executes in the next loop (empties the call stack), so the
//max stack limit is never reached and nextTick can be run indefinitely
//https://github.com/isaacs/node-bench/blob/master/lib/bench.js
var async = (function (){
  var i = 0;
  return function (fn){
    if (i++ < 100){
      process.nextTick (fn);
    }else{
      setImmediate (fn);
      i = 0;
    }
  }
})();

var run = function (fn, timeout, ignore, cb){
  var calls = 0;
  var startTime = Date.now ();
  var stopTime = startTime + (ignore ? timeout : 10);
  var hr = process.hrtime ();
  
  if (fn.length){
    (function cycle (){
      fn (function (){
        calls++;
        var now = Date.now ();
        if (now > stopTime){
          var diff = process.hrtime (hr);
          return cb (calls/(diff[0] + diff[1]/1e9));
        }
        async (cycle);
      });
    })();
  }else{
    (function cycle (){
      for (var i=0; i<100; i++){
        fn ();
      }
      calls++;
      var now = Date.now ();
      if (now > stopTime){
        var diff = process.hrtime (hr);
        return cb ((calls*100)/(diff[0] + diff[1]/1e9));
      }
      async (cycle);
    })();
  }
};

var Runner = module.exports = function (tests){
  events.EventEmitter.call (this);
  
  var me = this;
  
  if (typeof tests === "function"){
    this._anonymous = true;
    tests = [{ fn: tests }];
  }
  
  this._tests = tests;
  this._samples = SAMPLES;
  this._timeout = TIMEOUT;
  this._totalProgress = null;
  this._currentProgress = 0;
  
  if (this._anonymous){
    this._results = [];
  }else{
    var me = this;
    this._results = {};
    this._tests.forEach (function (test){
      me._results[test.name] = [];
    });
  }
  
  var me = this;
  process.nextTick (function (){
    me._totalProgress = me._tests.length*(me._samples - 1);
    me._prepare ();
  });
};

util.inherits (Runner, events.EventEmitter);

Runner.prototype._progress = function (){
  return ++this._currentProgress/this._totalProgress;
};

Runner.prototype._end = function (){
  var data = [];
  
  if (this._anonymous){
    data[0] = {
      raw: this._results
    };
  }else{
    for (var name in this._results){
      data.push ({
        name: name,
        raw: this._results[name]
      });
    }
  }
  
  this.emit ("end", data);
};

Runner.prototype._prepare = function (){
  //Runs all the benchmarks to warm-up the virtual machine
  var len = this._tests.length;
  var me = this;
  
  (function benchmark (i){
    if (i === len){
      return me._execute ();
    }
    
    run (me._tests[i].fn, null, null, function (n){
      benchmark (i + 1);
    });
  })(0);
};

Runner.prototype._execute = function (){
  var me = this;
  var testsLength = me._tests.length;
  
  (function benchmark (i){
    if (i === testsLength){
      return me._end ();
    }
    
    (function sample (s){
      if (s === me._samples){
        var o = {};
        var test = me._tests[i];
        
        if (me._anonymous){
          o.raw = me._results;
        }else{
          o.name = test.name;
          o.raw = me._results[test.name];
        }
        
        me.emit ("test", o);
        return benchmark (i + 1);
      }
      
      var test = me._tests[i];
      run (test.fn, me._timeout, s, function (n){
        //The first run is ignored because produces inconsistent values
        //Virtual machine warm-up stuff
        if (s){
          me.emit ("progress", me._progress ());
          
          if (me._anonymous){
            me._results.push (n);
          }else{
            me._results[test.name].push (n);
          }
        }
        
        sample (s + 1);
      });
    })(0);
  })(0);
};

Runner.prototype.samples = function (n){
  if (n === undefined) return this._samples - 1;
  this._samples = n + 1;
};

Runner.prototype.timeout = function (n){
  if (n === undefined) return this._timeout;
  this._timeout = n;
};