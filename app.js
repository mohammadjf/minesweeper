"use strict";

// Construtions
function setGame(width, height, mode) {
  generateBoard(width, height);
  const squaresNumber = width * height;
  makeRandomBombs(2, squaresNumber);

  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", (e) => {
      openSquare(e.target);
      checkWin();
    });
    cell.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      flag(e.target);
    });
  });

  generateNumbers();
}

setGame(5, 5);
// Functions
function generateBoard(width, height) {
  document.querySelector(
    ".cell-container"
  ).style.grid = `repeat(${height}, 1fr) / repeat(${width}, 1fr)`;
  document.querySelector("#message-container").style.cssText = `width: ${
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

function makeRandomBombs(x, numEndPoint) {
  for (let i = 0; i < x; i++) {
    let randomNum = Math.trunc(Math.random() * numEndPoint) + 1;
    document.querySelector(
      `.cell-container div:nth-child(${randomNum}) .square`
    ).textContent = "💣";
  }
}

function generateNumbers() {
  document.querySelectorAll(".cell").forEach((cell) => {
    const square = cell.children[1];
    if (square.textContent === "💣") return true;
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
    if (upSquare?.textContent === "💣") number++;
    if (downSquare?.textContent === "💣") number++;
    if (rightSquare?.textContent === "💣") number++;
    if (leftSquare?.textContent === "💣") number++;
    if (upRightSquare?.textContent === "💣") number++;
    if (upLeftSquare?.textContent === "💣") number++;
    if (downRightSquare?.textContent === "💣") number++;
    if (downLeftSquare?.textContent === "💣") number++;
    square.textContent = number === 0 ? "" : number;
  });
}

function openSquare(cell) {
  if (!stopWatch) startTimer();
  const sameCellFlag = document.querySelector(`#${cell?.id} .flag`);
  const square = cell?.children[1];
  if (square?.classList.contains("hidden")) {
    square.classList.remove("hidden");
    sameCellFlag?.classList.contains("hidden") ||
      sameCellFlag?.classList.add("hidden");
    if (square.textContent == 0) {
      openAroundSquares(cell);
    } else if (square.textContent === "💣") explosion(cell);
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

function showmessage(message) {
  const html = `
  <h2 id="message">${message}</h2>
  <p id="score"> Your Time : ${getTime()}</p>
  `;
  document
    .querySelector("#message-container")
    .insertAdjacentHTML("afterbegin", html);
  document.querySelector("#message-container").style.opacity = "100";
  document.querySelector("#message-container").classList.remove("hidden");
}

function explosion(cell) {
  cell.children[1].textContent = "💥";
  document.querySelectorAll(".cell").forEach((cell) => {
    if (
      cell.children[1].textContent === "💣" &&
      cell.children[0].classList.contains("hidden")
    )
      cell.children[1].classList.remove("hidden");
  });
  showmessage("You Lost 😵");
  clearInterval(stopWatch);
}

function checkWin() {
  let won = true;
  document.querySelectorAll(".cell").forEach((cell) => {
    if (
      cell.children[1].textContent !== "💣" &&
      cell.children[1].classList.contains("hidden")
    )
      won = false;
  });
  won && showmessage("You Won 😎");
}

let stopWatch;
function startTimer() {
  function tick() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    document.querySelector("#stop-watch").textContent = `${min}:${sec}`;

    time++;
  }

  let time = 0;

  tick();
  stopWatch = setInterval(tick, 1000);
}

function getTime() {
  return document.querySelector("#stop-watch").textContent;
}
