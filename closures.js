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

// Challenge 5
// Write a function after that takes the number of times the callback needs to
// be called before being executed as the first parameter and the callback as 
// the second parameter.

function after(count, func) {
    let counter = 1;
    function doWhenCountIsReached() {
        if (counter >= count) {
            return func();
        } else {
            counter++;
        }
    }
    return doWhenCountIsReached;
}

const called = function () {
    console.log('hello')
};
const afterCalled = after(3, called);
afterCalled(); // => nothing is printed
afterCalled(); // => nothing is printed
afterCalled(); // => 'hello' is printed
afterCalled(); // => 'hello' is printed

// Challenge 6
// Write a function delay that accepts a callback as the first parameter 
// and the wait in milliseconds before allowing the callback to be invoked as
// the second parameter. Any additional arguments after wait are provided 
// to func when it is invoked.

function delay(func, wait) {
    function delayFunc(...args) {
        setTimeout(() => func(args), wait)
    }
    return delayFunc;
}

const delayFunc = delay((input) => console.log(input), 3000);
delayFunc("hello");

// Challenge 7
// Write a function rollCall that accepts an array of names and returns a function. 
// The first time the returned function is invoked, it should log the first name 
// to the console. The second time it is invoked, it should log the second name 
// to the console, and so on, until all names have been called. 
// Once all names have been called, it should log 'Everyone accounted for'.

function rollCall(names) {
    let counter = 0;
    function log() {
        counter < names.length
            ? console.log(names[counter])
            : console.log("Everyone accounted for")
        counter++;
    }
    return log;
}

const rollCaller = rollCall(['Victoria', 'Juan', 'Ruth'])
rollCaller() // => should log 'Victoria'
rollCaller() // => should log 'Juan'
rollCaller() // => should log 'Ruth'
rollCaller() // => should log 'Everyone accounted for'

function saveOutput(func, magicWord) {
    const previousOutputs = {};
    function executeCallback(arg) {
        if (arg === magicWord) {
            return previousOutputs;
        }
        const result = func(arg);
        previousOutputs[arg] = result;
        return result;
    }
    return executeCallback;
}

// Challenge 8
// Create a function saveOutput that accepts a function and a string. 
// saveOutput will then return a function that behaves exactly like the 
// passed-in function, except for when the password string is passed in as 
// an argument. When this happens, the returned function will return an object
// with all previously passed-in arguments as keys, 
// and the corresponding outputs as values.

const multiplyBy2 = function (num) { return num * 2; };
const multBy2AndLog = saveOutput(multiplyBy2, 'boo');
console.log(multBy2AndLog(2)); // => should log 4
console.log(multBy2AndLog(9)); // => should log 18
console.log(multBy2AndLog('boo')); // => should log { 2: 4, 9: 18 }

// Challenge 9
// Create a function cycleIterator that accepts an array, and returns a function. 
// The returned function will accept zero arguments. 
// When first invoked, the returned function will return the first element of 
// the array. When invoked a second time, the returned function will return
// the second element of the array, and so forth. After returning the last element 
// of the array, the next invocation will return the first element of the 
// array again, and continue on with the second after that, and so forth.

function cycleIterator(array) {
    let iteratorIndex = 0;
    function doWork() {
        var result = array[iteratorIndex]
        iteratorIndex++;
        if (iteratorIndex === array.length) {
            iteratorIndex = 0;
        }
        return result;
    }
    return doWork;
}

const threeDayWeekend = ['Fri', 'Sat', 'Sun'];
const getDay = cycleIterator(threeDayWeekend);
console.log(getDay()); // => should log 'Fri'
console.log(getDay()); // => should log 'Sat'
console.log(getDay()); // => should log 'Sun'
console.log(getDay()); // => should log 'Fri'

// Challenge 10
// Create a function defineFirstArg that accepts a function and an argument. 
// Also, the function being passed in will accept at least one argument. 
// defineFirstArg will return a new function that invokes the passed-in function 
// with the passed-in argument as the passed-in function's first argument.
// Additional arguments needed by the passed-in function will need to be passed
// into the returned function.

function defineFirstArg(func, arg) {
    function passedInFunc(input) {
        return func(arg, input);
    }
    return passedInFunc;
}

const subtract = function (big, small) { return big - small; };
const subFrom20 = defineFirstArg(subtract, 20);
console.log(subFrom20(5)); // => should log 15

// Challenge 11
// Create a function dateStamp that accepts a function and returns a function. 
// The returned function will accept however many arguments the passed-in 
// function accepts, and return an object with a date key that contains a 
// timestamp with the time of invocation, and an output key that contains the 
// result from invoking the passed-in function. HINT: You may need to research 
// how to access information on Date objects.

function dateStamp(func) {
    const output = {};
    function doWork(...args) {
        output.date = (new Date()).toString()
        output.output = func(args);
        return output;
    }
    return doWork;
}

const stampedMultBy2 = dateStamp(n => n * 2);
console.log(stampedMultBy2(4)); // => should log { date: (today's date), output: 8 }
console.log(stampedMultBy2(6)); // => should log { date: (today's date), output: 12 }

// Challenge 12
// Create a function censor that accepts no arguments. 
// censor will return a function that will accept either two strings, 
// or one string. When two strings are given, the returned function will hold 
// onto the two strings as a pair, for future use. When one string is given, the 
// returned function will return the same string, except all instances of first 
// strings (of saved pairs) will be replaced with their corresponding second 
// strings (of those saved pairs).

function censor() {
    const pairs = [];
    function doWork(string1, string2) {
        if (string1 && string2) {
            pairs.push([string1, string2])
        } else {
            for (let pair of pairs) {
                if (string1.includes(pair[0])) {
                    string1 = string1.replaceAll(pair[0], pair[1])
                }
            }
            return string1;
        }
    }
    return doWork;
}

const changeScene = censor();
changeScene('dogs', 'cats');
changeScene('quick', 'slow');
console.log(changeScene('The quick, brown fox jumps over the lazy dogs.')); // => should log 'The slow, brown fox jumps over the lazy cats.'