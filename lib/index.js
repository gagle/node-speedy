"use strict";

var Runner = require ("./runner");

var amplifier = 0;
var runs = 0;
var timeout = 0;

var running;
var runner;

var millisToHuman = function (t){
	var m = ~~(t/60000);
	var s = ~~(t/1000)%60;
	var ms = t%1000;
	return (m ? m + "m " : "") + s + "s " + ms + "ms";
};

var mean = function (array){
	var m = 0;
	array.forEach (function (n){
		m += n;
	});
	return (m/array.length).toFixed (3);
};

module.exports.run = function (name, fn, cb){
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
		cb = fn;
	}else if (type === "object"){
		cb = fn;
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
	
	runner = new Runner (anonymous || tests)
			.on ("end", function (results){
				if (cb) return cb (results);
				
				process.stdout.write ("\u001b[33m");
				
				results.forEach (function (test){
					if (test.name){
						console.log (test.name);
						console.log (" ", mean (test.raw));
					}else{
						console.log (mean (test.raw));
					}
				});
				
				console.log ("\u001b[32m\nBenchmark finished\u001b[0m");
			});
	
	runner.amplifier (amplifier);
	runner.runs (runs);
	runner.timeout (timeout);
	
	var testTime = runner.timeout ()*runner.runs ();
	var totalTime = testTime*tests.length;
	
	if (!cb){
		process.stdout.write ("\u001b[36mNode " + process.version + "\n" +
				"V8 v" + process.versions.v8 + "\n\n" +
				"Benchmarks: " + tests.length + "\n" +
				"Amplifier: " + runner.amplifier () + "\n" +
				"Time per test: " + runner.timeout () + "ms (" +
				millisToHuman (runner.timeout ()) + ")\n" +
				"Runs per test: " + (runner.runs () - 1) + " (+1)\n" +
				"Total time per test: " + testTime + "ms (" +
				millisToHuman (testTime) + ")\n" +
				"Total benchmark time: " + totalTime + "ms (" +
				millisToHuman (totalTime) + ")\n\n" +
				"Higher is better\n\n\u001b[0m");
	}
};

module.exports.amplifier = function (n){
	if (running) throw new Error ("Benchmark is already running");
	if (runner){
		runner.amplifier (n);
	}else{
		amplifier = n;
	}
};

module.exports.runs = function (n){
	if (running) throw new Error ("Benchmark is already running");
	if (runner){
		runner.runs (n);
	}else{
		runs = n;
	}
};

module.exports.timeout = function (n){
	if (running) throw new Error ("Benchmark is already running");
	if (runner){
		runner.timeout (n);
	}else{
		timeout = n;
	}
};