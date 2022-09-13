const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame);

function startGame(){
  game.fillRect(0,50,100,100); //dibujar un rectangulo_ x_nicia y_inicia  width y heiaght
  //game.clearRect(50,50,50,50); // bor
  //game.clearRect(); // bor
  //game.clearRect(0,0,50,50); // borrar
  game.font='25px Verdana';     // , asignarle valores
  game.fillStyle='purple'; // aqui podemos decirle, asignarle valores
  game.textAlign = 'center'; //star, end, center, podemos decir con esta propiedad decirle si termina en esta posicion o termina en esa posicion
  game.fillText("Platzi", 25, 25);

}

