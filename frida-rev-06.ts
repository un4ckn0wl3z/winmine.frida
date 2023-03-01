class FridaRev06 {
    private module_name_winmine = "winmine.exe";
    private module_winmine: Module;
    private height: number = 0;
    private width: number = 0;
    private mines: number = 0;
    private entry: NativePointer = ptr(0);

    constructor(){
        console.log("=============================", new Date().toString(), "=============================");
        console.log("Frida.version", Frida.version);
        console.log("Frida.heapSize", Frida.heapSize);
        console.log("Process.id", Process.id);
        console.log("Process.arch", Process.arch);
        console.log("Process.codeSigningPolicy", Process.codeSigningPolicy);

        this.module_winmine = Process.getModuleByName(this.module_name_winmine);
    }

    private load_board_info(){
        this.height = this.module_winmine.base.add(0x5338).readU32();
        this.width = this.module_winmine.base.add(0x5334).readU32();
        this.mines = this.module_winmine.base.add(0x5330).readU32();
        this.entry = this.module_winmine.base.add(0x5340);
    }

    board_info(){
        this.board_mark()
    }

    board_mark(modify: boolean = false){
        this.load_board_info();
        for (let i = 0; i < this.height+2; i++) {
            let data = [];
            for (let j = 0; j < this.width+2; j++) {
                const bytes_data = this.entry.add(j + 0x20 * i).readU8();
                if(modify){
                    if(bytes_data == 0x8F){
                        this.entry.add(j + 0x20 * i).writeU8(0x8E);
                    }
                } else {
                    data.push(bytes_data.toString(16).padStart(2, '0').toLocaleUpperCase());
                }
            }     
            if(!modify){
                console.log(data.join(" "));
            }       
            
        }
    }
}
let fridaRev06 = new FridaRev06();
fridaRev06.board_mark(true);
fridaRev06.board_info();