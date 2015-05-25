/// <reference path="repos_and_stuff/ProductsAndManufacturers.ts" />

interface TryType {
    value():any;
    isSuccess():boolean;
}

class Success implements TryType {
    $$type = "Success";

    constructor(private val) {
    }

    value() {
        return this.val;
    }

    isSuccess() {
        return true;
    }
}

class Failure implements TryType {
    $$type = "Failure";

    constructor(public message) {
    }

    value() {
        return undefined;
    }

    isSuccess() {
        return false;
    }
}

var liftToTry = fn => value => {
    try {
        return new Success(fn(value));
    } catch (e) {
        return new Failure(e.message);
    }
};

var Try = (value:any) => {
    if (typeof value === 'function') {
        return liftToTry(value);
    }
    return new Success(value);
};

var pipeTry = (...args) => {
    if (arguments.length == 1) {
        return arguments[0];
    } else if (arguments.length == 2) {
        var f1 = arguments[0];
        var f2 = arguments[1];
        return (value) => {
            var retVal1 = f1(value);
            if (retVal1.isSuccess()) {
                return f2(retVal1.value());
            } else {
                return retVal1;
            }
        };
    } else {
        var newArgs = [
            pipeTry(arguments[0], arguments[1])
        ].concat(
            Array.prototype.slice.call(arguments, 2)
        );
        return pipeTry.apply(null, newArgs);
    }
};

var getProductById = (id) => {
    console.log('getProductById', id);
    if (!isNaN(id)) {
        return products[id];
    } else {
        throw new Error('getProductById')
    }
};
console.log("EXCEPTION MONAD");
console.log(
    pipeTry(
        Try(getProductById),
        Try(getManufacturerByProduct),
        Try(getManufacturerName)
    )(3)
);
console.log("//////////////////////////////////////");
