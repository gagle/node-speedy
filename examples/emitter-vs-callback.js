"use strict";

var events = require ("events");
var util = require ("util");
var speedy = require ("../lib");

var Emitter = function (){
	events.EventEmitter.call (this);
};

util.inherits (Emitter, events.EventEmitter);

Emitter.prototype.ping = function (){
	this.emit ("ping");
};

var emitter = new Emitter ();
emitter.on ("ping", function (){
	 this._done ();
});

var Callback = function (){};

Callback.prototype.ping = function (){
	this._done ();
};

var callback = new Callback ();

speedy.run ({
	emitter: function (done){
		emitter._done = done;
		emitter.ping ();
	},
	callback: function (done){
		callback._done = done;
		callback.ping ();
	}
});

/*
File: emitter-vs-callback.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

emitter
  684,655 ± 0.4%
callback
  5,535,242 ± 0.0%

Elapsed time: 6053ms (6s 53ms)
*/