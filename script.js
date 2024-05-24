document.addEventListener('DOMContentLoaded', () => {
    const X_CLASS = 'x';
    const O_CLASS = 'o';
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart-button');
    const message = document.getElementById('message');

    let xTurn;
    let Xuser ;
    let Yuser;
    startGame();

    restartButton.addEventListener('click', startGame);

    function startGame() {
        xTurn = true;
       Xuser = true;

        cells.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(O_CLASS);
            cell.innerHTML = '';
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true });
        });
        setBoardHoverClass();
        message.innerText = '';
    }
    function addtic(){
        
    }
    function handleClick(e) {
        const cell = e.target;
      
        
                if(Xuser){
                    
                    cell.innerHTML = 'X';
                    
                    Xuser = false;
                    Yuser = true;
                }else{ if(Yuser){
                   
                    cell.innerHTML = 'O';
                    Yuser = false;
                    Xuser = true;

                }}

        const currentClass = xTurn ? X_CLASS : O_CLASS;
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            setBoardHoverClass();
        }
    }

    function endGame(draw) {
        if (draw) {
            message.innerText = 'Draw!';
        } else {
            message.innerText = `${xTurn ? "X's" : "O's"} Wins!`;
        }
        cells.forEach(cell => {
            cell.removeEventListener('click', handleClick);
        });
    }

    function isDraw() {
        return [...cells].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
        });
    }

    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass);
    }

    function swapTurns() {
        xTurn = !xTurn;
    }

    function setBoardHoverClass() {
        board.classList.remove(X_CLASS);
        board.classList.remove(O_CLASS);
        if (xTurn) {
            board.classList.add(X_CLASS);
        } else {
            board.classList.add(O_CLASS);
        }
    }

    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentClass);
            });
        });
    }
});
