// HTML elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

// Game variables

let gameStart = true;
let currentPlayer = true;


// Event handlers

const handleReset = (e) => {
    console.log(e);
}

const handleCellClick = (e) => {
    const clicked = e.target.classList;
    const location = clicked[1];

    if (clicked[2] === 'x' || clicked[2] === 'o'){
        return;
    }

    if (currentPlayer) {
        clicked.add('x');
        currentPlayer = !currentPlayer;
    } else {
        clicked.add('o');
        currentPlayer = !currentPlayer;
    }
};


// Event listeners

resetDiv.addEventListener('click', handleReset);

for (const cellDiv of cellDivs){
    cellDiv.addEventListener('click', handleCellClick);
}

