"use strict";
class FridaRev05 {
    constructor() {
        this.module_name_winmine = "winmine.exe";
        console.log("=============================", new Date().toString(), "=============================");
        console.log("Frida.version", Frida.version);
        console.log("Frida.heapSize", Frida.heapSize);
        console.log("Process.id", Process.id);
        console.log("Process.arch", Process.arch);
        console.log("Process.codeSigningPolicy", Process.codeSigningPolicy);
        this.module_winmine = Process.getModuleByName(this.module_name_winmine);
    }
    board_info() {
        let height = this.module_winmine.base.add(0x5338).readU32();
        console.log("board height", height);
        let width = this.module_winmine.base.add(0x5334).readU32();
        console.log("board width", width);
        let mines = this.module_winmine.base.add(0x5330).readU32();
        console.log("all mines in board", mines);
        let entry = this.module_winmine.base.add(0x5340);
        console.log("entry", entry);
        for (let i = 0; i < height + 2; i++) {
            let data = [];
            for (let j = 0; j < width + 2; j++) {
                const bytes_data = entry.add(j + 0x20 * i).readU8();
                data.push(bytes_data.toString(16).padStart(2, '0'));
            }
            console.log(data.join(" "));
        }
    }
}
let fridaRev05 = new FridaRev05();
fridaRev05.board_info();
