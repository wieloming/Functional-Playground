interface IteratingFn {
    (el:string): void;
}
interface List {
    (f:IteratingFn): void;
}

//> List = (any => void) => void

//> NIL:: List
var NIL:List = f => {};

//> CONS:: (any, List) => List
var CONS = (el:string, list):List => (f:IteratingFn) => {
    f(el);
    list(f);
};


var list = CONS('a', CONS('b', CONS('c', NIL)));
var log = el => console.log(el);

//> HEAD:: List => string
var HEAD = (list:List) => {
    var counter = 0;
    var result = undefined;
    list((el)=> {
        if (counter == 0) {
            result = el;
        }
        counter++;
    });
    return result;
};
//> TAIL:: List => List
var TAIL = (list:List):List => {
    var counter = 0;
    var result = NIL;
    list((el)=> {
        if (counter != 0) {
            result = CONS(el, result);
        }
        counter++;
    });
    var result2 = NIL;
    result((el)=> result2 = CONS(el, result2));

    return result2;
};

var LENGTH = (list:List):number => {
    var counter = 0;
    list((el)=> {
        counter++;
    });
    return counter;
};

//> MAP:: (any => any, List) => List
 var MAP = (f, list):List => {
    if (LENGTH(list) > 0) {
        return CONS(f(HEAD(list)), MAP(f, TAIL(list)));
    }
    return NIL;
};

var MAP2 = (f, list):List => {
    return FOLDR((acc:List, el)=> CONS(f(el), acc), NIL, list)
};

//> FILTER (any => boolean, List) => List
var FILTER = (f, list) => {
    if (LENGTH(list) > 0) {
        var car = HEAD(list);
        if (f(HEAD(list))) {
            return CONS(car, FILTER(f, TAIL(list)));
        } else {
            return FILTER(f, TAIL(list));
        }
    }
    return NIL;
};

//> FILTER2 (any => boolean, List) => List
var FILTER2 = (f, list) => {
    return FOLDR((acc:List, el) => {
            if (f(el)) {
                return CONS(el, acc)
            }
            return acc;
        }, NIL, list
    )
};

//> FOLDL ((any, any) => any, any, List) => List
var FOLDL = (f, sum, list) => {
    if (LENGTH(list) > 0) {
        return FOLDL(f, f(sum, HEAD(list)), TAIL(list));
    }
    return sum;
};

//> FOLDR ((any, any) => any, any, List) => List
var FOLDR = (f, sum, list) => {
    if (LENGTH(list) > 0) {
        return FOLDR(f, f(sum, HEAD(list)), TAIL(list));
    }
    var result2 = NIL;
    sum((el)=> result2 = CONS(el, result2));
    return result2;
};

//list(log);
//console.log(HEAD(list));
//TAIL(list)(log);
//MAP2((el)=>el.toUpperCase(), list)(log);
FILTER((el)=>el != 'b', list)(log);
FILTER2((el)=>el != 'b', list)(log);
//log(FOLDL((sum, el)=> sum + el, '', list));

