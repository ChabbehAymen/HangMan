import {MainViewModel} from "./models/MainViewModel.mjs";

const splashScreen = document.querySelector('.splash-screen');
const  splashScreenBtn = document.querySelector('.splash-screen-btn');
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");


const mainViewModel = new MainViewModel();


splashScreenBtn.addEventListener('click', ()=>{
    splashScreen.style.display = 'none';
});
const resetGame = () => {
    // Ressetting game variables and UI elements
    mainViewModel.reset();
    hangmanImage.src = "./imgs/hangman-0.svg";
    guessesText.innerText = `${mainViewModel.wrongGuessCount} / ${mainViewModel.maxGuesses}`;
    wordDisplay.innerHTML = mainViewModel.currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = () => {

    resetGame();
    // display hint of the word
    document.querySelector(".hint-text b").innerText = mainViewModel.wordHint;
}

const gameOver = (isVictory) => {
    console.log('game over');
    // After game complete.. showing modal with relevant details
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${mainViewModel.currentWord}</b>`;
    gameModal.classList.add("show");
}

const initGame = (button, clickedLetter) => {
    // Checking if clickedLetter is exist on the currentWord
    if(mainViewModel.currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...mainViewModel.currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                mainViewModel.addCorrectLetters(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        mainViewModel.wrongGuess();
        hangmanImage.src = `./imgs/hangman-${mainViewModel.wrongGuessCount}.svg`;
    }
    button.disabled = true; // Disabling the clicked button so user can't click again
    guessesText.innerText = `${mainViewModel.wrongGuessCount} / ${mainViewModel.maxGuesses}`;

    console.log(mainViewModel.correctLettersLength);
    // Calling gameOver function if any of these condition meets
    if(mainViewModel.wrongGuessCount === mainViewModel.maxGuesses) return gameOver(false);
    if(mainViewModel.correctLettersLength === mainViewModel.currentWord.length) return gameOver(true);

}

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);