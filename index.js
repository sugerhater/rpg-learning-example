/**
 * Player creates a character and then fights enemies of random
 * strength receiving gold for each enemy defeated. Player can
 * recover character health by resting, at the cost of gold.
 */


// attempt to load a save file - save.json

// if character is found, welcome them back by name
// else welcome them for the first time

// display list of possible actions
// - create new character
// - * fight an enemy
// - * rest
// - * view character stats
//
// * if character found


/**
 * Create a character sub-routine
 */

// offer choices of fighter thief mage
// fighter - high health, low damage.
// thief - medium health, critical chance
// mage - low health, high damage.

// create character object


/**
 * Fight an enemy sub-routine
 */

// randomly select an enemy type
// fighting is health - attack, repeat until player or enemy health <= 0
// award gold based on enemy strength



/**
 * Rest sub-routine
 */

// subtract gold, give health
 

/**
 * View character stats sub-routine
 */

// Pretty print save.json


/**
 * Save character sub-routine
 */

// Json stringify the character, and write to save.json