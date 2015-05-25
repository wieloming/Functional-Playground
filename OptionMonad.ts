/// <reference path="repos_and_stuff/ProductsAndManufacturers.ts" />

interface OptionType {
    value():any;
    isSome():boolean;
}

class Some implements OptionType {
    $$type = "Some";
    constructor(private val) {
    }
    value() {
        return this.val;
    }
    isSome() {
        return true;
    }
    toString(){
        return "Some("+this.val+")";
    }
}

class None implements OptionType {
    $$type = "None";
    value() {
        return undefined;
    }
    isSome() {
        return false;
    }
    toString(){
        return "None";
    }
}


var Option = (value:any) => {
    if (typeof value === 'function') {
        return liftToOption(value);
    }
    if (value === undefined || value === null) {
        return new None();
    } else {
        return new Some(value);
    }
};

var liftToOption = fn => value => new Option(fn(value));

// args: any => Option(any)
var pipeOption = (...args) => {
    if (arguments.length == 1) {
        return arguments[0];
    } else if (arguments.length == 2) {
        var f1 = arguments[0];
        var f2 = arguments[1];
        return (value) => {
            var retVal1 = f1(value);
            if (retVal1.isSome()) {
                return f2(retVal1.value());
            } else {
                return new None();
            }
        };
    } else {
        var newArgs = [
            pipeOption(arguments[0], arguments[1])
        ].concat(
           Array.prototype.slice.call(arguments, 2)
        );
        return pipeOption.apply(null, newArgs);
    }
};

console.log("OPTION MONAD");
console.log(
    pipeOption(
        new Option(this.getProductById),
        new Option(this.getManufacturerByProduct),
        new Option(this.getManufacturerName)
    )(2)
);
console.log("///////////////////////////////////////////////////");

