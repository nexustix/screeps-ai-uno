import * as creepManager from "../../managers/creepManager";
import * as log from "../../util/log";

/*
    Core represents the "central" room
*/

export function run(room: Room): void {
    let mySpawns = room.find<Spawn>(FIND_MY_SPAWNS);

    for (let i in mySpawns) {
        let spawn = mySpawns[i];
        spawn = spawn;
        //console.log(spawn.name);
        let order = creepManager.getOrder(spawn.room, 1);
        if (order[0] != "") {
            //log.request(String(order[1]));
            log.debug("test");
            if ( spawn.canCreateCreep(order[1]) === OK) {
                spawn.createCreep(order[1], undefined, {"role": order[0]});
                creepManager.orderStarted(room, order[0]);
            }
        }
    }
}
