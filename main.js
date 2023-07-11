//@ts-check
const readline = require('readline');
const { getRandomWord, isLetterInWord, revealLetterPositions } = require('./hangmanUtils');
const { MAX_ATTEMPTS, guessedWordColor, resetColor, guessedLettersColor, remainingLivesColor,  } = require('./hangmanConstants');

function initializeGame() {
    const word = getRandomWord();
    const wordLength = word.length;
    const remainingAttempts = MAX_ATTEMPTS;
    const guessedLetters = [];
    const revealedPositions = new Array(wordLength).fill('_');

    return { word, wordLength, remainingAttempts, guessedLetters, revealedPositions };
}

function displayGameState(gameState) {
    const { revealedPositions, remainingAttempts, guessedLetters } = gameState;

    const formattedWord = getRevealedWord(revealedPositions);
    const formattedAttempts = getRemainingAttempts(remainingAttempts);
    const formattedLetters = getGuessedLetters(guessedLetters);

    console.clear();
    console.log(`Remaining Attempts: ${formattedAttempts}  |  Guessed Letters: ${formattedLetters}`);
    console.log(`Word: ${formattedWord}`);
}

function getGuessedLetters(guessedLetters) {
    return guessedLetters.map(letter => `${guessedLettersColor}${letter}${resetColor}`).join(', ');
}

function getRemainingAttempts(remainingAttempts) {
    return `${remainingLivesColor}${remainingAttempts} ♡${resetColor}`;
}

function getRevealedWord(revealedPositions) {
    return revealedPositions.map(letter => `${guessedWordColor}${letter}${resetColor}`).join(' ');
}

function promptLetter(gameState, rl) {
    const { word, revealedPositions, remainingAttempts, guessedLetters } = gameState;

    rl.question('Enter a letter: ', (input) => {
        const letter = input.trim().toLowerCase();

        if (letter.length !== 1 || !letter.match(/[a-z]/)) {
            console.log('Please enter a valid letter.');
            promptLetter(gameState, rl);
            return;
        }

        if (guessedLetters.includes(letter)) {
            console.log('You have already guessed that letter. Try again.');
            promptLetter(gameState, rl);
            return;
        }

        guessedLetters.push(letter);

        if (isLetterInWord(word, letter)) {
            const updatedPositions = revealLetterPositions(word, letter, revealedPositions);
            gameState.revealedPositions = updatedPositions;
            if (!updatedPositions.includes('_')) {
                console.log('Congratulations! You guessed the word!');
                console.log(`The word was: ${word}`);
                rl.close();
                return;
            }
        } else {
            gameState.remainingAttempts--;
            if (remainingAttempts === 0) {
                console.log('Game Over!');
                console.log(`The word was: ${word}`);
                rl.close();
                return;
            }
        }

        displayGameState(gameState);
        promptLetter(gameState, rl);
    });
}

function playHangman() {
    const gameState = initializeGame();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('Welcome to Hangman!');
    console.log('Guess the word by entering one letter at a time.');

    displayGameState(gameState);
    promptLetter(gameState, rl);
}

playHangman();
