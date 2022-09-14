const canvas = document.querySelector("#game");

const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

const game = canvas.getContext("2d");
let canvasSize;
let elementSize;

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementSize = canvasSize / 10;

  startGame();
}

function startGame() {
  console.log({ canvasSize, elementSize });

  game.font = elementSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[0];
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));
  console.log({ map, mapRows, mapRowCols });

  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementSize * (colI + 1);
      const posY = elementSize * (rowI + 1);
      game.fillText(emoji, posX, posY);
    });
  });
}

window.addEventListener("keydown", moveByKeys);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function moveByKeys(event) {
  const tecla = event.key;
  if (tecla == "ArrowUp") moveUp();
  else if (tecla == "ArrowLeft") moveLeft();
  else if (tecla == "ArrowRight") moveRight();
  else if (tecla == "ArrowDown") moveDown();
}

function moveUp() {
  console.log("Me quiero mover hacia arriba");
}

function moveLeft() {
  console.log("Me quiero mover hacia la izquierda");
}

function moveRight() {
  console.log("Me quiero mover hacia la derecha");
}

function moveDown() {
  console.log("Me quiero mover hacia abajo");
}
