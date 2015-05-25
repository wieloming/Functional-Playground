/// <reference path="repos_and_stuff/ProductsAndManufacturers.ts" />

interface MyPromise<T> {
    then(callback:(data:T)=>void);//:MyPromise<T>;
}
class MyPromiseImpl<T> implements MyPromise<T> {
    callback:(data:T)=>void;
    then(callback) {
        this.callback = callback;
    }
}

interface MyDefered<T> {
    promise: MyPromise<T>;
    resolve(data:T);
}

class MyDeferedImpl<T> implements MyDefered<T> {
    promise: MyPromiseImpl<T>;
    constructor() {
        this.promise = new MyPromiseImpl<T>();
    }
    resolve(data:T) {
        setTimeout(() => {
            this.promise.callback(data);
        }, 0);
    }
}

var getDupa = () => {
    var d:MyDefered<string> = new MyDeferedImpl<string>();
    setTimeout(() => {
        d.resolve('duPA')
    }, 2000);
    return d.promise;
};

var getDupa2 = () => {
    var p:MyPromiseImpl<string> = new MyPromiseImpl<string>();
    setTimeout(() => {
        p.callback('duPA2')
    }, 1000);
    return p;
};

console.log("PROMISE");
getDupa().then(
    (result) => {
        //console.log('result', result);
        //console.log("///////////////////////////////////////////////////");
    }
);

getDupa2().then(
    (result) => {
        //console.log('result', result);
    }
);
