/// <reference path="repos_and_stuff/ProductsAndManufacturers.ts" />
var Some = (function () {
    function Some(val) {
        this.val = val;
        this.$$type = "Some";
    }
    Some.prototype.value = function () {
        return this.val;
    };
    Some.prototype.isSome = function () {
        return true;
    };
    Some.prototype.toString = function () {
        return "Some(" + this.val + ")";
    };
    return Some;
})();
var None = (function () {
    function None() {
        this.$$type = "None";
    }
    None.prototype.value = function () {
        return undefined;
    };
    None.prototype.isSome = function () {
        return false;
    };
    None.prototype.toString = function () {
        return "None";
    };
    return None;
})();
var Option = function (value) {
    if (typeof value === 'function') {
        return liftToOption(value);
    }
    if (value === undefined || value === null) {
        return new None();
    }
    else {
        return new Some(value);
    }
};
var liftToOption = function (fn) { return function (value) { return new Option(fn(value)); }; };
// args: any => Option(any)
var pipeOption = function () {
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
            if (retVal1.isSome()) {
                return f2(retVal1.value());
            }
            else {
                return new None();
            }
        };
    }
    else {
        var newArgs = [
            pipeOption(arguments[0], arguments[1])
        ].concat(Array.prototype.slice.call(arguments, 2));
        return pipeOption.apply(null, newArgs);
    }
};
console.log("OPTION MONAD");
console.log(pipeOption(new Option(this.getProductById), new Option(this.getManufacturerByProduct), new Option(this.getManufacturerName))(2));
console.log("///////////////////////////////////////////////////");
//# sourceMappingURL=OptionMonad.js.map