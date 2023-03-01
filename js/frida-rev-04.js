"use strict";
function frida_rev_04() {
    console.log("=============================", new Date().toString(), "=============================");
    console.log("Frida.version", Frida.version);
    console.log("Frida.heapSize", Frida.heapSize);
    console.log("Process.id", Process.id);
    console.log("Process.arch", Process.arch);
    console.log("Process.codeSigningPolicy", Process.codeSigningPolicy);
    let module = Process.enumerateModules();
    for (const iterator of module) {
        console.log(iterator.base, iterator.name, iterator.size);
    }
}
frida_rev_04();
console.log("OK");
