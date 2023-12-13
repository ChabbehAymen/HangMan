import {wordList} from "../data/word-list.mjs";
export class MainViewModel {
    // this view model handles all what is related to data
    #currentWord; // holds the word to guess
    #correctLetters; // letter that were right
    #wrongGuessCount; // how many times the user field
    #maxGuesses = 6; // max tries
    #wordHint; // the hint that related to word
    #category;
    #timeCounter;


    //  resets
    reset(){
        this.#wrongGuessCount = 0;
        this.#correctLetters = [];
        this.#timeCounter = 40;
        this.getWords();
    }

    getWords(){
        // Selecting a random word and hint from the wordList
        if (this.#category === 'football'){
            const {word, hint} = this.getData(0);
            console.log(word);
            if (this.currentWord === word ){
                this.getWords();
            }
            this.#currentWord = word;
            this.#wordHint = hint;
        }else {
            const {word, hint} =  this.getData(1);
            console.log(word);
            if (this.currentWord === word ){
                this.getWords();
            }
            this.#currentWord = word;
            this.#wordHint = hint;
        }
    }

    getData(index){
        return wordList[index].words[Math.floor(Math.random() * wordList[index].words.length)];
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

    get timeCounter(){
        return this.#timeCounter;
    }
    decreaseTimeCounter(){
        this.#timeCounter--;
    }

    setCategory(category){
        this.#category = category;
    }
    wrongGuess(){
        this.#wrongGuessCount++;
    }

}