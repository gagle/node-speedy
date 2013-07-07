speedy
======

_Node.js project_

#### Tiny benchmark utility ####

Version: 0.0.3

Performs a benchmark of almost any test case.

It's basically the Isaac Z. Schlueter's [node-bench](https://github.com/isaacs/node-bench) project revisited and rewritten from scratch.

If you need to benchmark some sort of code or if you are writting a module and want to see how well it performs in comparison with older versions, you can use `speedy`. It is intended for rapid prototyping and informal benchmarks, don't use it for serious benchmarkings.

This module doesn't check for errors so make sure your code doesn't break before running the benchmark.

Also, a recursive loop is used to measure the speed of the code. There are basically 2 ways to make a recursive loop: `nextTick` and `setImmediate`. `nextTick` cannot loop indefinitely because it has a maximum call stack limit (`process.maxTickDepth`) and `setImmediate` is slower than `nextTick` (see [examples/nexttick-vs-setimmediate-vs-setTimeout.js](https://github.com/gagle/node-speedy/blob/master/examples/nexttick-vs-setimmediate-vs-setTimeout.js)) and produces inconsistent benchmark results. The solution is to use an hybrid approach (found in the [node-bench](https://github.com/isaacs/node-bench) source code):

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
Multiplier: 1
Time per test: 1000ms (1s 0ms)
Runs per test: 3
Total time per test: ~3000ms (3s 0ms)
Total benchmark time: ~9000ms (9s 0ms)

Higher is better

literal
  143,489
constructor
  36,410
create
  8,024

Elapsed time: 9151ms (9s 151ms)
*/
```

#### Functions ####

- [_module_.multiplier([n]) : undefined | Number](#multiplier)
- [_module_.run([name][, fn][, callback]) : undefined](#run)
- [_module_.runs([n]) : undefined | Number](#runs)
- [_module_.timeout([n]) : undefined | Number](#timeout)

#### Descriptions ####

<a name="multiplier"></a>
___module_.multiplier([n]) : undefined | Number__  
Changes or returns the multiplier factor. The higher is this value the higher is the benchmark result. Default is 1.

```javascript
speedy.multiplier (1.5);
```

---

<a name="run"></a>
___module_.run([name][, fn][, callback]) : undefined__  
Executes the benchmark. If a `callback` is passed the raw data will be returned as a parameter and nothing will be printed in the stdout.

The returned value is an array, each index stores the result of each test; an object with a `raw` property storing an array with all the results and a `name` property storing the name of the test, if any. For example, a baseline benchmark with default attributes (multiplier 1, runs 3, timeout 1000):

```javascript
speedy.run (function fn (){}, function (data){
	console.log (data);
	
	/*
	[{
    name: "fn",
    raw: [ 230293.006993007, 229975.82417582418, 230152.44755244756 ]
	}]
	*/
});
```

__Asynchronous benchmarking__

Simply execute the callback when you are ready to iterate again. The asynchronous benchmarking is a little less precise than the synchronous version.

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


```javascript
speedy.runs (10);
```

---

<a name="timeout"></a>
___module_.timeout([n]) : undefined | Number__  
Changes or returns the execution time in milliseconds per test. Higher values tend to imply more precise results. Default is 1000.

```javascript
speedy.timeout (2000);
```