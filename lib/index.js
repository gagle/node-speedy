"use strict";

var events = require ("events");
var util = require ("util");
var path = require ("path");
var pkg = require ("../package.json");
var Runner = require ("./runner");
var SpeedyError = require ("./error");

var millisToHuman = function (t){
	var m = ~~(t/60000);
	var s = ~~(t/1000)%60;
	var ms = t%1000;
	return (m ? m + "m " : "") + s + "s " + ms + "ms";
};

var comma = function (n){
	n += "";
	var out = [];
	for (var i=n.length-1, j=1; i>=0; i--, j++){
		out.unshift (n[i]);
		if (i && !(j%3)) out.unshift (",");
	}
	return out.join ("");
};

var zero = function (n){
	return (n + "").indexOf (".") === -1 ? n + ".0" : n;
};

var mean = function (array){
	var m = 0;
	array.forEach (function (n){
		m += n;
	});
	return ~~(m/array.length);
};

var stdDeviation = function (array, mean){
	var n = 0;
	array.forEach (function (sample){
		var t = sample - mean;
		n += t*t;
	});
	return Math.sqrt (n/(array.length - 1));
};

var stdError = function (array, mean){
	return ~~(1000*(stdDeviation (array, mean)/Math.sqrt (array.length))/mean)/10;
};

var statistics = function (array){
	var m = mean (array);
	var e = stdError (array, m);
	
	return {
		mean: m,
		error: e
	};
};

var Speedy = function (){
	events.EventEmitter.call (this);
	this._samples = 0;
	this._timeout = 0;
	this._running = false;
};

util.inherits (Speedy, events.EventEmitter);

Speedy.prototype.run = function (name, fn, options){
	if (this._running) throw new SpeedyError ("Benchmark is already running");
	this._running = true;
	
	var tests = [];
	var anonymous;
	
	var type = typeof name;
	if (type === "string"){
		tests.push ({ name: name, fn: fn });
	}else if (type === "function"){
		if (name.name){
			tests.push ({ name: name.name, fn: name });
		}else{
			anonymous = name;
		}
		options = fn;
	}else if (type === "object"){
		options = fn;
		if (Array.isArray (name)){
			for (var i=0, ii=name.length; i<ii; i++){
				tests.push ({ name: i + "", fn: name[i] });
			}
		}else{
			for (var t in name){
				tests.push ({ name: t, fn: name[t] });
			}
		}
	}
	
	if (!anonymous && !tests.length){
		throw new SpeedyError ("No tests to benchmark");
	}
	
	options = options || {};
	
	if (options.output === undefined){
		options.output = process.stdout;
	}
	
	var start = Date.now ();
	var con = options.output === process.stdout;
	
	var ansi = function (s){
		return con ? s : "";
	};
	
	var me = this;
	
	var runner = new Runner (anonymous || tests)
			.on ("progress", function (progress){
				me.emit ("progress", progress);
			})
			.on ("test", function (test){
				if (options.output){
					var s = statistics (test.raw);
					var spaces = "";
					if (test.name){
						spaces = "  ";
						options.output.write (ansi ("\u001b[33m") + test.name + "\n");
					}
					options.output.write (spaces + ansi ("\u001b[37m") + comma (s.mean) +
							" ± " + zero (s.error) + "%" + ansi ("\u001b[0m") + "\n");
				}
						
				me.emit ("test", test);
			})
			.on ("end", function (results){
				if (options.output){
					var elapsed = Date.now () - start;
					
					options.output.write ("\n" + ansi ("\u001b[36m") +
							"Elapsed time: " + elapsed + "ms (" + millisToHuman (elapsed) +
							")" + ansi ("\u001b[0m") + "\n");
				}
				
				me._running = false;
				me.emit ("end", results);
			});
	
	if (this._samples > 0) runner.samples (this._samples);
	if (this._timeout > 0) runner.timeout (this._timeout);
	
	if (options.output){
		var testTime = runner.timeout ()*runner.samples ();
		var totalTime = testTime*(tests.length || 1);
		
		options.output.write (ansi ("\u001b[36m") + "File: " +
				path.basename (process.mainModule.filename) + "\n\n" +
				"Node " + process.version + "\n" +
				"V8 v" + process.versions.v8 + "\n" +
				"Speedy v" + pkg.version + "\n\n" +
				"Tests: " + (tests.length || 1) + "\n" +
				"Timeout: " + runner.timeout () + "ms (" +
				millisToHuman (runner.timeout ()) + ")\n" +
				"Samples: " + (runner.samples ()) + "\n" +
				"Total time per test: ~" + testTime + "ms (" +
				millisToHuman (testTime) + ")\n" +
				"Total time: ~" + totalTime + "ms (" +
				millisToHuman (totalTime) + ")\n\n" +
				"Higher is better (ops/sec)\n\n" + ansi ("\u001b[0m"));
	}
	
	return this;
};

Speedy.prototype.samples = function (samples){
	this._samples = samples;
};

Speedy.prototype.timeout = function (timeout){
	this._timeout = timeout;
};

module.exports = new Speedy ();