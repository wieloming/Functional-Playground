/// <reference path="repos_and_stuff/ProductsAndManufacturers.ts" />
var MyPromiseImpl = (function () {
    function MyPromiseImpl() {
    }
    MyPromiseImpl.prototype.then = function (callback) {
        this.callback = callback;
    };
    return MyPromiseImpl;
})();
var MyDeferedImpl = (function () {
    function MyDeferedImpl() {
        this.promise = new MyPromiseImpl();
    }
    MyDeferedImpl.prototype.resolve = function (data) {
        var _this = this;
        setTimeout(function () {
            _this.promise.callback(data);
        }, 0);
    };
    return MyDeferedImpl;
})();
var getDupa = function () {
    var d = new MyDeferedImpl();
    setTimeout(function () {
        d.resolve('duPA');
    }, 2000);
    return d.promise;
};
var getDupa2 = function () {
    var p = new MyPromiseImpl();
    setTimeout(function () {
        p.callback('duPA2');
    }, 1000);
    return p;
};
console.log("PROMISE");
getDupa().then(function (result) {
    //console.log('result', result);
    //console.log("///////////////////////////////////////////////////");
});
getDupa2().then(function (result) {
    //console.log('result', result);
});
//# sourceMappingURL=Promise.js.map