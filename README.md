speedy
======

_Node.js project_

#### Tiny benchmark utility ####

Version: 0.0.4

Performs a benchmark of almost any test case.

It's basically the Isaac Z. Schlueter's [node-bench](https://github.com/isaacs/node-bench) project revisited: rewritten from scratch and improved.

If you need to benchmark some sort of code or if you are writting a module and want to see how well it performs in comparison with older versions, you can use `speedy`. It is for rapid prototyping and informal benchmarks, don't use it for serious jobs.

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

This worked for me and produces consistent benchmark results. But it has a problem. Cannot execute codes that make an excessive use of nextTick in a recursive way because the `process.maxTickDepth` limit can be reached. In Node.js v0.12 this limit will be removed.

#### Installation ####

```
npm install speedy
```

#### Functions ####

- [_module_.run([name][, fn][, callback]) : undefined](#run)
- [_module_.samples([n]) : undefined | Number](#samples)
- [_module_.timeout([n]) : undefined | Number](#timeout)

---

<a name="run"></a>
___module_.run([name][, fn][, callback]) : undefined__  
Executes the benchmark. If a `callback` is passed the raw data will be returned as a parameter and nothing will be printed in the stdout.

The returned value is an array, each index stores the result of each test; an object with a `raw` property storing an array with all the results and a `name` property storing the name of the test, if any. For example, a baseline benchmark with default attributes (samples 3, timeout 1000):

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

<a name="samples"></a>
___module_.samples([n]) : undefined | Number__  
Changes or returns the number of samples per test. With more samples the final result will be more stable. An arithmetic mean is calculated with all the samples. Default is 3.


```javascript
speedy.samples (10);
```

---

<a name="timeout"></a>
___module_.timeout([n]) : undefined | Number__  
Changes or returns the execution time per test, in milliseconds. Higher values tend to imply more precise results. Default is 1000.

```javascript
speedy.timeout (2000);
```