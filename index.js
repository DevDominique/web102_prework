/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {

        // create a new div element, which will become the game card
        const div = document.createElement("div");

        // add the class game-card to the list
        div.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        div.innerHTML = `
            <img src="${games[i].img}" alt="${games[i].name}" class="game-img">
            <h3>${games[i].name}</h3>
            <p>${games[i].description}</p>
            <p>Goal: $${games[i].goal.toLocaleString()}</p>
            <p>Pledged: $${games[i].pledged.toLocaleString()}</p>
        `;

        // append the game to the games-container
        gamesContainer.appendChild(div)

    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
    <p>${totalContributions.toLocaleString()}</p>
`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `
    <p>$${totalRaised.toLocaleString()}</p>
`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length;

gamesCard.innerHTML = `
    <p>${totalGames}</p>
`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;

    });
    console.log(`${unfundedGames.length}`);
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter ((game) => {
        return game.pledged >= game.goal;
    });
    console.log(`${fundedGames.length}`);
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const sumUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = 
    `A total of $${totalRaised.toLocaleString()} has been raised to bring ${totalGames} indie games to life—thanks to supporters like you. But, the story isn't finished. ${sumUnfundedGames} ${sumUnfundedGames > 1 ? "brilliant games still need": "brilliant game still needs"} funding and we need your help. Pledge today and be part of the Sea Monster legacy. Let's finish what we started—together!`

// create a new DOM element containing the template string and append it to the description container
const p = document.createElement("p");
p.textContent = displayStr;
p.classList.add("description-container");

descriptionContainer.appendChild(p);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
    const [firstGame, secondGame, ...rest] = sortedGames

    const {name: name1, description: desc1, pledged: pl1, goal: goal1, backers: bkrs1, img: img1} = firstGame;
    const {name: name2, description: desc2, pledged: pl2, goal: goal2, backers: bkrs2, img: img2} = secondGame;

// create a new element to hold the name of the top pledge game, then append it to the correct element
firstGameContainer.innerHTML = `
        <img src="${img1}" alt="${firstGame.name}" class="game-img">
        <h3>${name1}</h3>
        <p>${desc1}</p>
        <p>Goal: $${goal1.toLocaleString()}</p>
        <p>Pledged: $${pl1.toLocaleString()}</p>
        <p>Backers: ${bkrs1.toLocaleString()}</p>
    `;
secondGameContainer.innerHTML = `
        <img src="${img2}" alt="${secondGame.name}" class="game-img">
        <h3>${name2}</h3>
        <p>${desc2}</p>
        <p>Goal: $${goal2.toLocaleString()}</p>
        <p>Pledged: $${pl2.toLocaleString()}</p>
        <p>Backers: ${bkrs2.toLocaleString()}</p>
    `;

// do the same for the runner up item

// ******* Bonus features *********

//Search bar and button (in nav bar)
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

function runSearch() {
    const query = searchInput.value.toLowerCase().trim();

    //Filter games by name
    const matchedGames = GAMES_JSON.filter(game =>
        game.name.toLowerCase().includes(query)
    );

    //Clear and display matched games
    deleteChildElements(gamesContainer);
    addGamesToPage(matchedGames);

    //Jump down to search results
    const searchResults = document.getElementById("our-games");
    if (searchResults) {
        searchResults.scrollIntoView({behavior: "smooth"});
    }
 }

 //Add event listeners to search button 

    //Mouse click
 searchBtn.addEventListener("click", runSearch);

    //Key press (enter)
 searchInput.addEventListener("keydown", event=> {
    if (event.key === "Enter") {
        runSearch();
    }
 });

 //Pledge button handling
 const pledgeButtons = document.querySelectorAll('.pledge-btn');

 pledgeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const amount = button.dataset.amount;

        //Custom amount selected
        if (amount === 'pledge-custom') {
            let customAmount;
            
            while (true) {
                customAmount = prompt("Enter your pledge amount: ");
                
                //Exception handling and response for user input
                if (customAmount === null) {
                    break;
                }     
                
                if (!isNaN(customAmount) && Number(customAmount) > 0) {
                    alert(`Thank you for your pledge of $${customAmount}!`);
                    break;
                } else {
                    alert("Please enter a valid dollar amount.");
                }
            }    
        } else {
            alert(`Thank you for your pledge of ${amount}!`);
        }
    });
 });