"use strict";

var events = require ("events");
var util = require ("util");
var speedy = require ("../lib");

var EmitterOn = function (){
  events.EventEmitter.call (this);
};

util.inherits (EmitterOn, events.EventEmitter);

EmitterOn.prototype.ping = function (){
  this.emit ("ping");
};

var emitterOn = new EmitterOn ()
    .on ("ping", function (){
      this._done ();
    });

var EmitterOnce = function (){
  events.EventEmitter.call (this);
};

util.inherits (EmitterOnce, events.EventEmitter);

EmitterOnce.prototype.ping = function (){
  this.emit ("ping");
};

var emitterOnce = new EmitterOnce ();

var Callback = function (){};

Callback.prototype.ping = function (){
  this._done ();
};

var callback = new Callback ();

speedy.run ({
  "emitter-on": function (done){
    emitterOn._done = done;
    emitterOn.ping ();
  },
  "emitter-once": function (done){
    emitterOnce.once ("ping", done);
    emitterOnce.ping ();
  },
  callback: function (done){
    callback._done = done;
    callback.ping ();
  }
});

/*
When an event is emitted it loops through all the handlers, that's why is a
little slower.

on() is also a way more inconsistent compared with callbacks, don't ask why.
once() performs a "delete", that's why it is a lot more slower.
*/

/*
File: emitter-vs-callback.js

Node v0.10.20
V8 v3.14.5.9
Speedy v0.1.0

Tests: 3
Timeout: 1000ms (1s 0ms)
Samples: 3
Total time per test: ~3000ms (3s 0ms)
Total time: ~9000ms (9s 0ms)

Higher is better (ops/sec)

emitter-on
  4,282,478 ± 10.4%
emitter-once
  672,740 ± 0.2%
callback
  5,762,500 ± 0.1%

Elapsed time: 9078ms (9s 78ms)
*/