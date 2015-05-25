/// <reference path="repos_and_stuff/ProductsAndManufacturers.ts" />


// args: any => any
var pipe = (...args) => {
    if (arguments.length == 1) {
        return arguments[0];
    } else if (arguments.length == 2) {
        var f1 = arguments[0];
        var f2 = arguments[1];
        return (value) => {
            return f2(f1(value));
        };
    } else {
        var newArgs = [
            pipe(arguments[0], arguments[1])
        ].concat(
            Array.prototype.slice.call(arguments, 2)
        );
        return pipe.apply(null, newArgs);
    }
};

console.log("SIMPLE PIPE");
console.log(
    pipe(
        getProductById,
        getManufacturerByProduct,
        getManufacturerName
    )(2)
);
console.log("//////////////////////////////////////////");
