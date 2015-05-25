var WHILE = (condition:()=>boolean, command:()=>void) => {
    if (!condition()) return;
    command();
    WHILE(condition, command);
};

var x = 5;

WHILE(() => x > 0, ()=> {
    console.log(x);
    x--;
});