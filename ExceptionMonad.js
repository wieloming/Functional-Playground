/// <reference path="repos_and_stuff/ProductsAndManufacturers.ts" />
var Success = (function () {
    function Success(val) {
        this.val = val;
        this.$$type = "Success";
    }
    Success.prototype.value = function () {
        return this.val;
    };
    Success.prototype.isSuccess = function () {
        return true;
    };
    return Success;
})();
var Failure = (function () {
    function Failure(message) {
        this.message = message;
        this.$$type = "Failure";
    }
    Failure.prototype.value = function () {
        return undefined;
    };
    Failure.prototype.isSuccess = function () {
        return false;
    };
    return Failure;
})();
var liftToTry = function (fn) { return function (value) {
    try {
        return new Success(fn(value));
    }
    catch (e) {
        return new Failure(e.message);
    }
}; };
var Try = function (value) {
    if (typeof value === 'function') {
        return liftToTry(value);
    }
    return new Success(value);
};
var pipeTry = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    if (arguments.length == 1) {
        return arguments[0];
    }
    else if (arguments.length == 2) {
        var f1 = arguments[0];
        var f2 = arguments[1];
        return function (value) {
            var retVal1 = f1(value);
            if (retVal1.isSuccess()) {
                return f2(retVal1.value());
            }
            else {
                return retVal1;
            }
        };
    }
    else {
        var newArgs = [
            pipeTry(arguments[0], arguments[1])
        ].concat(Array.prototype.slice.call(arguments, 2));
        return pipeTry.apply(null, newArgs);
    }
};
var getProductById = function (id) {
    console.log('getProductById', id);
    if (!isNaN(id)) {
        return products[id];
    }
    else {
        throw new Error('getProductById');
    }
};
console.log("EXCEPTION MONAD");
console.log(pipeTry(Try(getProductById), Try(getManufacturerByProduct), Try(getManufacturerName))(3));
console.log("//////////////////////////////////////");
//# sourceMappingURL=ExceptionMonad.js.map