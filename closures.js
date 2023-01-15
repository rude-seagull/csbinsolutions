// Closures, Scope, and Execution Context

// Challenge 1
// Create a function createFunction that creates and returns a function. 
// When that created function is called, it should print "hello".

function createFunction() {
    function printHello() {
        console.log("hello");
    }
    return printHello;
}

const function1 = createFunction();
function1(); // => should console.log('hello');

// Challenge 2
// Create a function createFunctionPrinter that accepts one input 
// and returns a function. When that created function is called, 
// it should print out the input that was used when the function was created.

function createFunctionPrinter(input) {
    function printArgument() {
        console.log(input);
    }
    return printArgument;
}

const printSample = createFunctionPrinter('sample');
printSample(); // => should console.log('sample');
const printHello = createFunctionPrinter('hello');
printHello(); // => should console.log('hello');

// Challenge 3
// Examine the code for the outer function. 
// Notice that we are returning a function and that function is using variables 
// that are outside of its scope.Uncomment those lines of code. 
// Try to deduce the output before executing. 
// Now we are going to create a function 
// addByX that returns a function that will add an input by x.

function outer() {
    let counter = 0; // this variable is outside incrementCounter's scope
    function incrementCounter() {
        counter++;
        console.log('counter', counter);
    }
    return incrementCounter;
}

const willCounter = outer();
const jasCounter = outer();

// Before your do, guess what will be logged from each function call.
willCounter();
willCounter();
willCounter();
jasCounter();
willCounter();

function addByX(x) {
    function add(num) {
        return num + x;
    }
    return add;
}

const addByTwo = addByX(2);
console.log(addByTwo(1)); // => should return 3
console.log(addByTwo(2)); // => should return 4
console.log(addByTwo(3)); // => should return 5

const addByThree = addByX(3);
console.log(addByThree(1)); // => should return 4
console.log(addByThree(2)); // => should return 5

const addByFour = addByX(4);
console.log(addByFour(4)); // => should return 8
console.log(addByFour(5)); // => should return 9

// Challenge 4
// Write a function once that accepts a callback as input and returns a function.
// When the returned function is called the first time, 
// it should call the callback and return that output. 
// If it is called any additional times, instead of calling the callback 
// again it will simply return the output value from 
// the first time it was called.

function once(func) {
    let counter = 0;
    let initialFuncExecutionOutput;
    function executeFunc(val) {
        if (counter === 0) {
            initialFuncExecutionOutput = func(val);
        }
        counter++;
        return initialFuncExecutionOutput;
    }
    return executeFunc;
}

const onceFunc = once(addByTwo);
console.log(onceFunc(4));  // => should log 6
console.log(onceFunc(10));  // => should log 6
console.log(onceFunc(9001));  // => should log 6
