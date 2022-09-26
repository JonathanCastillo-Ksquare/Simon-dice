let stgSquares = [];
let round = 0;
let playerPatron = 0;
let state = "nextLevel";

// We add the audios into an array

const buttonSounds = [
    new Audio('./sounds/red.mp3'),
    new Audio('./sounds/green.mp3'),
    new Audio('./sounds/yellow.mp3'),
    new Audio('./sounds/blue.mp3')
];

let title = document.getElementById('title');
let subtitle = document.getElementById('subtitle');
let red = document.getElementById('red');
let green = document.getElementById('green');
let yellow = document.getElementById('yellow');
let blue = document.getElementById('blue');
let start = document.getElementById('startBtn');
let reset = document.getElementById('resetBtn');
let hardmode = document.getElementById('hard');



let squares = [red, green, yellow, blue];

reset.disabled = true;

hardmode.addEventListener('click', function () {
    hardmode.disabled = true;
})

start.addEventListener('click', function () {
    if (state === "nextLevel" || state === "reset" || state === "win" || state === "gameOver") {
        state = "waitingForPatron"
        newLevel();
        stgSquares = [];
        round = 0;
        playerPatron = 0;
        reset.disabled = false;
        hardmode.disabled = true;
        title.innerText = "Simon Says!";
    }
});

reset.addEventListener('click', function () {
    state = "reset"
    newLevel();
    stgSquares = [];
    round = 0;
    playerPatron = 0;
    hardmode.disabled = true;

});


function newLevel() {
    if (round < 20) {
        start.disabled = true;
        setTimeout(() => {
            round += 1;
            subtitle.innerText = 'Round: ' + round;
            let nextColor = Math.floor(Math.random() * 4);
            let nextSquare = squares[nextColor];
            stgSquares.push(nextSquare);
            playerPatron = 0;
            let secuenceIndex = 0;
            let timer = setInterval(() => {
                const btn = stgSquares[secuenceIndex];
                btn.classList.toggle('active');
                setTimeout(() => {
                    btn.classList.toggle('active')
                    soundPlace = squares.indexOf(btn);
                    buttonSounds[soundPlace].play();
                }, 250);
                secuenceIndex += 1;
                if (secuenceIndex >= round) {
                    clearInterval(timer);
                }
            }, 500);
            state = "waitingForPlayer";
        }, 1000);
    }
    else {
        state = "win";
        title.innerText = "Press start for a new attempt"
        subtitle.innerText = "You win";
        start.disabled = false;
        reset.disabled = true;
    }
}

red.addEventListener('click', squarePress);
green.addEventListener('click', squarePress);
yellow.addEventListener('click', squarePress);
blue.addEventListener('click', squarePress);

function squarePress(event) {
    if (state === "waitingForPlayer") {
        var button = event.target;
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active')
        }, 300);
        if (button === stgSquares[playerPatron]) {
            playerPatron += 1;
            if (playerPatron === stgSquares.length) {
                subtitle.innerText = 'Good, keep going!';
                newLevel();
            }

        }
        else if (!(button === stgSquares[playerPatron]) && hardmode.checked) {
            subtitle.innerText = 'Game over';
            state = "gameOver";
            start.disabled = false;
            squares.disabled = true;
            hardmode.disabled = false;
        }
        else {
            subtitle.innerText = 'You fail!'
            start.disabled = false;
            hardmode.disabled = true;
            repeatLevel();
        }
        soundPlace2 = squares.indexOf(button);
        buttonSounds[soundPlace2].play();
    }
}

function repeatLevel() {
    start.disabled = true;
    setTimeout(() => {
        subtitle.innerText = 'Round: ' + round;
        playerPatron = 0;
        let secuenceIndex = 0;
        let timer = setInterval(() => {
            const btn = stgSquares[secuenceIndex];
            btn.classList.toggle('active');
            setTimeout(() => {
                btn.classList.toggle('active');
                soundPlace3 = squares.indexOf(btn);
                buttonSounds[soundPlace3].play();
            }, 250);
            secuenceIndex += 1;
            if (secuenceIndex >= round) {
                clearInterval(timer);
            }
        }, 500);
        state = "waitingForPlayer"
    }, 1000);
}











