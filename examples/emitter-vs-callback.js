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

var Callback = function (){};

Callback.prototype.once = function (ping){
	this._ping = ping;
};

Callback.prototype.ping = function (){
	this._ping ();
};

var emitter = new Emitter ();
var callback = new Callback ();

speedy.run ({
	emitter: function (done){
		emitter.once ("ping", done);
		emitter.ping ();
	},
	callback: function (done){
		callback.once (done);
		callback.ping ();
	}
});

//EventEmitters produces higher standard error values, typically above 1%, and
//are quite inconsistent

/*
File: emitter-vs-callback.js

Node v0.10.13
V8 v3.14.5.9
Speedy v0.0.8

Benchmarks: 2
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per benchmark: ~3000ms (3s 0ms)
Total time: ~6000ms (6s 0ms)

Higher is better (ops/sec)

emitter
  1,942,550 ± 1.1%
callback
  5,639,449 ± 0.0%

Elapsed time: 6054ms (6s 54ms)
*/