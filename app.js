"use strict";

// Construtions
let stopWatch;
setGame();
displayBestTime();
// Functions

document.querySelector("#new-game").addEventListener("click", (e) => {
  e.preventDefault();
  setGame();
});

function setGame() {
  // Resetting time
  clearInterval(stopWatch);
  document.querySelector("#stop-watch").textContent = "00:00";
  stopWatch = null;

  // Getting game options
  const width = document.querySelector("#width").value;
  const height = document.querySelector("#height").value;
  const difficulty = document.querySelector("#difficulty").value;

  // Clearing previous game
  document.querySelector(".cell-container").textContent = "";
  hideMessage();

  // Creating new game
  generateBoard(width, height);
  const squaresMass = width * height;
  let bombMass;

  if (difficulty == 1) {
    bombMass = squaresMass / 6;
  } else if (difficulty == 2) {
    bombMass = (2 * squaresMass) / 5;
  } else if (difficulty == 3) {
    bombMass = squaresMass / 2;
  }
  makeRandomBombs(bombMass, squaresMass);
  generateNumbers();

  // Adding right and left click events
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", (e) => {
      if (!stopWatch) startTimer();
      openSquare(e.target);
      checkWin();
    });
    cell.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      mark(e.target);
    });
  });
}

function generateBoard(width, height) {
  // Setting board size
  document.querySelector(
    ".cell-container"
  ).style.grid = `repeat(${height}, 1fr) / repeat(${width}, 1fr)`;
  document.querySelector(".container").style.width = `${width * 28}px`;
  document.querySelector("#message-container").style.cssText = `width: ${
    width * 28
  }px; height: ${height * 28}px`;

  // Creating squares
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

function makeRandomBombs(bombMass, squaresMass) {
  for (let i = 0; i < bombMass; i++) {
    let randomNum = Math.trunc(Math.random() * squaresMass) + 1;
    document.querySelector(
      `.cell-container div:nth-child(${randomNum}) .square`
    ).textContent = "💣";
  }
}

// Easy access to cell children
function flag(cell) {
  return cell?.children[0];
}
function square(cell) {
  return cell?.children[1];
}

function generateNumbers() {
  document.querySelectorAll(".cell").forEach((cell) => {
    if (square(cell).textContent === "💣") return true;
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
    square(cell).textContent = number === 0 ? "" : number;
  });
}

function openSquare(cell) {
  if (square(cell)?.classList.contains("hidden")) {
    square(cell).classList.remove("hidden");
    flag(cell)?.classList.contains("hidden") ||
      flag(cell)?.classList.add("hidden");
    if (square(cell).textContent == 0) {
      openAroundSquares(cell);
    } else if (square(cell).textContent === "💣") explosion(cell);
  }
}

function mark(node) {
  if (!node.classList.contains("square")) {
    flag(node)?.classList.contains("hidden")
      ? flag(node).classList.remove("hidden")
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

function explosion(cell) {
  square(cell).textContent = "💥";
  document.querySelectorAll(".cell").forEach((cell) => {
    if (
      square(cell).textContent === "💣" &&
      flag(cell).classList.contains("hidden")
    )
      square(cell).classList.remove("hidden");
  });
  showMessage("You Lost 😵");
  clearInterval(stopWatch);
}

function checkWin() {
  let won = true;
  document.querySelectorAll(".cell").forEach((cell) => {
    if (
      square(cell).textContent !== "💣" &&
      square(cell).classList.contains("hidden")
    )
      return (won = false);
  });
  if (won) {
    showMessage("You Won 😎");
    setBestTime();
    clearInterval(stopWatch);
    displayBestTime();
  }
}

function showMessage(message) {
  const html = `
  <h2 id="message">${message}</h2>
  <p id="score"> Your Time : ${getTime()}</p>
  <button id="try-again" class="btn">Try Again</button>
  `;
  document
    .querySelector("#message-container")
    .insertAdjacentHTML("afterbegin", html);
  document
    .querySelector("#try-again")
    .addEventListener("click", () => setGame(15, 15, 1));
  document.querySelector("#message-container").style.opacity = "100";
  document.querySelector("#message-container").classList.remove("hidden");
}

function hideMessage() {
  document.querySelector("#message-container").textContent = "";
  document.querySelector("#message-container").style.opacity = "0";
  document.querySelector("#message-container").classList.add("hidden");
}

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

function setBestTime() {
  const time = getTime();
  if (
    !getBestTime() ||
    time.split(":").join("") < getBestTime().split(":").join("")
  )
    localStorage.setItem("best", time);
}

function getBestTime() {
  return localStorage.getItem("best");
}

function displayBestTime() {
  document.querySelector("#best-time").textContent = getBestTime()
    ? `Your Best Time : ${getBestTime()}`
    : "";
}
