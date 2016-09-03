/* Global variables */
var frontBuffer = document.getElementById('snake');
var frontCtx = frontBuffer.getContext('2d');
var backBuffer = document.createElement('canvas');
backBuffer.width = frontBuffer.width;
backBuffer.height = frontBuffer.height;
var backCtx = backBuffer.getContext('2d');
var oldTime = performance.now();
var snake = new Image();
snake.src = src = 'red-square.jpg';
var apple = new Image();
apple.src = src = 'blue-square.jpg';

var snakeArr = [snake];


var counter = 0;
var xSnake = 0;
var ySnake = 0;
var xApple = 0;
var yApple = 0;

var hasApple = false;
var input = {
  left: false,
  right: false,
  up: false,
  down: false,
}


window.onkeydown = function(event) {
  event.preventDefault();
  switch(event.keyCode) {

    // Left
    case 37:
    case 65:
      input.left = true;
      break;
    // Right
    case 39:
    case 68:
      input.right = true;
      break;
    // Up
    case 38:
    case 87:
      input.up = true;
      break;
    // Down
    case 40:
    case 83:
      input.down = true;
      break;
  }
  return false;
}

window.onkeyup = function(event) {
  event.preventDefault();
  switch(event.keyCode) {

    // Left
    case 37:
    case 65:
      input.left = false;
      snakeArr.push(snake);
      console.log("number of snakes" + snakeArr.length);
      console.log("xApp "+ xApple  + "yApp " + yApple);
      break;
    // Right
    case 39:
    case 68:
      input.right = false;
      break;
    // Up
    case 38:
    case 87:
      input.up = false;
      break;
    // Down
    case 40:
    case 83:
      input.down = false;
      break;
  }
  return false;
}


/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
function loop(newTime) {
  var elapsedTime = newTime - oldTime;
  oldTime = newTime;


  update(elapsedTime);
  render(elapsedTime);

  // Flip the back buffer
  frontCtx.drawImage(backBuffer, 0, 0);

  // Run the next loop
  window.requestAnimationFrame(loop);
}
//if (line < (r1 +r2)^2 ) overlap  using d^2 = (xSnake1-xSnake2)^2 + (ySnake1 - ySnake2)^2
//else no collision overlap
//if aB > bT vice versa, they arent touching
//if aL > bR vice versa, they arent touching

/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {elapsedTime} A DOMHighResTimeStamp indicting
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {

  // TODO: Spawn an apple periodically

  // TODO: Grow the snake periodically

  // TODO: Move the snake
  if(input.up) {ySnake-= 3;}
  else if(input.down) {ySnake += 3;}
  else if(input.left) {xSnake -= 3; }
  else if(input.right) {xSnake += 3;}
  // TODO: Determine if the snake has moved out-of-bounds (offscreen)
  if(xSnake>760 || xSnake<0 || ySnake>480 || ySnake<0) fail();
  // TODO: Determine if the snake has eaten an apple

  // TODO: Determine if the snake has eaten its tail
  checkForTail();
  // TODO: [Extra Credit] Determine if the snake has run into an obstacle

}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {elapsedTime} A DOMHighResTimeStamp indicting
  * the number of milliseconds passed since the last frame.
  */
function render(elapsedTime) {
  backCtx.clearRect(0, 0, backBuffer.width, backBuffer.height);

  // TODO: Draw the game objects into the backBuffer
  if (!hasApple) createApple();

  checkForApple();

  backCtx.drawImage(snake,xSnake, ySnake, 10, 10);
}

function checkForTail() {

}

function createApple() {
  backCtx.clearRect(0,0,backBuffer.width, backBuffer.height);
  xApple = Math.floor(Math.random() * 760);
  yApple = Math.floor(Math.random() * 480);
  backCtx.drawImage(apple, xApple, yApple,10, 10);
  hasApple = true;
  console.log("created apple");
}

function checkForApple() {
  if ( (xSnake == xApple && ySnake == yApple)||
       (xSnake == (xApple+10) && ySnake == yApple) ||
       (xSnake == (xApple+10) && ySnake == (yApple-10)) ||
       (xSnake == (xApple+10) && ySnake == (yApple-10))
     ){
    counter++;
    createApple();
  };
}


/**
  * @function fail
  * Ends current game from instance of out of bounds or hit tail
  */
function fail(){
  document.getElementById('title').innerHTML = "Game Over!   </br>Score: " + counter ;
}
/* Launch the game */
window.requestAnimationFrame(loop);
