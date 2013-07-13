"use strict";

var events = require ("events");
var path = require ("path");
var pkg = require ("../package.json");
var Runner = require ("./runner");

var samples = 0;
var timeout = 0;
var running;

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

module.exports.run = function (name, fn, settings){
	if (running) throw new Error ("Benchmark is already running");
	running = true;
	
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
		settings = fn;
	}else if (type === "object"){
		settings = fn;
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
	
	if (!anonymous && !tests.length) throw new Error ("No tests to benchmark");
	
	settings = settings || {};
	
	if (!("output" in settings)){
		settings.output = process.stdout;
	}
	
	var start = Date.now ();
	var con = settings.output === process.stdout;
	var emitter = new events.EventEmitter ();
	
	var ansi = function (s){
		return con ? s : "";
	};
	
	var runner = new Runner (anonymous || tests)
			.on ("progress", function (progress){
				emitter.emit ("progress", progress);
			})
			.on ("function", function (test){
				if (settings.output){
					var s = statistics (test.raw);
					var spaces = "";
					if (test.name){
						spaces = "  ";
						settings.output.write (ansi ("\u001b[33m") + test.name + "\n");
					}
					settings.output.write (spaces + ansi ("\u001b[37m") + comma (s.mean) +
							" ± " + zero (s.error) + "%" + ansi ("\u001b[0m") + "\n");
				}
						
				emitter.emit ("function", test);
			})
			.on ("end", function (results){
				if (settings.output){
					var elapsed = Date.now () - start;
					
					settings.output.write ("\n" + ansi ("\u001b[36m") +
							"Elapsed time: " + elapsed + "ms (" + millisToHuman (elapsed) +
							")" + ansi ("\u001b[0m"));
				}
						
				emitter.emit ("end", results);
			});
	
	runner.samples (samples);
	runner.timeout (timeout);
	
	if (settings.output){
		var testTime = runner.timeout ()*runner.samples ();
		var totalTime = testTime*(tests.length || 1);
		
		settings.output.write (ansi ("\u001b[36m") + "File: " +
				path.basename (process.mainModule.filename) + "\n\n" +
				"Node " + process.version + "\n" +
				"V8 v" + process.versions.v8 + "\n" +
				"Speedy v" + pkg.version + "\n\n" +
				"Benchmarks: " + (tests.length || 1) + "\n" +
				"Timeout: " + runner.timeout () + "ms (" +
				millisToHuman (runner.timeout ()) + ")\n" +
				"Samples: " + (runner.samples ()) + "\n" +
				"Total time per test: ~" + testTime + "ms (" +
				millisToHuman (testTime) + ")\n" +
				"Total benchmark time: ~" + totalTime + "ms (" +
				millisToHuman (totalTime) + ")\n\n" +
				"Higher is better (ops/sec)\n\n" + ansi ("\u001b[0m"));
	}
			
	return emitter;
};

module.exports.samples = function (n){
	samples = n;
};

module.exports.timeout = function (n){
	timeout = n;
};