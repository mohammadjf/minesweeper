"use strict";

// Construtions
const width = 20;
const height = 10;

generateBoard();
makeRandomBombs(20);

document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", (e) => {
    openSquare(e.target);
  });
  cell.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    flag(e.target);
  });
});

generateNumbers();

// Functions
function generateBoard() {
  document.querySelector(
    ".cell-container"
  ).style.grid = `repeat(${height}, 1fr) / repeat(${width}, 1fr)`;
  document.querySelector("#game-over").style.cssText = `width: ${
    width * 30
  }px; height: ${height * 30}px`;
  for (let x = 1; x <= height; x++) {
    for (let y = 1; y <= width; y++) {
      document.querySelector(".cell-container").insertAdjacentHTML(
        "beforeend",
        `
        <div class="cell" id="cell-${x}-${y}">
        <div class="flag hidden">🚩</div>
        <div class="square hidden"></div>
        </div>
        `
      );
    }
  }
}

function makeRandomBombs(x) {
  for (let i = 0; i < x; i++) {
    let randomNum = Math.trunc(Math.random() * width * height) + 1;
    document.querySelector(
      `.cell-container div:nth-child(${randomNum}) .square`
    ).innerHTML = "💣";
  }
}

function openSquare(cell) {
  const sameCellFlag = document.querySelector(`#${cell?.id} .flag`);
  const square = cell?.children[1];
  if (square?.classList.contains("hidden")) {
    square.classList.remove("hidden");
    sameCellFlag?.classList.contains("hidden") ||
      sameCellFlag?.classList.add("hidden");
    if (square.innerHTML == 0) {
      openAroundSquares(cell);
    } else if (square.innerHTML === "💣") explosion(cell);
  }
}

function flag(node) {
  if (!node.classList.contains("square")) {
    node.children[0]?.classList.contains("hidden")
      ? node.children[0].classList.remove("hidden")
      : node.classList.add("hidden");
  }
}

function openAroundSquares(cell) {
  const dividedID = cell.id.split("-");
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
  document.querySelectorAll(".cell").forEach((cell) => {
    const square = cell.children[1];
    if (square.innerHTML === "💣") return true;
    let number = 0;
    const dividedID = cell.id.split("-");
    const x = +dividedID[1];
    const y = +dividedID[2];
    const upSquare = document.querySelector(`#cell-${x - 1}-${y} .square`);
    const downSquare = document.querySelector(`#cell-${x + 1}-${y} .square`);
    const rightSquare = document.querySelector(`#cell-${x}-${y + 1} .square`);
    const leftSquare = document.querySelector(`#cell-${x}-${y - 1} .square`);
    const upRightSquare = document.querySelector(
      `#cell-${x - 1}-${y + 1} .square`
    );
    const upLeftSquare = document.querySelector(
      `#cell-${x - 1}-${y - 1} .square`
    );
    const downRightSquare = document.querySelector(
      `#cell-${x + 1}-${y + 1} .square`
    );
    const downLeftSquare = document.querySelector(
      `#cell-${x + 1}-${y - 1} .square`
    );
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

function showGameOver() {
  document.querySelector("#game-over").style.opacity = "100";
  document.querySelector("#game-over").classList.remove("hidden");
}

function explosion(cell) {
  cell.children[1].innerHTML = "💥";
  document.querySelectorAll(".cell").forEach((cell) => {
    if (
      cell.children[1].innerHTML === "💣" &&
      cell.children[0].classList.contains("hidden")
    )
      cell.children[1].classList.remove("hidden");
  });
  setTimeout(showGameOver);
}
