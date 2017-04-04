

export function info(msg: string):void {
    console.log(`<font color='${"grey"}'>${"< - > "+ msg}</font>`);
}

export function warn(msg: string):void {
    console.log(`<font color='${"yellow"}'>${"< * > "+ msg}</font>`)
}

export function error(msg: string):void {
    console.log(`<font color='${"red"}'>${"< ! > "+ msg}</font>`)
}

export function request(msg: string):void {
    console.log(`<font color='${"orange"}'>${"< / > "+ msg}</font>`)
}

export function debug(msg: string):void {
    console.log(`<font color='${"CadetBlue"}'>${"< D > "+ msg}</font>`)
}
