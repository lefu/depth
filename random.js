
var seedobja = 1103515.245;
var seedobjc = 12345;
var seedobjm = 4294967.295;//0x100000000;
var seedobj = 0.0;
function srandom(){
    seedobj = (seedobj * seedobja + seedobjc) % seedobjm;
    
    return seedobj / (seedobjm - 1);
}
Math.random = srandom;