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
    _calcAllHave();
    _calcAllWant();
    _calcAllOrder();

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
/*
export function orderStarted(role: string): void {
    Memory["order"]["creeps"][role]--;
    console.log("new "+role+" in production");
}
*/

export function getOrder(buget: number): [string, string[]]{
    buget = buget;
    //for (let i in )
    return ["prospector", [WORK,CARRY,MOVE,MOVE]];
}

function _calcAllHave(): void {
    Memory["have"] = {};
    Memory["have"]["creeps"] = {}

    for (let i in Game.creeps){
        let creep = Game.creeps[i];
        let curRole = creep.memory["role"];
        Memory["have"]["creeps"][curRole]++;
    }
}

function _calcAllWant(): void {
    Memory["want"] = {};
    Memory["want"]["creeps"] = {};

    function _calcWant(role: string): void {
        Memory["want"]["creeps"][role] = 1;
    }

    _calcWant("prospector");

}

function _getOrderAmount(role: string): number {
    let curWant = (Memory["want"]["creeps"][role] || 0);
    let curHave = (Memory["have"]["creeps"][role] || 0);
    return curWant - curHave;
}

function _calcAllOrder(): void {
    Memory["order"] = {};
    Memory["order"]["creeps"] = {};

    function _calcOrder(role: string): void {
        Memory["order"]["creeps"][role] = _getOrderAmount(role);
    }

    _calcOrder("prospector");
}
