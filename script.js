import countries from '/countries.json' assert { type: 'json' };

const startBtn = document.getElementById('startBtn');
const flagContainer = document.getElementById('flagContainer');
const answerButtons = document.getElementById('answerButtons');
const answrBtns = answerButtons.getElementsByTagName('button');
const timeoutSpan = document.getElementById('timeout');
const guessCountEl = document.getElementById('guessCount');

let selectedCountries = [];
let randomNum = 0;
let isCurrentGuessMade = false;
let guessedCountries = 0;

startBtn.addEventListener('click', () => {
    startTheGame();
});

answrBtns[0].addEventListener('click', () => {
    tryToGuess(0);
});

answrBtns[1].addEventListener('click', () => {
    tryToGuess(1);
});

answrBtns[2].addEventListener('click', () => {
    tryToGuess(2);
});


function startTheGame() {
    isCurrentGuessMade = false;
    hideStartButton();
    setRandomCountries();
    showAnswerButtons();
    showGuessingImg();
    showGuessingButtons();
}

function hideStartButton() {
    startBtn.style.visibility = 'hidden';
}

function showAnswerButtons() {
    answerButtons.style.visibility = 'visible';
}

function setRandomCountries() {
    randomNum = Math.floor(Math.random() * 3);
    const firstRand = Math.floor(Math.random() * 261);
    const secondRand = Math.floor(Math.random() * 261);
    const thirdRand = Math.floor(Math.random() * 261);
    const first = countries[firstRand];
    const second = countries[secondRand];
    const third = countries[thirdRand];
    selectedCountries[0] = first;
    selectedCountries[1] = second;
    selectedCountries[2] = third;
    console.log(randomNum, selectedCountries);
}

function showGuessingImg() {
    const img = flagContainer.getElementsByTagName('img')[0];
    img.style.visibility = 'visible';
    img.src = 'images/' + selectedCountries[randomNum].code + '.svg';
}

function showGuessingButtons() {
    const buttons = answerButtons.getElementsByTagName('button');
    buttons[0].innerHTML = selectedCountries[0].name;
    buttons[1].innerHTML = selectedCountries[1].name;
    buttons[2].innerHTML = selectedCountries[2].name;
}

function tryToGuess(num) {
    if (isCurrentGuessMade) {
        return;
    }
    isCurrentGuessMade = true;
    const check = checkIfRightGuess(num);
    if (check) {
        guessedCountries += 1;
    }
    addStyleToButton(num, check);
    startTheTimer();
    changeGuessedCountriesCounter();
    setTimeout(() => {
        startTheGame();
        removeTheStyleFromButton(num, check);
    }, 3000)
}

function checkIfRightGuess(num) {
    return selectedCountries[num].code === selectedCountries[randomNum].code;
}

function addStyleToButton(num, isTrue) {
    answrBtns[num].classList.add(isTrue ? 'button-60-guessed' : 'button-60-not-guessed');
}

function removeTheStyleFromButton(num, isTrue) {
    answrBtns[num].classList.remove(isTrue ? 'button-60-guessed' : 'button-60-not-guessed');
}

function startTheTimer() {
    timeoutSpan.style.visibility = 'visible';
    timeoutSpan.innerHTML = 3;
    let timeout = 3;
    const interval = setInterval(() => {
        if (timeout === 1) {
            clearInterval(interval);
            timeoutSpan.style.visibility = 'hidden';
        }
        timeout = timeout - 1;
        timeoutSpan.innerHTML = timeout;
    }, 1000);
}

function changeGuessedCountriesCounter() {
    guessCountEl.innerHTML = 'Guessed ' + guessedCountries;
}