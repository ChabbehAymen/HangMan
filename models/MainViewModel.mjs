import {wordList} from "../data/word-list.mjs";
export class MainViewModel {
    // this view model handles all what is related to data
    #currentWord; // holds the word to guess
    #correctLetters; // letter that were right
    #wrongGuessCount; // how many times the user field
    #maxGuesses = 6; // max tries
    #wordHint; // the hint that related to word

    //  resets
    reset(){
        this.#wrongGuessCount = 0;
        this.getWords();
        this.#correctLetters = [];
    }

    getWords(){
        // Selecting a random word and hint from the wordList
        const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
        this.#currentWord = word;
        this.#wordHint = hint;
    }

    addCorrectLetters(letter){
        this.#correctLetters.push(letter);
    }

    get correctLettersLength(){
        return this.#correctLetters.length;
    }

    get currentWord(){
        return this.#currentWord;
    }
    get wordHint(){
        return this.#wordHint;
    }

    get maxGuesses(){
        return this.#maxGuesses;
    }

    get wrongGuessCount(){
        return this.#wrongGuessCount;
    }
    wrongGuess(){
        this.#wrongGuessCount++;
    }

}