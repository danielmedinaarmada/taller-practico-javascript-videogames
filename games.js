const canvas = document.querySelector("#game");

const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

const game = canvas.getContext("2d");
let canvasSize;
let elementSize;
const playerPosition = {
  x: undefined,
  y: undefined,
};

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

  //vamos a borrar todo
  game.clearRect(0, 0, canvasSize, canvasSize);

  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementSize * (colI + 1);
      const posY = elementSize * (rowI + 1);

      if (col == "O") {
        if(!playerPosition.x && !playerPosition.y){
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log({ playerPosition });
        }
      }

      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}

function movePlayer() {
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
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
  playerPosition.y -= elementSize;
  startGame();
}

function moveLeft() {
  console.log("Me quiero mover hacia la izquierda");
  playerPosition.x -= elementSize;
  startGame();
}

function moveRight() {
  console.log("Me quiero mover hacia la derecha");
  playerPosition.x += elementSize;
  startGame();
}

function moveDown() {
  console.log("Me quiero mover hacia abajo");
  playerPosition.y += elementSize;
  startGame();
}
