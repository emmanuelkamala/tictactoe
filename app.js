const cellDivs = document.querySelectorAll('.game-cell');
let gameStart = true;
let currentPlayer = true;

// functions

const handleWin = (player) => {
    const statusDiv = document.querySelector('.status');
    gameStart = false;
    if (player === 'x') {
        statusDiv.innerHTML = `${player1} has won`;
    } else {
        statusDiv.innerHTML = `<span>${player2} has won</span>`;
    }
}

const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[1];
    const topMiddle = cellDivs[1].classList[1];
    const topRight = cellDivs[2].classList[1];
    const middleLeft = cellDivs[3].classList[1];
    const middleMiddle = cellDivs[4].classList[1];
    const middleRight = cellDivs[5].classList[1];
    const bottomLeft = cellDivs[6].classList[1];
    const bottomMiddle = cellDivs[7].classList[1];
    const bottomRight = cellDivs[8].classList[1];   
    const statusDiv = document.querySelector('.status');
    

    // Check winner

    if (topLeft && topLeft === topMiddle && topLeft === topRight) {
      handleWin(topLeft); 
      cellDivs[0].classList.add('won');
      cellDivs[1].classList.add('won');
      cellDivs[2].classList.add('won'); 
    } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
      handleWin(middleLeft);
      cellDivs[3].classList.add('won');
      cellDivs[4].classList.add('won');
      cellDivs[5].classList.add('won'); 
    }
    else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
        handleWin(bottomLeft);
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won'); 
    }else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
      cellDivs[3].classList.add('won');
      cellDivs[6].classList.add('won'); 
    }else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
      cellDivs[4].classList.add('won');
      cellDivs[8].classList.add('won'); 
    }else if (topMiddle &&  topMiddle === middleMiddle && topMiddle === bottomMiddle) {
        handleWin(topMiddle);
        cellDivs[1].classList.add('won');
      cellDivs[4].classList.add('won');
      cellDivs[7].classList.add('won'); 
    }else if (topRight && topRight === middleRight && topRight === bottomRight) {
        handleWin(topRight);
        cellDivs[2].classList.add('won');
      cellDivs[5].classList.add('won');
      cellDivs[8].classList.add('won'); 
    }else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
        handleWin(topRight);
        cellDivs[2].classList.add('won');
      cellDivs[4].classList.add('won');
      cellDivs[6].classList.add('won'); 
    }else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
        handleWin(bottomLeft);
        cellDivs[6].classList.add('won');
      cellDivs[7].classList.add('won');
      cellDivs[8].classList.add('won'); 
    } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle 
               && middleRight && bottomLeft && bottomMiddle && bottomRight){
              gameStart = false;
              statusDiv.innerHTML = 'It is a Draw';
    } else {
        currentPlayer = !currentPlayer;
        if (currentPlayer){
            statusDiv.innerHTML = `${player1} is next`;
        } else {
            statusDiv.innerHTML = `<span>${player2} is next</span>`;
        }
    }
};


// Clearing Items

const clearItems = () => {
    const statusDiv = document.querySelector('.status');
    player1 = document.getElementById('first-player');
    player2 = document.getElementById('second-player');
    player1.value = '';
    player2.value = '';
    statusDiv.innerHTML = '';
}


// Event handlers

const handleReset = () => {
    currentPlayer = true;
    for (const cellDiv of cellDivs){
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }

    handleStartButton();
    gameStart = true;
    clearItems();
};

const handleCellClick = (e) => {
    const clicked = e.target.classList;

    if ( !gameStart || clicked[1] === 'x' || clicked[1] === 'o'){
        return;
    }

    if (currentPlayer) {
        clicked.add('x');
        checkGameStatus();
    } else {
        clicked.add('o');
        checkGameStatus();
    }
};


const handleStartButton = () => {
    const gamePlayers = document.getElementById('players');
    const newGame = document.getElementById('game');
    player1 = document.getElementById('first-player').value;
    player2 = document.getElementById('second-player').value;
    if (player1 === '' && player2 === ''){
        alert('Please enter names for player one and player two');
        return;
    }
    newGame.classList.toggle('visible');
    gamePlayers.classList.toggle('invisible');
 }


// Event listeners



for (const cellDiv of cellDivs){
    cellDiv.addEventListener('click', handleCellClick);
}

document.getElementById('start').addEventListener('click', handleStartButton);
document.querySelector('.reset').addEventListener('click', handleReset);

