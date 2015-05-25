/// <reference path="OptionMonad.ts" />
var arrayFlatten = function () {
    return function (aax) {
        var result = [];
        for (var i = 0; i < aax.length; i++) {
            result = result.concat(aax[i]);
        }
        return result;
    };
};
var maybeFlatten = function () {
    return function (mmx) {
        if (mmx.$$type == 'Some') {
            return mmx.x;
        }
        return mmx;
    };
};
console.log("FLATTEN");
console.log("array: ", [10, 12, 14, [12, 32]]);
console.log("arrayFlatten: ", arrayFlatten()([10, 12, 14, [12, 32]]));
console.log("///////////////////////////////////////////////////");
//# sourceMappingURL=Flatten.js.map