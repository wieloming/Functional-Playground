//> Map = any => any
//> createMap:: (any, any) => Map
var createMap = function (key, value) { return function (newKey) {
    if (newKey == key) {
        return value;
    }
    return undefined;
}; };
//> concat:: (Map, Map) => Map
var concat = function (map1, map2) { return function (key) {
    if (map1(key) != undefined) {
        return map1(key);
    }
    return map2(key);
}; };
var userName = createMap('name', 'John');
var userSurname = createMap('surname', 'Doe');
var userAge = createMap('age', '100');
var _m = createMap;
var _c = concat;
var user = _c(_c(_m('name', 'John'), _m('surname', 'Doe')), _m('age', '100'));
console.log(user('name'));
console.log(user('surname'));
console.log(user('age'));
//# sourceMappingURL=FunctionalMap.js.map