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

var input = {
  left: false,
  right: false,
  up: false,
  down: false,
}

var failed = false;
var snakeArr = [snake];
var snakeArrX = [380];
var snakeArrY = [240];
var snakeArrDir = [input.right];
var counter = 0;

var xApple = Math.floor(Math.random() * (backBuffer.width - 10));
var yApple = Math.floor(Math.random() * (backBuffer.height - 10));




window.onkeydown = function(event) {
  event.preventDefault();
  if(!failed){
    switch(event.keyCode) {

      // Left
      case 37:
      case 65:
        if(input.right) end();
        input.left = true;
        input.right = false;
        input.up = false;
        input.down = false;

        break;
      // Right
      case 39:
      case 68:
        if(input.left) end();
        input.left = false;
        input.right = true;
        input.up = false;
        input.down = false;
        break;
      // Up
      case 38:
      case 87:
        if(input.down) end();
        input.left = false;
        input.right = false;
        input.up = true;
        input.down = false;
        break;
      // Down
      case 40:
      case 83:
        if(input.up) end();
        input.left = false;
        input.right = false;
        input.up = false;
        input.down = true;
        break;

    }
  } else {
      input.left = false;
      input.right = false;
      input.up = false;
      input.down = false;
    }


  return false;
}



/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
function loop(newTime) {
  if(!failed){
    var elapsedTime = newTime - oldTime;
    oldTime = newTime;


    update(elapsedTime);
    render(elapsedTime);

    // Flip the back buffer
    frontCtx.clearRect(0, 0, frontBuffer.width, frontBuffer.height);
    frontCtx.drawImage(backBuffer, 0, 0);

    // Run the next loop
    window.requestAnimationFrame(loop);
  }

}


/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {elapsedTime} A DOMHighResTimeStamp indicting
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {

  // Move the snake

  if(input.up) {snakeArrDir.unshift(input.up);}
  else if(input.down) {snakeArrDir.unshift(input.down);}
  else if(input.left) {snakeArrDir.unshift(input.left);}
  else if(input.right) {snakeArrDir.unshift(input.right);}
  for (var i = 0; i < snakeArrX.length; i++) {
    if(snakeArrDir[i] == input.up) snakeArrY[i] -= 3;
    else if(snakeArrDir[i] == input.down) snakeArrY[i] += 3;
    else if(snakeArrDir[i] == input.right) snakeArrX[i] += 3;
    else if(snakeArrDir[i] == input.left) snakeArrX[i] -= 3;
  };

  // out-of-bounds (offscreen)
  if(snakeArrX[0]>760 || snakeArrX[0]<0 || snakeArrY[0]>480 || snakeArrY[0]<0) end();

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
  // Draw the game objects into the backBuffer
  checkForApple();
  backCtx.drawImage(apple, xApple, yApple, 10,10);
  for (var i = 0; i < snakeArr.length; i++) {
    backCtx.drawImage(snake,snakeArrX[i] , snakeArrY[i] , 10, 10);
    //console.log(snakeArrY[i]+" " + snakeArrX[i]);
  }
}

function checkForTail() {

}

function createApple() {
  xApple = Math.floor(Math.random() * 750);
  yApple = Math.floor(Math.random() * 470);
  backCtx.drawImage(apple, xApple, yApple,10, 10);
  hasApple = true;
  console.log("created apple");
}
//if (line < (r1 +r2)^2 ) overlap  using d^2 = (xSnake1-xSnake2)^2 + (ySnake1 - ySnake2)^2
//else no collision overlap
//if aB > bT vice versa, they arent touching
//if aL > bR vice versa, they arent touching


function checkForApple() {
  if ( ( Math.pow(snakeArrX[0] - xApple, 2) + Math.pow(snakeArrY[0] - yApple, 2)) < 20){
    counter++;
    document.getElementById('score').innerHTML ="Score: "+ counter ;
    createApple();
    snakeArr.unshift(snake);
    if (input.up) {
      snakeArrY.unshift(snakeArrY[0]-20);
      snakeArrX.unshift(snakeArrX[0]);
    }
    else if (input.down) {
      snakeArrY.unshift(snakeArrY[0]+20);
      snakeArrX.unshift(snakeArrX[0]);
    }
    else if (input.right) {
      snakeArrY.unshift(snakeArrY[0]);
      snakeArrX.unshift(snakeArrX[0]+20);
    }
    else if (input.left) {
      snakeArrY.unshift(snakeArrY[0]);
      snakeArrX.unshift(snakeArrX[0]-20);
    }
    for (var i = 0; i < snakeArr.length; i++) {
    console.log(snakeArrY[i] + "  " + snakeArrX[i]);
    }
  };
}


/**
  * @function fail
  * Ends current game from instance of out of bounds or hit tail
  */
function end(){

  document.getElementById('score').innerHTML =
     "Game Over!   </br>Score: "+ counter;

  frontCtx.fillRect(0,0,frontBuffer.width, frontBuffer.height);
  frontCtx.font = "40pt Times New Roman";
  frontCtx.strokeStyle = "#ffffff";
  frontCtx.lineWidth = 0.1;
  frontCtx.fillStyle = "#fff";
  frontCtx.fillText("Game Over!"
                       ,frontBuffer.width*.35, frontBuffer.height*.4);
  frontCtx.fillText("Score: "+ counter
                       ,frontBuffer.width*.40, frontBuffer.height*.6);

  failed = true;
}
/* Launch the game */
window.requestAnimationFrame(loop);
