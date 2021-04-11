"use strict";

// Functions

// Construtions
const width = 20;
const height = 20;

generateBoard();
makeRandomBombs(90);
document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", (e) => {
    openSquare(e.target.children[0]);
  });
  cell.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    e.target.innerHTML = e.target.innerHTML === "🚩" ? "" : "🚩";
  });
});
generateNumbers();

// Functionality
function generateBoard() {
  document.querySelector(
    ".cell-container"
  ).style.grid = `repeat(${height}, 1fr) / repeat(${width}, 1fr)`;
  for (let x = 1; x <= height; x++) {
    for (let y = 1; y <= width; y++) {
      document.querySelector(".cell-container").insertAdjacentHTML(
        "beforeend",
        `
        <div class="cell">
        <div class="square covered" id="cell-${x}-${y}"></div>
        </div>
        `
      );
    }
  }
}

function makeRandomBombs(x) {
  const set = new Set();
  for (let i = 0; i < x; i++) {
    let randomNum = Math.trunc(Math.random() * width * height) + 1;
    document.querySelector(
      `.cell-container div:nth-child(${randomNum}) div`
    ).innerHTML = "💣";
  }
}

function openSquare(square) {
  if (square?.classList.contains("covered")) {
    square.classList.remove("covered");
    console.log(square);
    if (square.innerHTML == 0) {
      openAroundSquares(square);
    }
  }
}

function openAroundSquares(square) {
  const dividedID = square.id.split("-");
  const x = +dividedID[1];
  const y = +dividedID[2];
  const upSquare = document.querySelector(`#cell-${x - 1}-${y}`);
  const downSquare = document.querySelector(`#cell-${x + 1}-${y}`);
  const rightSquare = document.querySelector(`#cell-${x}-${y + 1}`);
  const leftSquare = document.querySelector(`#cell-${x}-${y - 1}`);
  const upRightSquare = document.querySelector(`#cell-${x - 1}-${y + 1}`);
  const upLeftSquare = document.querySelector(`#cell-${x - 1}-${y - 1}`);
  const downRightSquare = document.querySelector(`#cell-${x + 1}-${y + 1}`);
  const downLeftSquare = document.querySelector(`#cell-${x + 1}-${y - 1}`);
  openSquare(upSquare);
  openSquare(downSquare);
  openSquare(rightSquare);
  openSquare(leftSquare);
  openSquare(upRightSquare);
  openSquare(upLeftSquare);
  openSquare(downRightSquare);
  openSquare(downLeftSquare);
}

function generateNumbers() {
  document.querySelectorAll(".square").forEach((square) => {
    if (square.innerHTML === "💣") return true;
    let number = 0;
    const dividedID = square.id.split("-");
    const x = +dividedID[1];
    const y = +dividedID[2];
    const upSquare = document.querySelector(`#cell-${x - 1}-${y}`);
    const downSquare = document.querySelector(`#cell-${x + 1}-${y}`);
    const rightSquare = document.querySelector(`#cell-${x}-${y + 1}`);
    const leftSquare = document.querySelector(`#cell-${x}-${y - 1}`);
    const upRightSquare = document.querySelector(`#cell-${x - 1}-${y + 1}`);
    const upLeftSquare = document.querySelector(`#cell-${x - 1}-${y - 1}`);
    const downRightSquare = document.querySelector(`#cell-${x + 1}-${y + 1}`);
    const downLeftSquare = document.querySelector(`#cell-${x + 1}-${y - 1}`);
    if (upSquare?.innerHTML === "💣") number++;
    if (downSquare?.innerHTML === "💣") number++;
    if (rightSquare?.innerHTML === "💣") number++;
    if (leftSquare?.innerHTML === "💣") number++;
    if (upRightSquare?.innerHTML === "💣") number++;
    if (upLeftSquare?.innerHTML === "💣") number++;
    if (downRightSquare?.innerHTML === "💣") number++;
    if (downLeftSquare?.innerHTML === "💣") number++;
    square.innerHTML = number === 0 ? "" : number;
  });
}

function flagSquare() {
  docume;
}
