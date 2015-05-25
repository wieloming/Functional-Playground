//> List = (any => void) => void
//> NIL:: List
var NIL = function (f) {
};
//> CONS:: (any, List) => List
var CONS = function (el, list) { return function (f) {
    f(el);
    list(f);
}; };
var list = CONS('a', CONS('b', CONS('c', NIL)));
var log = function (el) { return console.log(el); };
//> HEAD:: List => string
var HEAD = function (list) {
    var counter = 0;
    var result = undefined;
    list(function (el) {
        if (counter == 0) {
            result = el;
        }
        counter++;
    });
    return result;
};
//> TAIL:: List => List
var TAIL = function (list) {
    var counter = 0;
    var result = NIL;
    list(function (el) {
        if (counter != 0) {
            result = CONS(el, result);
        }
        counter++;
    });
    var result2 = NIL;
    result(function (el) { return result2 = CONS(el, result2); });
    return result2;
};
var LENGTH = function (list) {
    var counter = 0;
    list(function (el) {
        counter++;
    });
    return counter;
};
//> MAP:: (any => any, List) => List
var MAP = function (f, list) {
    if (LENGTH(list) > 0) {
        return CONS(f(HEAD(list)), MAP(f, TAIL(list)));
    }
    return NIL;
};
var MAP2 = function (f, list) {
    return FOLDR(function (acc, el) { return CONS(f(el), acc); }, NIL, list);
};
//> FILTER (any => boolean, List) => List
var FILTER = function (f, list) {
    if (LENGTH(list) > 0) {
        var car = HEAD(list);
        if (f(HEAD(list))) {
            return CONS(car, FILTER(f, TAIL(list)));
        }
        else {
            return FILTER(f, TAIL(list));
        }
    }
    return NIL;
};
//> FILTER2 (any => boolean, List) => List
var FILTER2 = function (f, list) {
    return FOLDR(function (acc, el) {
        if (f(el)) {
            return CONS(el, acc);
        }
        return acc;
    }, NIL, list);
};
//> FOLDL ((any, any) => any, any, List) => List
var FOLDL = function (f, sum, list) {
    if (LENGTH(list) > 0) {
        return FOLDL(f, f(sum, HEAD(list)), TAIL(list));
    }
    return sum;
};
//> FOLDR ((any, any) => any, any, List) => List
var FOLDR = function (f, sum, list) {
    if (LENGTH(list) > 0) {
        return FOLDR(f, f(sum, HEAD(list)), TAIL(list));
    }
    var result2 = NIL;
    sum(function (el) { return result2 = CONS(el, result2); });
    return result2;
};
//list(log);
//console.log(HEAD(list));
//TAIL(list)(log);
//MAP2((el)=>el.toUpperCase(), list)(log);
FILTER(function (el) { return el != 'b'; }, list)(log);
FILTER2(function (el) { return el != 'b'; }, list)(log);
//log(FOLDL((sum, el)=> sum + el, '', list));
//# sourceMappingURL=FunctionalList.js.map