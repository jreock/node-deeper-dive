// NodeJS Deeper Dive
// This code starts by defining an object nesGame with properties including the title, year, and a few reviews of the game. 
// It then uses the destructuring assignment feature in JavaScript to extract the title and year into separate variables 
// and to place the remaining properties (all of which are reviews) into a new object reviews. Finally, it logs the reviews 
// object to the console.

// Creating an object representing an NES game
const nesGame = {
   title: "Ninja Gaiden",
   year: "1990",
   review1: "Best game ever…",
   review2: "Meh",
   review3: "Not Zelda",
   review4: "Better than ET for Atari"
};

// Using destructuring assignment to get the title, year, and remaining properties (reviews) of the nesGame object
const { title, year, ...reviews } = nesGame;

// Logging the reviews to the console
console.log(reviews);
 
