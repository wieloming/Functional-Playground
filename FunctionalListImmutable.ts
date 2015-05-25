interface List {
    (string): any;
}

//> NIL:: List
var NIL:List = str => {
    if (str == 'HEAD' || str == 'TAIL') return NIL;
    return true
};

//> CONS:: (any, List) => List
var CONS = (head, tail):List => (str) => {
    if (str == 'HEAD') return head;
    if (str == 'TAIL') return tail;
    return false;
};

//> HEAD:: List => string
var HEAD = (list:List) => list('HEAD');

//> TAIL:: List => List
var TAIL = (list:List):List => list('TAIL');

//> FOLDL ((any, any) => any, any, List) => List
var FOLDL = (f, sum, list) => {
    if (!list()) FOLDL(f, f(sum, HEAD(list)), TAIL(list));
    return sum;
};

var MAP = (f, list):List => FOLDL(
    (acc, el) => CONS(f(el), acc),
    NIL,
    list
);

//> FOLDR ((any, any) => any, any, List) => List
//var FOLDR = (f, sum, list) => {
//    sum  = FOLDL(f, sum, list);
//    if(sum()){
//        sum  = FOLDL((acc, en) => en, NIL, sum);
//        return sum;
//    }
//};

//> FILTER (any => boolean, List) => List
var FILTER = (f, list) => {
    return FOLDL(
        (acc:List, el) => {
            if (f(el)) return CONS(el, acc);
            return acc;
        },
        NIL,
        list
    )
};



//var filtered = FILTER((el)=>el != 'b', list);


//console.log("LIST: ");
//FOLDL((acc, el) => console.log(el), '', list);

//console.log("MAPPED: ");
//FOLDL((acc, el) => console.log(el), '', MAP((el) => el.toUpperCase(), list));

//console.log("FILTERED: ");
//FOLDL((acc, el) => console.log(el), '', filtered);
var list = CONS('a', CONS('b', CONS('c', NIL)));
var clasicList = ['a', 'b', 'c'];


for (var i = 0; i < 1000; ++i) {
   clasicList.push('a');
}
var cStart = new Date().getTime();
for (var i = 0; i < 1000; ++i) {
    clasicList.map((en)=>en);
}
var cEnd = new Date().getTime();
var cTime = cEnd - cStart;
console.log('clasicList: ', cTime);


for (var i = 0; i < 1000; ++i) {
   list = CONS('a', list);
}
var mStart = new Date().getTime();
for (var i = 0; i < 1000; ++i) {
    MAP((en)=>en, list);
}
var mEnd = new Date().getTime();
var mTime = mEnd - mStart;
console.log('myListTime: ', mTime);
console.log('difference: ', mTime/cTime);

