import {wordList} from "../data/word-list.mjs";
export class MainViewModel {
    // this view model handles all what is related to data
    #currentWord; // holds the word to guess
    #correctLetters; // letter that were right
    #wrongGuessCount; // how many times the user field
    #maxGuesses = 6; // max tries
    #wordHint; // the hint that related to word
    #category;


    //  resets
    reset(){
        this.#wrongGuessCount = 0;
        this.#correctLetters = [];
        // this.getWords();
        if (isNaN(this.currentWord) && cu)
        this.#currentWord = 'qw';
        this.#wordHint = 'test';
    }

    getWords(){
        // Selecting a random word and hint from the wordList
        let word = '';
        let hint = '';
        let randomWordAndHint = ()=>{
            if (this.#category === 'football'){
                const {mWrod, mHint} = wordList[0].words[Math.floor(Math.random() * wordList.length)];
                word = mWrod;
                hint = mHint;
            }else {
                const {mWrod, mHint} =  wordList[1].words[Math.floor(Math.random() * wordList.length)];
                word = mWrod;
                hint = mHint;
            }
        }

        if(isNaN(this.#currentWord) && word !== this.currentWord){
            randomWordAndHint()
        }
        else {
            this.#currentWord = word;
        }
    }


    addCorrectLetters(letter){
        this.#correctLetters.push(letter);
    }

    get correctLettersLength(){
        return this.#correctLetters.length;
    }

    get currentWord(){
        console.log(this.#currentWord);
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

    setCategory(category){
        this.#category = category;
    }
    wrongGuess(){
        this.#wrongGuessCount++;
    }

}