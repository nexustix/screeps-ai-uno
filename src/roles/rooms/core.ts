import * as creepManager from "../../managers/creepManager";

export function run(room: Room): void {
    let mySpawns = room.find<Spawn>(FIND_MY_SPAWNS);

    for (let i in mySpawns) {
        let spawn = mySpawns[i];
        spawn = spawn;
        //console.log(spawn.name);
        let order = creepManager.getOrder(1);
        spawn.createCreep(order[1], undefined, {"role": order[0]});
    }
}
