/* tslint:disable:no-string-literal */

/*
    Initial Creep for inital energy supply

    1x WORK
    1x CARRY
    2x MOVE
*/

export function makeBlueprint(buget: number):string[] {
    buget = buget;
    return([WORK,CARRY,MOVE,MOVE]);
}

export function run(creep: Creep): void {
    if (<number> creep.carry.energy < creep.carryCapacity) {
        let sources = creep.room.find<Source>(FIND_SOURCES);
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    } else if (Game.spawns["Spawn1"].energy < Game.spawns["Spawn1"].energyCapacity) {
        if (creep.transfer(Game.spawns["Spawn1"], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns["Spawn1"]);
        }
    }
}
