/// <reference path="../Promise.ts" />
var Sync = (function () {
    function Sync() {
    }
    Sync.map = function (arr, iterator) {
        return arr.map(function (el) { return iterator(el); });
    };
    return Sync;
})();
var Async = (function () {
    function Async() {
    }
    // map :: (A[], (A, Callback<B>) => void,   Callback<B[]>) => void
    // map :: (A[], FunctionWithCallback<A, B>, Callback<B[]>) => void
    Async.map = function (arr, iterator, callback) {
        var resultArr = [];
        var elementsLeft = arr.length;
        var savePartialResult = function (position) { return function (resEl) {
            resultArr[position] = resEl;
            elementsLeft--;
            if (elementsLeft == 0) {
                callback(resultArr);
            }
        }; };
        for (var i = 0; i < arr.length; i++) {
            iterator(arr[i], savePartialResult(i));
        }
    };
    Async.promisedMap = function (arr, iterator) {
        var mapFn = function (res, callback) {
            Async.map(res, iterator, function (res) { return callback(res); });
        };
        return Async.mapCallbackFnToPromiseFn(mapFn)(arr);
    };
    // mapCallbackFnToPromiseFn :: ((A, Callback<B>) => void) => A => MyPromise<B>
    // mapCallbackFnToPromiseFn :: FunctionWithCallback<A, B> => PromiseFunction<A, B>
    Async.mapCallbackFnToPromiseFn = function (callbackFunction) {
        return function (data) {
            var d = new MyDeferedImpl();
            callbackFunction(data, d.resolve);
            return d.promise;
        };
    };
    return Async;
})();
var list = [1, 2, 3, 4];
var syncSquare = function (num) { return num * num; };
var asyncSquare = function (num, callback) { return setTimeout(function () { return callback(num * num); }, Math.random() * 1000); };
console.log('start');
console.log('wynik sync', Sync.map(list, syncSquare));
Async.map(list, asyncSquare, function (res) { return console.log('wynik async', res); });
var promisedResult = Async.promisedMap(list, asyncSquare);
promisedResult.then(function (res) { return console.log('wynik promised', res); });
//async.filter(['file1','file2','file3'], fs.exists, function(results){
//    // results now equals an array of the existing files
//});
//
//async.parallel([
//    function(){ ... },
//    function(){ ... }
//], callback);
//
//async.series([
//    function(){ ... },
//    function(){ ... }
//]); 
//# sourceMappingURL=Map.js.map