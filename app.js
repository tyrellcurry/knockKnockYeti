const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');
const natureDoor = './images/door-one.png';
const skiingDoor = './images/door-two.png';
const yetiDoorPath = 'http://127.0.0.1:5500/images/yeti-door.png';
const closedDoorPath = 'http://127.0.0.1:5500/images/closed-door2.png';
const startButton = document.getElementById('start');
const statusText = document.getElementById('status');
const counterText = document.getElementById('counter');
const highScore = document.getElementById('highscore');
let score = 0;
let counter = 0; 
let streak = 0;
let numClosedDoors = 3;
let openDoor1, openDoor2, openDoor3;
let currentlyPlaying = true;





const randomDoorGenerator = () => {
    let yetiDoor = Math.floor(Math.random() * numClosedDoors);

    if(yetiDoor === 0){
        openDoor1 = yetiDoorPath;
        openDoor2 = natureDoor;
        openDoor3 = skiingDoor;
    }
    else if(yetiDoor === 1){
        openDoor2 = yetiDoorPath;
        openDoor3 = natureDoor;
        openDoor1 = skiingDoor;
    }
    else if(yetiDoor === 2){
        openDoor3 = yetiDoorPath;
        openDoor1 = natureDoor;
        openDoor2 = skiingDoor;
    }

}

const isYeti = door => {
    if(door.src === yetiDoorPath) {
        return true;
    }
    return false;
}

const isClicked = door => {
    if (door.src === closedDoorPath) {
        return false;
    }
    return true;
};

const playDoor = door => {
    numClosedDoors = numClosedDoors - 1;
    if (numClosedDoors === 0){
        gameOver('win');
    }
    else if (isYeti(door) === true){
        gameOver();
    }
};


doorImage1.onclick = () => {
    if (!isClicked(doorImage1) && currentlyPlaying){
        doorImage1.src = openDoor1;
        playDoor(doorImage1)
    }
}

doorImage2.onclick = () => {
    if (!isClicked(doorImage2) && currentlyPlaying){
        doorImage2.src = openDoor2;
        playDoor(doorImage2)
    }

};
doorImage3.onclick = () => {
    if (!isClicked(doorImage3) && currentlyPlaying){
        doorImage3.src = openDoor3;
        playDoor(doorImage3)
    }
      
};

function gameOver(status) {
    currentlyPlaying = false;
    if(status == 'win'){
        statusText.innerHTML = 'You won! Great job!';
        start.innerHTML = 'Play Again';
        counter++;
        counterText.innerHTML = `${counter}`;
    }
    else {
        statusText.innerHTML = 'Oh no, you\'ve been Yeti\'d!';
        start.innerHTML = 'Play Again';
        if (counter > score){
            highScore.innerHTML = `${counter}`;
            score = counter;
       }
       else {
           highScore.innerHTML = `${score}`;
       }
        counter = 0;
        counterText.innerHTML = `${counter}`;
    }
    playModal();
};

startButton.onclick = () => {
    if(!currentlyPlaying){
        startRound();
    }
}

function startRound() {
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    numClosedDoors = 3;
    startButton.innerHTML = '';
    statusText.innerHTML = ''
    currentlyPlaying = true;
    randomDoorGenerator();
    counterText.innerHTML = `${counter}`;
    highScore.innerHTML = `${score}`;
    closeModal();
};

startRound();

document.getElementById('btn-instructions').onclick = () => {
    document.querySelector('.bg-modal').style.display = 'flex';
}

document.getElementById('close').onclick = () => {
    document.querySelector('.bg-modal').style.display = 'none';
}


function playModal() {
        document.querySelector('.bg-modal-game').style.display = 'flex';
    }

function closeModal() {
        document.querySelector('.bg-modal-game').style.display = 'none';
}

document.getElementById('close-game').onclick = () => {
    document.querySelector('.bg-modal-game').style.display = 'none';
    startRound();
}
    