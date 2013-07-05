speedy
======

_Node.js project_

#### Tiny benchmark utility ####

Version: 0.0.2

Performs a benchmark of almost any test case.

It's basically the Isaac Z. Schlueter's [node-bench](https://github.com/isaacs/node-bench) project revisited and rewritten from scratch.

If you need to benchmark some sort of code or if you are writting a module and want to see how well it performs in comparison with older versions, you can use `speedy`. For serious benchmarking use other tools more accurate and exact. `speedy` is intended for rapid prototyping and informal benchmarks.

This module doesn't check for errors because using domains the benchmark ends up with inconsistent results. Make sure your code doesn't break before running the benchmark.

Also, a recursive loop is used to measure the speed of the code. There are basically 2 ways to make a recursive loop: `nextTick` and `setImmediate`. `nextTick` cannot loop indefinitely because it has a maximum call stack limit (`process.maxTickDepth`) and `setImmediate` is slower than `nextTick` (see `examples/nexttick-vs-setimmediate-vs-setTimeout.js`) and produces inconsistent benchmark results. The solution is to use an hybrid approach (found in the [node-bench](https://github.com/isaacs/node-bench) source code):

```javascript
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

async (function (){
	//Asynchronous code
});
```

This worked for me and produces consistent benchmark results. But it has a problem. Cannot execute codes that make an excessive use of nextTick in a recursive way.

#### Installation ####

```
npm install speedy
```

#### Example ####

```javascript
var speedy = require ("../lib");

speedy.run ({
  "literal": function (){
		return {};
	},
	"constructor": function (){
		return new Object ();
	},
	"create": function (){
		return Object.create (Object.prototype);
	}
});

/*
File: object-creation.js

Node v0.10.12
V8 v3.14.5.9

Benchmarks: 3
Amplifier: 100
Time per test: 1000ms (1s 0ms)
Runs per test: 3 (+1)
Total time per test: ~4000ms (4s 0ms)
Total benchmark time: ~12000ms (12s 0ms)

Higher is better

literal
  142634.785
constructor
  36133.003
create
  8014.257

Benchmark finished
*/
```

#### Amplifier or timeout. Which one to use? ####

The amplifier increases the result value without varying the time execution but the accuracy decreases with very high amplification factors.
The timeout increases the result value but "can" become inconsistent with very high execution times and other cpu consuming programs running at the same time.

In practice, because the time is a priority for rapid prototyping, the amplifier is more appropriate.

#### Functions ####

- [_module_.amplifier([n]) : undefined | Number](#amplifier)
- [_module_.run([name][, fn][, callback]) : undefined](#run)
- [_module_.runs([n]) : undefined | Number](#runs)
- [_module_.timeout([n]) : undefined | Number](#timeout)

#### Descriptions ####

<a name="amplifier"></a>
___module_.amplifier([n]) : undefined | Number__  
Changes or returns the amplification factor of the result. The higher is this value the higher is the benchmark result. Very high amplification values decrease the benchmark precision. Default is 100.

Increment the value if the benchmark returns a number near 0.

```javascript
speedy.amplifier (200);
```

---

<a name="run"></a>
___module_.run([name][, fn][, callback]) : undefined__  
Executes the benchmark. If a `callback` is passed the raw data will be returned as a parameter and nothing will be printed in the stdout.

The returned value is an array, each index stores the result of each test, an object with a `raw` property storing an array with all the results and a `name` property storing the name of the test, if any. For example, a baseline benchmark with default attributes (amplifier 100, runs 3, timeout 1000):

```javascript
speedy.run (function fn (){}, function (data){
	console.log (data);
	
	/*
	[{
    name: "fn",
    raw: [217620.69306930693, 218626.13861386137, 218811.48514851485]
	}]
	*/
});
```

__Asynchronous benchmarking__

Simply execute the callback when you are ready to iterate again.

```javascript
speedy.run (function (done){
	//...
	done ();
});
```

__Ways to run the benchmark and its results__

Anonymous function:

```javascript
speedy.run (function (){});

/*
<value>
*/
```

Named function:

```javascript
speedy.run (function fn (){});

/*
fn
  <value>
*/
```

Using the name parameter:

```javascript
speedy.run ("fn", function (){});

/*
fn
  <value>
*/
```

Batch:

```javascript
speedy.run ({
	a: function (){},
	b: function (){},
	c: function (){}
});

/*
a
  <value>
b
  <value>
c
  <value>
*/
```

---

<a name="runs"></a>
___module_.runs([n]) : undefined | Number__  
Changes or returns the number of runs per test. With more runs the final result will be more stable an exact. An arithmetic mean is applied to all of the results. Default is 3.

The first run is always ignored because produces inconsistent values due the virtual machine warm-up stuff. So if you set 3 runs, 4 runs will be executed.

```javascript
speedy.runs (10);
```

---

<a name="timeout"></a>
___module_.timeout([n]) : undefined | Number__  
Changes or returns the execution time per test. Higher values don't imply more exact results because in larger periods of time there are more probabilities of cpu usage changes. The higher is this value the higher will be the result.

```javascript
speedy.timeout (100);
```