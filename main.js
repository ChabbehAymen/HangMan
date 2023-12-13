import {MainViewModel} from "./models/MainViewModel.mjs";

const splashScreen = document.querySelector('.splash-screen');
const  groupSelector = document.querySelectorAll('.guesses-group');
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangmanImage");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");
const timer = document.querySelector(".timer");
let seconds = 60;
let timerInterval;


const mainViewModel = new MainViewModel();


groupSelector.forEach( card =>{
    card.addEventListener('click', () =>{
        if (card.classList.contains('football-container')){
            mainViewModel.setCategory('football');
            hangmanImage.style.backgroundImage = 'url("./imgs/playerImg.png")';
        }else {
            mainViewModel.setCategory('bodyBuild');
            hangmanImage.style.backgroundImage = 'url("./imgs/playerImg.png")';
        }
        getRandomWord();
        playAgainBtn.addEventListener("click", () => location.reload());
        splashScreen.style.display = 'none';
        startTimer();
    });
});
const resetGame = () => {
    // Ressetting game variables and UI elements
    mainViewModel.reset();
    guessesText.innerText = `${mainViewModel.wrongGuessCount} / ${mainViewModel.maxGuesses}`;
    wordDisplay.innerHTML = mainViewModel.currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
    seconds = 60;
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
    // gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
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
                hideRandomDiv();
            }
        });
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        mainViewModel.wrongGuess();
    }
    button.disabled = true; // Disabling the clicked button so user can't click again
    guessesText.innerText = `${mainViewModel.wrongGuessCount} / ${mainViewModel.maxGuesses}`;

    // Calling gameOver function if any of these condition meets
    if(mainViewModel.wrongGuessCount === mainViewModel.maxGuesses) return gameOver(false);
    if(mainViewModel.correctLettersLength === mainViewModel.currentWord.length) return gameOver(true);

}

let removedIndices = [];
function hideRandomDiv() {
    const gridItems = document.querySelectorAll('.cover');
    const availableIndices = Array.from(gridItems).map((item, index) => index).filter(index => !removedIndices.includes(index));
    if (availableIndices.length > 0) {
        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        const divToHide = gridItems[randomIndex];
        divToHide.style.opacity = '0';
        removedIndices.push(randomIndex);
        console.log(removedIndices);
    }
}

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

function startTimer() {
    timerInterval = setInterval(function () {
        seconds--;
        timer.textContent = "Timer: " + seconds + "s";
        timer.style.position = 'absolute'
        timer.style.top = '30px'
        if (seconds === 0) {
            let audio = new Audio('over.mp3');
            audio.play()
            clearInterval()
            gameOver(false);
        }
    }, 1000);
}

