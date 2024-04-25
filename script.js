import Ball from './components/Ball.js';
import Paddle from './components/Paddle.js';

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");

const startBtn = document.getElementById("start-btn");
const form = document.getElementById("form");
const userName = document.getElementById("name");
const difficulty = document.getElementById("difficulty");
const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const playerName = document.getElementById("player-name");
const computerName = document.getElementById("computer-name");

let VELOCITY_INCREASE;

difficultyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        difficulty.textContent = btn.innerHTML;
        console.log(difficulty.textContent);
        switch(btn.innerHTML) {
            case "Easy":
                computerName.textContent = "Mann"
                VELOCITY_INCREASE = 0.0000001
                break;
            case "Normal":
                computerName.textContent = "Varun"
                VELOCITY_INCREASE = 0.000001
                break;
            case "Hard":
                computerName.textContent = "Sakshi"
                VELOCITY_INCREASE = 0.00001
                break;
            case "Impossible": 
                computerName.textContent = "Sheli"
                VELOCITY_INCREASE = 0.00001
                break;
        }
    });
})

startBtn.addEventListener("click", () => {
    playerName.textContent = userName.value;
    form.style.display = 'none';

    // sets ball in motion
    isGameRunning = true;

    // request animation frames - runs game in loop by calling update recursively
    window.requestAnimationFrame(update);

    // allow playerpaddle to move
    document.addEventListener("mousemove", e => {
        playerPaddle.position = (e.y / window.innerHeight) * 100;
    })    
    }
);


let lastTime;
let isGameRunning = false;

function update(time) {
    if(lastTime != null && isGameRunning) {
        const delta = time - lastTime;
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()], VELOCITY_INCREASE);
        computerPaddle.update(delta, ball.y, difficulty.textContent);

        if(isLose()) {
            handleLose();
        }
    }
    lastTime = time;
    window.requestAnimationFrame(update);
}

function isLose() {
    const rect = ball.rect();
    return (rect.right >= window.innerWidth || rect.left <= 0);
}

function handleLose() {
    const rect = ball.rect();
    if( rect.right >= window.innerWidth) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
    }
    ball.reset();
    computerPaddle.reset();
}

