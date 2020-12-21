/**
 * Player creates a character and then fights enemies of random
 * strength receiving gold for each enemy defeated. Player can
 * recover character health by resting, at the cost of gold.
 */

const Game = require("./Game");
const { CommandLineInterface } = require("./interface");
const { FileSystemState } = require("./state");
const EventTypes = require('./EventTypes');

const interface = new CommandLineInterface();
const state = new FileSystemState();
const game = new Game();

game.on(EventTypes.PROMPTS, (prompts) => {
    // When the game needs prompts, prompt the player.
    interface.promptPlayer(prompts)
    // And then listen for the response from the interface, and emit it back
    // to the game, which is listening to itself for a single response.
    interface.once(
        EventTypes.PROMPT_RESPONSE,
        (responses) => game.emit(EventTypes.PROMPT_RESPONSE, responses)
    );
});

// When the game updates the state, we save it.
game.on(EventTypes.UPDATE_STATE, (newState) => state.write(newState));

// When a message from the game comes in, ask the interface to handle it.
game.on(EventTypes.MESSAGE, (message) => interface.handleMessage(message));

// When the player want's to view their character, ask the interface to do it.
game.on(EventTypes.VIEW_CHARACTER, (character) => interface.viewCharacter(character));

// When the character has died. View their character one last time, and then delete the save.
game.on(EventTypes.CHARACTER_DEATH, (character) => {
    interface.handleDeath(character);
    // If there is an error, console error it.
    state.del(err => { if (err) console.error(err) });
})

// Initial state load we want to start the interface, when the state updates
// after that we just want to update the game and interface
state.once(EventTypes.STATE_UPDATED, (newState) => {
    game.setState(newState);

    // Set up a listener for the rest of the state updates after the
    // first time the save loads.
    state.on(EventTypes.STATE_UPDATED, (newState) => {
        game.setState(newState);
    });

    process.nextTick(() => {
        game.start();
    })
})


// Load the save file.
process.nextTick(() => {
    state.read();
})
