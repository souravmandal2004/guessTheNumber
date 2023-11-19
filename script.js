let randomNumber = parseInt (Math.random () * 100 + 1);

// Select all the necessary elements
const submit = document.querySelector ("#btn");
const userInput = document.querySelector ("#numberGuessed");
const guessSlot = document.querySelector (".guesses");
const remaining = document.querySelector (".lastResult");
const lowOrHi = document.querySelector (".lowOrHi");
const startOver = document.querySelector (".resultParas");

// create a paragraph
const p = document.createElement('p');

let prevGuess = [];
let numGuesses = 1;
let playGame = true;

if (playGame) {
    submit.addEventListener('click', function (event) {
        event.preventDefault ();
        const guess = parseInt (userInput.value);
        validateGuess (guess);
    });
}

function validateGuess (guess) {

    if (isNaN (guess)) {
        alert("Please enter a valid number");
    }
    else if (guess < 1) {
        alert ("Please enter a number more than 1");
    }
    else if (guess > 100) {
        alert ("Please enter a number less than 100");
    }
    else {
        prevGuess.push (guess);

        if (numGuesses === 11) {
            displayGuess (guess);
            displayMsg (`Game Over. Random Number was ${randomNumber}`);
            endGame ();
        }
        else {
            displayGuess (guess);
            checkGuess (guess);
        }
    }
}

function checkGuess (guess) {

    if (guess === randomNumber) {
        displayMsg (`You guessed it right.`);
        endGame ();
    }
    else if (guess < randomNumber) {
        displayMsg ("Number is too low!!");
    }
    else if (guess > randomNumber) {
        displayMsg ("Number is too high!!");
    }
}

function displayGuess (guess) {

    userInput.value = '';
    guessSlot.innerHTML += `${guess},`;
    numGuesses ++;
    remaining.innerHTML = `${11 - numGuesses}`;

}

function displayMsg (msg) {

    lowOrHi.innerHTML =  `<h2>${msg}</h2>`

}

function newGame () {

    const newGameBtn = document.querySelector ('#newGame')
    newGameBtn.addEventListener ('click', function () {
        let randomNumber = parseInt (Math.random () * 100 + 1);
        prevGuess = [];
        numGuesses = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numGuesses}`;
        userInput.removeAttribute ('disabled');
        startOver.removeChild (p);


        playGame = true;
    });
}

function endGame () {


    userInput.value = '';
    userInput.setAttribute ('disabled', '');
    p.classList.add ('button');
    p.innerHTML = `<h2 id="newGame">Start new Game</h2>`
    startOver.appendChild (p);
    playGame = false;
    newGame ();
}