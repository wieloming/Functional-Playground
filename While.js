var WHILE = function (condition, command) {
    if (!condition())
        return;
    command();
    WHILE(condition, command);
};
var x = 5;
WHILE(function () { return x > 0; }, function () {
    console.log(x);
    x--;
});
//# sourceMappingURL=While.js.map