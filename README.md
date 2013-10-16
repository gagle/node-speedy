speedy
======

_Node.js project_

#### Tiny benchmark utility ####

Version: 0.1.1

If you need to benchmark some sort of code or if you are writing a module and want to see how well it performs in comparison with older versions, you can use `speedy`. Use it for rapid prototyping and informal benchmarks. Don't use it for serious jobs like benchmarking HTTP servers.

This module doesn't check for errors so make sure your code doesn't break before running the benchmark.

The benchmark is formed by tests and each test is formed by samples (default 3). Each sample is executed with a fixed amount of time (default 1000). An arithmetic mean and a standard error is calculated with these samples.

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

#### Objects ####

- [Speedy](#speedy_object)

---

<a name="speedy_object"></a>
__Speedy__

A `Speedy` instance is returned when the module is required.

__Events__

- [end](event_end)
- [progress](event_progress)
- [test](event_test)

__Methods__

- [Speedy#run([name][, fn][, options]) : Speedy](#run)
- [Speedy#samples([n]) : undefined | Number](#samples)
- [Speedy#timeout([n]) : undefined | Number](#timeout)

---

<a name="event_end"></a>
__end__

Emitted when the benchmark finishes. The callback receives an array. Each index stores an object with he result of each test.

Properties:

- __raw__ - _Array_  
Stores all the sample results.
- __name__ - _String_  
Stores the name of the function, if any. It is like the result of the `test` event.

For example, a baseline benchmark with default options (samples 3, timeout 1000):

```javascript
speedy
    .on ("end", function (data){
      console.log (data);
      
      /*
      [{
        name: "fn",
        raw: [ 226159317.37112886, 225275805.0081939, 226232582.25479224 ]
      }]
      */
    })
    .run (function fn (){});
```

<a name="event_progress"></a>
__progress__

Emitted when a sample has been executed. The callback receives a number between (0, 1]. 1 means that the benchmark is finished.

This event is emitted before the `test` and `end` events.
	
<a name="event_test"></a>
__test__

Emitted for each test. The callback receives an object with the following properties:

- __name__ - _String_  
	The name of the function. If the function is anonymous this property is not available.
- __raw__ - _Array_  
	Array with the sample results. The number of samples can be changed with the [samples()](#samples) function.

This event is emitted before the `end` event.

---

<a name="run"></a>
__Speedy#run([name][, fn][, options]) : Speedy__

Executes the benchmark. The results are displayed with an arithmetic mean of operations per second followed by the standard error in percentage. The error should be less than 1%, typically less than 0.5%. If the error is greater than 1% then something went wrong and the mean is not as accurate as it can be.

Options:

- __output__ - _WritableStream_  
	By default the results will be sent to the stdout but any writable stream can be used.
	
	```javascript
	//The output is sent to a file
	speedy.run (function (){}, { output: require ("fs").createWriteStream ("file") });
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
__Speedy#samples([n]) : undefined | Number__

Changes or returns the number of samples per test. With more samples the final result will be more stable. An arithmetic mean is calculated with all the samples. Default is 3.


```javascript
speedy.samples (10);
```

---

<a name="timeout"></a>
__Speedy#timeout([n]) : undefined | Number__

Changes or returns the execution time per sample, in milliseconds. Higher values tend to imply more precise results. Default is 1000.

```javascript
speedy.timeout (2000);
```