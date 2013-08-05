speedy
======

_Node.js project_

#### Tiny benchmark utility ####

Version: 0.0.8

If you need to benchmark some sort of code or if you are writing a module and want to see how well it performs in comparison with older versions, you can use `speedy`. It is for rapid prototyping and informal benchmarks, don't use it for serious jobs like HTTP server benchmarking.

This module doesn't check for errors so make sure your code doesn't break before running the benchmark.

A recursive loop is used to measure the speed of the code. There are basically 2 ways to make a recursive loop: `nextTick` and `setImmediate`. `nextTick` cannot loop indefinitely because it has a maximum call stack limit (`process.maxTickDepth`) and `setImmediate` is slower than `nextTick` (see [examples/nexttick-vs-setimmediate-vs-setTimeout.js](https://github.com/gagle/node-speedy/blob/master/examples/nexttick-vs-setimmediate-vs-setTimeout.js)) and produces inconsistent benchmark results. The solution is to use an hybrid approach (found in the [node-bench](https://github.com/isaacs/node-bench) source code):

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

- [_module_.run([name][, fn][, settings]) : EventEmitter](#run)
- [_module_.samples([n]) : undefined | Number](#samples)
- [_module_.timeout([n]) : undefined | Number](#timeout)

---

<a name="run"></a>
___module_.run([name][, fn][, settings]) : EventEmitter__  
Executes the benchmark. The results are displayed as a mean of operations per second followed by the standard error in percentage. The error should be less than 1%, typically less than 0.5%. If the error is greater than 1% then something went wrong and the mean is not as accurate as it can be.

`settings` is an object that accepts the following settings:

- output - _WritableStream_  
	By default the results will be sent to the stdout but any writable stream can be used.
	
	```javascript
	//The output is sent to a file
	speedy.run (function (){}, { output: require ("fs").createWriteStream ("file") });
	```

The returned value is an event emitter that emits the following events:

- end  
	Emitted when all the benchmarks finish. The callback receives an array. Each index stores the result of each function: an object with a `raw` property storing an array with all the results and a `name` property storing the name of the function, if any, just like the result of the `function` event.

	For example, a baseline benchmark with default attributes (samples 3, timeout 1000):

	```javascript
	speedy.run (function fn (){}).on ("end", function (data){
		console.log (data);
		
		/*
		[{
			name: "fn",
			raw: [ 226159317.37112886, 225275805.0081939, 226232582.25479224 ]
		}]
		*/
	});
	```

- function  
	Emitted for each function when its benchmark finishes. The callback receives an object with the following settings:
	
	- name - _String_  
		The name of the function. If the function is anonymous this property is not present in the object.
	- raw - _Array_  
		Array with the results of all the samples. The number of samples can be changed with [samples()](#samples).

	This event is emitted before the `end` event.
- progress  
	Emitted when a sample has been run. The callback receives a number between (0, 1]. 1 means that 100% of the job has been done.

	This event is emitted before the `function` and `end` events.

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
Changes or returns the number of samples per function. With more samples the final result will be more stable. An arithmetic mean is calculated with all the samples. Default is 3.


```javascript
speedy.samples (10);
```

---

<a name="timeout"></a>
___module_.timeout([n]) : undefined | Number__  
Changes or returns the execution time per function, in milliseconds. Higher values tend to imply more precise results. Default is 1000.

```javascript
speedy.timeout (2000);
```