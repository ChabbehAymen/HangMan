import {MainViewModel} from "./models/MainViewModel.mjs";

const splashScreen = document.querySelector('.splash-screen');
const  groupSelector = document.querySelectorAll('.guesses-group');
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const container = document.querySelector('.container');
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangmanImage");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");
const timer = document.querySelector(".timer");
const exitBtn = document.querySelector('.container i');
let removedIndices = [];
let isGameOVer = false ;


const mainViewModel = new MainViewModel();


groupSelector.forEach( card =>{
    card.addEventListener('click', () =>{
        exitBtn.style.display = 'block';
        if (card.classList.contains('football-container')){
            mainViewModel.setCategory('football');
            hangmanImage.style.backgroundImage = 'url("./imgs/ronaldo.jpeg")';
        }else {
            mainViewModel.setCategory('bodyBuild');
            hangmanImage.style.backgroundImage = 'url("./imgs/sam-sulek.png")';
        }
        getRandomWord();
        // playAgainBtn.addEventListener("click", () => location.reload());
        splashScreen.style.display = 'none';
        startTimer();
    });
});
const resetGame = () => {
    // Resetting game variables and UI elements
    mainViewModel.resetData();
    createHidingDiv();
    guessesText.innerText = `${mainViewModel.wrongGuessCount} / ${mainViewModel.maxGuesses}`;
    wordDisplay.innerHTML = mainViewModel.currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
    // seconds = 40;
    timer.style.animation = '';
    removedIndices = [];
}

const getRandomWord = () => {
    resetGame();
    // display hint of the word
    document.querySelector(".hint-text b").innerText = mainViewModel.wordHint;
}

const gameOver = (isVictory) => {
    // After game complete showing modal with relevant details
    isGameOVer = true;
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${mainViewModel.currentWord}</b>`;
    gameModal.classList.add("show");
    if (isVictory){
        playAudio('./audio/win.wav');
        animateContainer('container-win-animation');
    }else{
        playAudio('./audio/lose.wav');
    }
}

const initGame = (button, clickedLetter) => {


    // Checking if clickedLetter is existed on the currentWord
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

        playAudio('./audio/correct.wav');
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        mainViewModel.wrongGuess();
        playAudio('./audio/wrong_sound_effect.mp3');
        animateContainer('container-error-animation');
    }
    button.disabled = true; // Disabling the clicked button so user can't click again
    guessesText.innerText = `${mainViewModel.wrongGuessCount} / ${mainViewModel.maxGuesses}`;

    // Calling gameOver function if any of these condition meets
    if(mainViewModel.wrongGuessCount === mainViewModel.maxGuesses) return gameOver(false);
    if(mainViewModel.correctLettersLength === mainViewModel.currentWord.length) {
        hangmanImage.innerHTML = '';
        return gameOver(true);
    }

}


function hideRandomDiv() {
    const gridItems = document.querySelectorAll('.cover'); // divs that hides the image in the container
    const availableIndices = Array.from(gridItems).map((item,index) => index).filter(index => !removedIndices.includes(index));
    console.log(availableIndices);
    if (availableIndices.length > 0) {
        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        const divToHide = gridItems[randomIndex];
        divToHide.style.opacity = '0';
        removedIndices.push(randomIndex);
    }
}

function startTimer() {
    console.log(isGameOVer)
    if (!isGameOVer){
        console.log(isGameOVer)
    setInterval(function () {
        mainViewModel.decreaseTimeCounter();
        timer.textContent = "Timer: " + mainViewModel.timeCounter + "s";
        if (mainViewModel.timeCounter < 20){
            timer.style.animation = 'time-out-animation 1s ease-in-out infinite';
        }
        if (mainViewModel.timeCounter === 0) {
            clearInterval()
            gameOver(false);
        }
    }, 1000);
    }
}

function createHidingDiv() {
    let currentWordLength = [...mainViewModel.currentWord].length;
    hangmanImage.innerHTML ='';
    let createDivs = ()=>{
        hangmanImage.innerHTML+='<div class="cover"></div>';

    }
    if ( currentWordLength % 2 === 0 ){
        for (let i = 0; i < currentWordLength; i++) {
            createDivs();
        }
    }else {
        currentWordLength++;
        for (let i = 0; i < currentWordLength; i++) {
            createDivs();
            timer.style.animation = '';
        }
    }
}

// plays audios in the error and in the win
function playAudio(src){
    let audio = new Audio(src);
    audio.play();
}

// animate the div container that hold the keyboard
function animateContainer(animation) {
    container.classList.add(animation);
    setTimeout(()=>{
    container.classList.remove(animation);
    }, 120);
}
// Creating keyboard buttons and adding event listeners

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

playAgainBtn.addEventListener("click", getRandomWord);
exitBtn.addEventListener('click', e => {location.reload()});