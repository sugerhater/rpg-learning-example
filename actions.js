/**
 * Fight an enemy sub-routine
 */

// randomly select an enemy type
// fighting is health - attack, repeat until player or enemy health <= 0
// award gold based on enemy strength
const attack = (character) => {
    console.log("Attack not implemented.");

    return character;
}



/**
 * Rest sub-routine
 */
const rest = (character) => {
    character.gold -= 10;
    character.profession.health += 25;

    console.log("You have gained 25 health for 10 gold.");
    console.log(`You now have ${character.profession.health} health and ${character.gold} gold.`);

    return character;
}
// subtract gold, give health


/**
 * View character stats sub-routine
 */
const printStats = (character) => {
    const recursivePrint = (obj) => {
        for (var key in obj) {
            if (typeof obj[key] === 'object') {
                recursivePrint(obj[key])
            } else {
                console.log(`${key}: ${obj[key]}`);
            }
        }
    }

    console.log("Character Stats");
    console.log("---------------");
    recursivePrint(character);

    return character;
}

module.exports = {
    attack,
    rest,
    printStats
};