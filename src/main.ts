/* tslint:disable:no-string-literal */
/* tslint:disable:comment-format */

//import * as prospector from "./roles/creeps/prospector"
//import * as factory from "./roles/spawns/factory"
import * as creepManager from "./managers/creepManager";
import * as core from "./roles/rooms/core"
import * as log from "./util/log"

log.info("loading");

/*
    log.info("test info");
    log.warn("test warn");
    log.error("test error");
    log.request("test request")
*/

//TODO clean memory !!
/*
function _cleanMemory(): void {
    for (let c in Memory.creeps){
        console.log(c);
        if (!Game.creeps[c]) {
            Memory.creeps[c] = null;
        }
    }
    //Memory["quota"] = {};
}
*/



export function loop() {
    creepManager.run();


    for (let i in Game.rooms) {
        let room = Game.rooms[i];
        core.run(room);
    }
    //core
    /*

    for (let i in Game.rooms) {
        let room = Game.rooms[i];
        let spawns = room.find<Spawn>(FIND_MY_SPAWNS);

        for (let ii in spawns) {
            factory.run(spawns[ii]);
        }

    }
    */

    /*
    console.log("test");

    for (let i in Game.creeps){
        let creep = Game.creeps[i];
        if (creep.memory["role"] == "prospector"){
            prospector.run(creep);
        }
    }

    for (let i in Game.spawns){
        Game.spawns[i].createCreep(prospector.makeBlueprint(1), "bernhard", {"role":"prospector"});
    }
    */
}
