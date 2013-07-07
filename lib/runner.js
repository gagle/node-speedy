"use strict";

var events = require ("events");
var util = require ("util");

var RUNS = 4;
var TIMEOUT = 1000;
var MULTIPLIER = 1;

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

var run = function (fn, timeout, multiplier, r, cb){
  var calls = 0;
	var startTime = Date.now ();
	var stopTime = startTime + (r?timeout:10);
	
	if (fn.length){
		(function cycle (){
			fn (function (){
				calls++;
				var now = Date.now ();
				if (now > stopTime){
					return cb ((calls*multiplier*100)/(now - startTime));
				}
				async (cycle);
			});
		})();
	}else{
		(function cycle (){
			for (var i=100; i--;){
				fn ();
			}
			calls++;
			var now = Date.now ();
			if (now > stopTime){
				return cb ((calls*multiplier*100)/(now - startTime));
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
	this._runs = RUNS;
	this._timeout = TIMEOUT;
	this._multiplier = MULTIPLIER;
	
	//Create arrays for storing the raw data
	if (this._anonymous){
		this._results = [];
	}else{
		var me = this;
		this._results = {};
		this._tests.forEach (function (test){
			me._results[test.name] = [];
		});
	}
	
	process.nextTick (function (){
		me._execute ();
	});
};

util.inherits (Runner, events.EventEmitter);

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

Runner.prototype._execute = function (){
	var me = this;
	
	(function repeat (r){
		if (r === me._runs) return me._end ();
		
		var testsLength = me._tests.length;
		
		(function benchmark (i){
			if (i !== testsLength){
				var test = me._tests[i];
				run (test.fn, me._timeout, me._multiplier, r, function (n){
					//The first run is ignored because produces inconsistent values
					//Virtual machine warm-up stuff
					if (r){
						if (me._anonymous){
							me._results.push (n);
						}else{
							me._results[test.name].push (n);
						}
					}
					
					setImmediate (function (){
						benchmark (i + 1);
					});
				});
			}else{
				setImmediate (function (){
					repeat (r + 1);
				});
			}
		})(0);
	})(0);
};

Runner.prototype.multiplier = function (n){
	if (n === undefined) return this._multiplier;
	if (n < 1) return;
	this._multiplier = n;
};

Runner.prototype.runs = function (n){
	if (n === undefined) return this._runs - 1;
	if (n < 1) return;
	this._runs = n + 1;
};

Runner.prototype.timeout = function (n){
	if (n === undefined) return this._timeout;
	if (n < 1) return;
	this._timeout = n;
};