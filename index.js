/**
 * Player creates a character and then fights enemies of random
 * strength receiving gold for each enemy defeated. Player can
 * recover character health by resting, at the cost of gold.
 */

const inquirer = require("inquirer");
const Character = require("./Character");
const state = require("./state");

const menu = (character) => {
        // if character is found, welcome them back by name
        console.log(`Welcome back, ${character.name}`);
        return inquirer.prompt([
            {
                name: 'main',
                message: 'Choose your action',
                type: 'list',
                choices: ['Fight an enemy', 'Rest', 'Display stats']
            }
        ]).then((answers) => {
            // Pass our state and answers to the next step in the promise chain.
            return { character, selection: answers.main };
        });
}

const handleMenuSelection = ({ character, selection }) => {
    switch (selection) {
        case 'Fight an enemy':
        case 'Rest':
        case 'Display stats':
        default:
            console.log(character, selection)
            // ... after some undefined outcome return the updated character
            return character;
    }
}

const handleError = (err) => {
    // File not found, or not parsable
    return createCharacter();
}

/**
 * Create a character sub-routine
 */
const createCharacter = () => {
    // Welcome them for the first time
    console.log('It looks like you are new here.')
    console.log("Let's make your character");

    // offer choices of fighter thief mage
    // fighter - high health, low damage.
    // thief - medium health, critical chance
    // mage - low health, high damage.
    return inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is your name?'
        },
        {
            name: 'profession',
            type: 'list',
            message: 'What is your profession?',
            choices: ['Warrior', 'Thief', 'Mage']
        }
    ]).then(({ name, profession }) => {
        // Create the character object
        const character = new Character(name, profession);

        return state.write(character)
    }).then(() => {
        console.log("Character created successfully")
    }).catch(err => {
        console.error("Unable to save your character.", err)
    })
}



console.log('RPG Game') // Make this more exciting...

state.read()
    .then(menu)
    .then(handleMenuSelection)
    .then(state.write)
    .catch(handleError);
