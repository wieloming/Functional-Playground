/// <reference path="../Promise.ts" />

class Sync {
    static map<T, R>(arr:T[],
                     iterator:(el)=>R):R[] {
        return arr.map((el)=>iterator(el));
    }
}

interface Callback<B> {
    (data:B): void;
}

interface FunctionWithCallback<A, B> {
    (data:A, callback:Callback<B>): void;
}

interface PromiseFunction<A, B> {
    (data:A): MyPromise<B>;
}

class Async {
    // map :: (A[], (A, Callback<B>) => void,   Callback<B[]>) => void
    // map :: (A[], FunctionWithCallback<A, B>, Callback<B[]>) => void
    static map<A, B>(arr:A[],
                     iterator:(el:A, callback:Callback<B>) => void,
                     callback:(results:B[]) => void):void {
        var resultArr = [];
        var elementsLeft = arr.length;
        var savePartialResult = (position:number) => (resEl:B) => {
            resultArr[position] = resEl;
            elementsLeft--;
            if (elementsLeft == 0) {
                callback(resultArr);
            }
        };
        for (var i = 0; i < arr.length; i++) {
            iterator(arr[i], savePartialResult(i));
        }
    }

    static promisedMap<A, B>(arr:A[],
                             iterator:(el:A, callback:Callback<B>) => void):MyPromise<B> {
        var mapFn = (res, callback) => {
            Async.map(res, iterator, res => callback(res));
        };
        return Async.mapCallbackFnToPromiseFn(mapFn)(arr);
    }

    // mapCallbackFnToPromiseFn :: ((A, Callback<B>) => void) => A => MyPromise<B>
    // mapCallbackFnToPromiseFn :: FunctionWithCallback<A, B> => PromiseFunction<A, B>
    static mapCallbackFnToPromiseFn<A, B>(callbackFunction:FunctionWithCallback<A, B>):PromiseFunction<A, B> {
        return (data:A) => {
            var d:MyDefered<B> = new MyDeferedImpl<B>();
            callbackFunction(data, d.resolve);
            return d.promise;
        };
    }
}

var list = [1, 2, 3, 4];
var syncSquare = (num) => num * num;
var asyncSquare = (num, callback) => setTimeout(
    () => callback(num * num),
    Math.random() * 1000
);

console.log('start');
console.log('wynik sync', Sync.map(list, syncSquare));
Async.map(list, asyncSquare, res => console.log('wynik async', res));


var promisedResult = Async.promisedMap(list, asyncSquare);

promisedResult.then(res => console.log('wynik promised', res));

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