console.log("Welcome to Tic Tac Toe");
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    let won = false;

    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[2]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[0]].innerText !== "")) {

            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            isgameover = true;
            won = true;
            highlightWinningCells(e); // Pass the winning combination
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
        }
    });

    // Check for Draw
    let isDraw = Array.from(boxtext).every(box => box.innerText !== "");
    if (isDraw && !won) {
        setTimeout(() => {
            gameover.play();
            document.querySelector('.info').innerText = "Game Over! It's a Draw!";
        }, 2000);
    }
};

// Function to highlight winning cells
const highlightWinningCells = (combination) => {
    let box = document.getElementsByClassName('box');
    combination.forEach(index => {
        box[index].style.backgroundColor = "#a3be8c";
    });
};




// Game Logic
let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) { 
            // Prevent moves after a win
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

// Add onclick listener to reset button
document.getElementById('reset').addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
        element.style.backgroundColor = ""; // Reset highlight color
    });
    turn = "X";
    isgameover = false;
    // document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
});