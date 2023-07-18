// NodeJS Deeper Dive
// In this script, we are using the assert module to test some logic specific to PacMan. We have two functions: 
// calculateScore() which calculates the score based on the number of pellets and ghosts eaten, and canProceedToNextLevel() 
// which checks if PacMan has eaten all pellets in the current level. The assert.strictEqual() method checks if the function 
// returns the expected values, if not, it throws an error with the message we provided. If all tests pass, we print out 
// a success message.

const assert = require('assert');

// Let's imagine we are testing a simple function in PacMan game that calculates player's score
function calculateScore(pelletsEaten, ghostsEaten) {
    return (pelletsEaten * 10) + (ghostsEaten * 200);
}

// Now let's test our function with assert
try {
    // The PacMan has eaten 50 pellets and 2 ghosts, so the score should be 900
    assert.strictEqual(calculateScore(50, 2), 900, 'PacMan score calculation failed');
    console.log('Score calculated correctly for 50 pellets and 2 ghosts eaten.');

    // If the PacMan has eaten no pellets and no ghosts, the score should be 0
    assert.strictEqual(calculateScore(0, 0), 0, 'PacMan score calculation failed');
    console.log('Score calculated correctly for no pellets and no ghosts eaten.');
} catch (error) {
    console.log(error.message);
}

// Let's imagine we are testing if PacMan can proceed to the next level
function canProceedToNextLevel(pelletsEaten) {
    return pelletsEaten === 244; // PacMan needs to eat all 244 pellets to proceed
}

// Now let's test our function with assert
try {
    // PacMan has eaten all 244 pellets, so should be able to proceed
    assert.strictEqual(
        canProceedToNextLevel(244), 
        true, 
        'Level progression check failed'
    );
    console.log('PacMan who has eaten all pellets can proceed to next level.');

    // PacMan has only eaten 200 pellets, so should not be able to proceed
    assert.strictEqual(
        canProceedToNextLevel(200), 
        false, 
        'Level progression check failed'
    );
    console.log('PacMan who has not eaten all pellets cannot proceed to next level.');
} catch (error) {
    console.log(error.message);
}
