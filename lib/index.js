"use strict";

var path = require ("path");
var pkg = require ("../package.json");
var Runner = require ("./runner");

var samples = 0;
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
	var s = ~~(m/array.length) + "";
	var out = [];
	for (var i=s.length-1, j=1; i>=0; i--, j++){
		out.unshift (s[i]);
		if (i && !(j%3)) out.unshift (",");
	}
	return out.join ("");
};

module.exports.run = function (name, fn, cb){
	if (running) throw new Error ("Benchmark is already running");
	
	var start = Date.now ();
	
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
						console.log ("\u001b[33m" + test.name);
						console.log ("  \u001b[37m" + mean (test.raw));
					}else{
						console.log (mean (test.raw));
					}
				});
				
				var elapsed = Date.now () - start;
				
				process.stdout.write ("\n\u001b[36mElapsed time: " + elapsed + "ms (" +
						millisToHuman (elapsed) + ")\u001b[0m");
			});
	
	runner.samples (samples);
	runner.timeout (timeout);
	
	var testTime = runner.timeout ()*runner.samples ();
	var totalTime = testTime*(tests.length || 1);
	
	if (!cb){
		process.stdout.write ("\u001b[36mFile: " +
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
				"Higher is better (ops/sec)\n\n\u001b[0m");
	}
};

module.exports.samples = function (n){
	if (running) throw new Error ("Benchmark is already running");
	if (runner){
		runner.samples (n);
	}else{
		samples = n;
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