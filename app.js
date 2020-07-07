const playerFactory = (name, mark) => {
    const playTurn = (board, cell) => {
      const idx = board.cells.findIndex(position => position === cell);
      if (board.positions[idx] === '') {
        board.render();
        return idx;
      }
      return null;
    };
  
    return { name, mark, playTurn };
  };


  const boardModule = (() => {
    let positions = ['', '', '', '', '', '', '', '', ''];
    const gameBoard = document.querySelector('#board');
    const cells = Array.from(document.querySelectorAll('.cell'));
    let winner = null;
  
    const render = () => {
      positions.forEach((mark, idx) => {
        cells[idx].textContent = positions[idx];
      });
    };
  
    const reset = () => {
      positions = ['', '', '', '', '', '', '', '', ''];
    };
  
    const checkWinner = () => {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      winningCombinations.forEach((winningCombo) => {
        if (positions[winningCombo[0]]
          && positions[winningCombo[0]] === positions[winningCombo[1]]
          && positions[winningCombo[0]] === positions[winningCombo[2]]) {
          winner = 'current';
        }
      });
      return winner || (positions.includes('') ? null : 'It\'s a draw');
    };
  
    return {
      render, gameBoard, cells, positions, checkWinner, reset,
    };
  })();


  const gameStart = (() => {
    const playerOneName = document.querySelector('#player1');
    const playerTwoName = document.querySelector('#player2');
    const form = document.querySelector('.player-info');
    const resetBtn = document.querySelector('#reset');
    let currentPlayer;
    let playerOne;
    let playerTwo;
  
    const turnTaken = () => {
      currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    };
  
    const gameRound = () => {
      const board = boardModule;
      const gameStatus = document.querySelector('.game-status');
      if (currentPlayer.name !== '') {
        gameStatus.textContent = `It\'s ${currentPlayer.name}'s turn`;
      } else {
        gameStatus.textContent = '';
      }
  
      board.gameBoard.addEventListener('click', (event) => {
        event.preventDefault();
        const play = currentPlayer.playTurn(board, event.target);
        if (play !== null) {
          board.positions[play] = `${currentPlayer.mark}`;
          board.render();
          const winStatus = board.checkWinner();
          if (winStatus === 'It\'s a draw') {
            gameStatus.textContent = 'It\'s a draw!';
          } else if (winStatus === null) {
            turnTaken();
            gameStatus.textContent = `It\'s ${currentPlayer.name}'s turn`;
          } else {
            gameStatus.textContent = `${currentPlayer.name} has won`;
            board.reset();
            board.render();
          }
        }
      });
    };
  
    const init = () => {
      if (playerOneName.value !== '' && playerTwoName.value !== '') {
        playerOne = playerFactory(playerOneName.value, 'X');
        playerTwo = playerFactory(playerTwoName.value, 'O');
        currentPlayer = playerOne;
        gameRound();
      }
    };
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (playerOneName.value !== '' && playerTwoName.value !== '') {
        init();
        form.classList.add('hide');
        document.querySelector('.place').classList.remove('hide');
      } else {
        window.location.reload();
      }
    });
  
    resetBtn.addEventListener('click', () => {
      document.querySelector('.game-status').textContent = ' ';
      document.querySelector('#player1').value = '';
      document.querySelector('#player2').value = '';
      window.location.reload();
    });
    return {
      init
    };
  })();


  gameStart.init();





