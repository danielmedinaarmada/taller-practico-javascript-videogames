const canvas = document.querySelector("#game");

const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector("#lives");
const spanTime = document.querySelector("#time");
const spanRecord = document.querySelector("#record");
const pResult = document.querySelector("#result");

const game = canvas.getContext("2d");
let canvasSize;
let elementSize;
let level = 0;
let lives = 3;
let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
  x: undefined,
  y: undefined,
};

const giftPosition = {
  x: undefined,
  y: undefined,
};

const enemyPositions = [];

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }

  canvasSize = Number(canvasSize.toFixed(0));

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementSize = canvasSize / 10;

  //como lpayerPosition no se refrescan los valores, luego del reside
  //por la validacion del if, !playerPosition.x && !playerPosition.y
  // una opción es matarlo,
  
  //Claro hay que tener cuidado cuando hacemos resice, ya que las playerPosition.x e y,
  // le asiganariamos los valores iniciales de su posicion, mas no, donde esta ahora

  playerPosition.x = undefined;
  playerPosition.y = undefined;

  startGame();
}

function startGame() {
  //console.log({ canvasSize, elementSize });

  game.font = elementSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[level];

  if (!map) {
    gameWin();
    return;
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecord();
  }

  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));
  //console.log({ map, mapRows, mapRowCols });

  showLives();

  //vamos a borrar todo
  game.clearRect(0, 0, canvasSize, canvasSize);
  enemyPositions.length = 0;

  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementSize * (colI + 1);
      const posY = elementSize * (rowI + 1);

      if (col == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          //console.log({ playerPosition });
        }
      } else if (col == "I") {
        giftPosition.x = posX;
        giftPosition.y = posY;
        //console.log({ giftPosition });
      } else if (col == "X") {
        enemyPositions.push({
          x: posX,
          y: posY,
        });
      }

      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}

function movePlayer() {
  //Si conseguimos el regalo
  const giftCollisionX =
    playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftCollisionY =
    playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftCollision = giftCollisionX && giftCollisionY;

  if (giftCollision) {
    levelWin();
  }

  //Si chocamos con una bomba
  const enemyCollision = enemyPositions.find((enemy) => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });

  if (enemyCollision) {
    levelFail();
  }

  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function levelWin() {
  console.log("Subiste de nivel!");
  level++;
  startGame();
}

function gameWin() {
  console.log("¡Terminaste el juego!");
  clearInterval(timeInterval);

  const recordTime = localStorage.getItem("record_time");
  const playerTime = Date.now() - timeStart;
  if (recordTime) {
    if (recordTime >= playerTime) {
      //nuevo Record
      localStorage.setItem("record_time", playerTime);
      pResult.innerHTML = "Superaste el record. :)";
    } else {
      pResult.innerHTML = "No superaste el record. :(";
    }
  } else {
    localStorage.setItem("record_time", playerTime);
    pResult.innerHTML =
      "Primera vez? Muy bien pero ahora trata de superar tú tiempo. :)";
  }
  console.log({ recordTime, playerTime });
}

function showLives() {
  const heartsArray = Array(lives).fill(emojis.HEART); // crear un array con las posiciones que dice lives
  //console.log({heartsArray});

  spanLives.innerHTML = "";
  heartsArray.forEach((heart) => spanLives.append(heart));

  console.log(lives);
}

function showTime() {
  spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord() {
  spanRecord.innerHTML = localStorage.getItem("record_time");
}

function levelFail() {
  console.log("Chocaste contra una bomba!");
  lives--;

  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = undefined;
  }

  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
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
  if (playerPosition.y - elementSize < elementSize) {
    console.log("Out");
  } else {
    playerPosition.y -= elementSize;
    startGame();
  }
}

function moveLeft() {
  console.log("Me quiero mover hacia la izquierda");
  if (playerPosition.x - elementSize < elementSize) {
    console.log("Out");
  } else {
    playerPosition.x -= elementSize;
    startGame();
  }
}

function moveRight() {
  console.log("Me quiero mover hacia la derecha");
  if (playerPosition.x + elementSize > canvasSize) {
    console.log("Out");
  } else {
    playerPosition.x += elementSize;
    startGame();
  }
}

function moveDown() {
  console.log("Me quiero mover hacia abajo");
  if (playerPosition.y + elementSize > canvasSize) {
    console.log("Out");
  } else {
    playerPosition.y += elementSize;
    startGame();
  }
}
