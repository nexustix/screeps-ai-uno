/* tslint:disable:no-string-literal */
import * as log from "../util/log"
import * as prospector from "../roles/creeps/prospector"

/*
    creepManager

    keeps track of creeps on board
    and
    calculates which kind of creeps need to be built
    and
    exposes auto-generated blueprints
*/


export function run(): void {
    for (let r in Game.rooms){
        let room = Game.rooms[r]
        _calcAllHave(room);
        _calcAllWant(room);
        _calcAllOrder(room);

    }

    for (let c in Game.creeps) {
        let creep = Game.creeps[c];

        switch (creep.memory["role"]) {
            case "prospector":
                prospector.run(creep);
                break;

            default:
                //console.log("<!> odd creep alive");
                log.warn("odd creep alive")
        }
    }
}

export function orderStarted(room: Room, role: string): void {
    room.memory["order"]["creeps"][role]--;
    //console.log("new "+role+" in production");
    log.info("new "+role+" in production");
}

export function getOrder(room: Room, buget: number): [string, string[]]{
    buget = buget;
    //for (let i in )
    /*
    for (let r in room.memory["order"]["creeps"]) {
        if (room.memory["order"]["creeps"][r] > 0) {
            switch (r){
                case "prospector":
            }
        }
    }
    */
    if (room.memory["order"]["creeps"]["prospector"] >= 1){
        return ["prospector", prospector.makeBlueprint(buget)];
    }

    return ["", []];
}

function _calcAllHave(room: Room): void {
    room.memory["have"] = {};
    room.memory["have"]["creeps"] = {}

    function _incrementRoleCounter(role: string): void {
        if(room.memory["have"]["creeps"][role]){
            room.memory["have"]["creeps"][role]++;
            return;
        }
        room.memory["have"]["creeps"][role] = 1
    }

    for (let i in Game.creeps){
        let creep = Game.creeps[i];
        let curRole = creep.memory["role"];
        //log.debug(curRole);
        //room.memory["have"]["creeps"][curRole] = 1 ;
        //room.memory["have"]["creeps"][curRole] = ((room.memory["have"]["creeps"][curRole + 1) || 1) ;
        _incrementRoleCounter(curRole);
    }
}

function _calcAllWant(room: Room): void {
    room.memory["want"] = {};
    room.memory["want"]["creeps"] = {};

    function _calcWant(role: string): void {
        room.memory["want"]["creeps"][role] = 1;
    }

    _calcWant("prospector");

}

function _getOrderAmount(room: Room, role: string): number {
    let curWant = (room.memory["want"]["creeps"][role] || 0);
    let curHave = (room.memory["have"]["creeps"][role] || 0);
    return curWant - curHave;
}

function _calcAllOrder(room: Room): void {
    room.memory["order"] = {};
    room.memory["order"]["creeps"] = {};

    function _calcOrder(role: string): void {
        room.memory["order"]["creeps"][role] = _getOrderAmount(room, role);
    }

    _calcOrder("prospector");
}
