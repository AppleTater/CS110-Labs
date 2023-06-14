//Andre Amante and Jasmine Lau
var board = ['','','','','','','','',''];
var x_pos = ['','','',''];
var o_pos = ['','','',''];

const winning_combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

var x_score = 0;
var o_score = 0;

var won = false;
let o_turn = false;

document.getElementById('x_score').innerHTML = x_score;
document.getElementById('o_score').innerHTML = o_score;


document.getElementById('display_player').innerHTML = 'X';

var num_x = 0;
var num_o = 0;


var gameElem = document.getElementById('game_time');
var moveElem = document.getElementById('move_time');

var x_last = 0;

var gameTimer;
var gameTimeLeft = 120;

var moveTimer;
var moveTimeLeft = 10;

function gameCountdown() {
    if (gameTimeLeft == -1) {
        endGame('tie');
        clearInterval(gameTimeLeft);
    }
    else {
        gameElem.innerHTML = gameTimeLeft + ' seconds remaining';
        gameTimeLeft--;
    }
}

function moveCountdown() {
    if (moveTimeLeft == -1) {
        if (!o_turn) {
            alert("Time's up, Player X skipped.")
            document.getElementById('display_player').innerHTML = "O";
            o_turn = true;
        }
        else {
            alert("Time's up, Player O skipped.")
            document.getElementById('display_player').innerHTML = "X";
            o_turn = false;
        }
        clearInterval(moveTimeLeft);
        moveTimeLeft = 10;
    }
    else {
        moveElem.innerHTML = moveTimeLeft + ' seconds remaining';
        moveTimeLeft--;
    }
} 

function pvp() {
    reset();
    document.getElementById("title").textContent = "Tic Tac Toe - PvP";

    clearInterval(gameTimer);
    var gameTimer = setInterval(gameCountdown, 1000);
    clearInterval(moveTimer);
    moveTimeLeft = 10;
    var moveTimer = setInterval(moveCountdown, 1000);

    document.querySelector(".one").addEventListener("click", squareClick);
    document.querySelector(".two").addEventListener("click", squareClick);
    document.querySelector(".three").addEventListener("click", squareClick);
    document.querySelector(".four").addEventListener("click", squareClick);
    document.querySelector(".five").addEventListener("click", squareClick);
    document.querySelector(".six").addEventListener("click", squareClick);
    document.querySelector(".seven").addEventListener("click", squareClick);
    document.querySelector(".eight").addEventListener("click", squareClick);
    document.querySelector(".nine").addEventListener("click", squareClick);    

    function squareClick(event) { 
        let squares = document.querySelectorAll('.xo');
        if(!won) { 
            if(!o_turn) { // x turn
                num_x++;
                if (num_x <= 4) {
                    event.target.querySelector(".xo").innerText = 'X';
                    let number = event.target.id; 
                    board[number - 1] = 'X';
                    x_pos[num_x - 1] = number - 1;             
                }
                else {
                    event.target.querySelector(".xo").innerText = 'X';
                    let number = event.target.id;
                    squares[x_pos[0]].innerText = '';
                    let shift_x = x_pos.shift();
                    x_pos.push(number - 1);
                    board.splice(shift_x, 1, '');
                    board[number - 1] = 'X';
                }   
                o_turn = true;
                document.getElementById('display_player').innerHTML = "O";
            }
            else { // o turn
                num_o++;
                if(num_o <= 4) {
                    event.target.querySelector(".xo").innerText = 'O';
                    let number = event.target.id; 
                    board[number - 1] = 'O';
                    o_pos[num_o - 1] = number - 1; 
                }
                else {
                    event.target.querySelector(".xo").innerText = 'O';
                    let number = event.target.id; 
                    console.log(o_pos)
                    squares[o_pos[0]].innerText = '';
                    let shift_o = o_pos.shift();
                    o_pos.push(number - 1);
                    board.splice(shift_o, 1, '');
                    board[number - 1] = 'O';
                }
                o_turn = false;
                document.getElementById('display_player').innerHTML = 'X';
                clearInterval(moveTimer);
                moveTimeLeft = 10;
            }
        }
        let end = checkWinner();
        if (end === 'winner') { //|| end === 'tie') {
            endGame(end);
        }
        clearInterval(moveTimer);
        moveTimeLeft = 10;
        clearInterval(moveTimer);
        moveTimer = setInterval(moveCountdown, 1000);
    }   
}

function ai() {
    reset();
    document.getElementById("title").textContent = "Tic Tac Toe - AI";

    clearInterval(gameTimer);
    var gameTimer = setInterval(gameCountdown, 1000);
    clearInterval(moveTimer);
    moveTimeLeft = 10;
    var moveTimer = setInterval(moveCountdown, 1000);

    if(!o_turn) {
        console.log("player turn")
        document.querySelector(".one").addEventListener("click", aiClick);
        document.querySelector(".two").addEventListener("click", aiClick);
        document.querySelector(".three").addEventListener("click", aiClick);
        document.querySelector(".four").addEventListener("click", aiClick);
        document.querySelector(".five").addEventListener("click", aiClick);
        document.querySelector(".six").addEventListener("click", aiClick);
        document.querySelector(".seven").addEventListener("click", aiClick);
        document.querySelector(".eight").addEventListener("click", aiClick);
        document.querySelector(".nine").addEventListener("click", aiClick);
    }

    function aiClick(event) {
        let squares = document.querySelectorAll('.xo');
        if(!won) { 
            if(!o_turn) { // x turn
                num_x++;
                if (num_x <= 4) {
                    event.target.querySelector(".xo").innerText = 'X';
                    let number = event.target.id; 
                    board[number - 1] = 'X';
                    x_pos[num_x - 1] = number - 1;             
                }
                else {
                    event.target.querySelector(".xo").innerText = 'X';
                    let number = event.target.id;
                    squares[x_pos[0]].innerText = '';
                    x_last = x_pos[0];
                    let shift_x = x_pos.shift();
                    x_pos.push(number - 1);
                    board.splice(shift_x, 1, '');
                    board[number - 1] = 'X';
                    console.log("X:", board, "x_last: ", x_last)
                }   
                o_turn = true;
                document.getElementById('display_player').innerHTML = "O";
            }
            else {
                num_o++;
                let num = randomNumber(1, 9);
                if (num_o <= 4) {
                    while(board[num] != ''){
                        num = randomNumber(1, 9);
                    }
                    board[num] = 'O';
                    o_pos[num_o - 1] = num;
                    squares[o_pos[num_o - 1]].innerText = 'O';
                }
                else {
                    console.log(board);
                    console.log("x_last in o:", x_last)
                    squares[x_last].innerText = 'O';
                    squares[o_pos[0]].innerText = '';
                    console.log("o_pos before shift: ", o_pos);
                    let shift_o = o_pos.shift();
                    o_pos.push(x_last);
                    console.log("o_pos after shift: ", o_pos);
                    board.splice(shift_o, 1, '');
                    board[x_last] = 'O';
                    //o_pos[num_o - 1] = num;
                    console.log(o_pos, board)
                    
                }
                console.log(o_pos)
                o_turn = false;
                document.getElementById('display_player').innerHTML = "X";
            }
        }
        let end = checkWinner();
        if (end === 'winner') {
            endGame(end);
        }
        clearInterval(moveTimer);
        moveTimeLeft = 10;
        clearInterval(moveTimer);
        moveTimer = setInterval(moveCountdown, 1000);
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function endGame(end) {
    if (end === 'tie') {
        document.getElementById('winner').innerHTML = 'The game is tied.';
        won = true;
        return;
    }

    if (o_turn === true) {        
        document.getElementById('winner').innerHTML = 'Player X has won!';
        x_score++;
        document.getElementById('x_score').innerHTML = x_score;
        won = true;
        clearInterval(gameTimer);
        gameElem.innerHTML = '';
        moveElem.innerHTML = '';
        return;
    }

    else {
        document.getElementById('winner').innerHTML = 'Player O has won!';
        o_score++;
        document.getElementById('o_score').innerHTML = o_score;
        won = true;
        clearInterval(gameTimer);
        gameElem.innerHTML = '';
        moveElem.innerHTML = '';
        return;
    }
}

function checkWinner() {
    for (let i = 0; i < winning_combos.length; i++) {
        const [a, b, c] = winning_combos[i];
        if(board[a] !== '' && board[a] === board[b] && board[c] === board[a]) {
            return 'winner';
        }
    }
    return null;
}


function newGame() {
    const squares = document.querySelectorAll('.xo');

    for(let i = 0; i < 9; i++) {
        squares[i].innerText = '';
    }

    o_turn = false;
    won = false;
    num_o = 0;
    num_x = 0;
    document.getElementById('display_player').innerHTML = 'X';
    document.getElementById('winner').innerHTML = '';
    board = ['','','','','','','','',''];
    x_pos = ['','','',''];
    o_pos = ['','','',''];
    clearInterval(gameTimer);
    gameTimeLeft = 120;
    document.getElementById('game_time').textContent = '';
    clearInterval(moveTimer);
    moveTimeLeft = 10;
    document.getElementById('move_time').textContent = '';
}

function reset() {
    const squares = document.querySelectorAll('.xo');

    for(let i = 0; i < 9; i++) {
        squares[i].innerText = '';
    }

    o_turn = false;
    won = false;
    num_o = 0;
    num_x = 0;
    document.getElementById('display_player').innerHTML = 'X';
    document.getElementById('winner').innerHTML = '';
    board = ['','','','','','','','',''];
    x_score = 0;
    o_score = 0;
    document.getElementById('x_score').innerHTML = x_score;
    document.getElementById('o_score').innerHTML = o_score;
    x_pos = ['','','',''];
    o_pos = ['','','',''];
    document.getElementById("title").textContent = "Tic Tac Toe";
    clearInterval(gameTimer);
    gameTimeLeft = 120;
    document.getElementById('game_time').textContent = '';
    clearInterval(moveTimer);
    moveTimeLeft = 10;
    document.getElementById('move_time').textContent = '';
}