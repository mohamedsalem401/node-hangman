// Load the list of words from a JSON file
const words = require('./words.json').words;

// Function to select a random word from the list
function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Function to check if a letter exists in the word
function isLetterInWord(word, letter) {
  return word.includes(letter);
}

// Function to reveal positions of a letter in the word
function revealLetterPositions(word, letter, positions) {
  const revealedPositions = positions.slice();
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      revealedPositions[i] = letter;
    }
  }
  return revealedPositions;
}

module.exports = { getRandomWord, isLetterInWord, revealLetterPositions };