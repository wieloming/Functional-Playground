/// <reference path="OptionMonad.ts" />

var arrayFlatten = () => {
    return (aax: Array<Array<any>>) => {
        var result = [];
        for(var i = 0; i < aax.length; i++){
            result = result.concat(aax[i])
        }
        return result;
    }
};

var maybeFlatten = () => {
    return (mmx) => {
        if(mmx.$$type == 'Some'){
            return mmx.x
        }
        return mmx;
    }
};
console.log("FLATTEN");
console.log("array: ", [10, 12, 14, [12, 32]]);
console.log("arrayFlatten: ", arrayFlatten()([10, 12, 14, [12, 32]]));
console.log("///////////////////////////////////////////////////");
