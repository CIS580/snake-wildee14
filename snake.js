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

var begin = true;
var failed = false;

var input = {
  left: false,
  right: false,
  up: false,
  down: false,
}

var snakeArr = [];
var snakeArrDir;
var counter = 0;

//initial apple coordinates
var xApple = Math.floor(Math.random() * (backBuffer.width - 10));
var yApple = Math.floor(Math.random() * (backBuffer.height - 10));


window.onkeydown = function(event) {
  event.preventDefault();
  if(!failed){
    //Update whether the key press is a certain direction
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
 * @function first
 * Initialize the array
 */
function first() {

  if (begin) {snakeArrDir  = [];
              begin = false;
              return true;}
  return false;
}
/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
function loop(newTime) {
  if(first())  {snakeArrDir.push({x: 380, y: 240})};
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
  var next = {x: 360, y: 240};
  if(input.up){next = {x: (snakeArrDir[0].x),
                       y: (snakeArrDir[0].y-4)};}
  else if(input.down){next = {x: (snakeArrDir[0].x),
                              y: (snakeArrDir[0].y+4)};}
  else if(input.left){next = {x: (snakeArrDir[0].x-4),
                              y: (snakeArrDir[0].y)};}
  else if(input.right){next = {x: (snakeArrDir[0].x+4),
                               y: (snakeArrDir[0].y)};}

  //If the head is on apple, remove the instance from the array
  if(!checkForApple(next.x, next.y)) {snakeArrDir.pop(); snakeArr.pop();}

  //Add the next segment to the beginning
  snakeArrDir.unshift(next);
  snakeArr.push(snake);

  // out-of-bounds (offscreen)
  if(snakeArrDir[snakeArrDir.length-1].x>760 || snakeArrDir[snakeArrDir.length-1].x<0
  || snakeArrDir[snakeArrDir.length-1].y>480 || snakeArrDir[snakeArrDir.length-1].y<0) end();

  checkForTail();
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
  backCtx.drawImage(apple, xApple, yApple, 10,10);

  for (var i = 0; i < snakeArr.length; i++) {
    backCtx.drawImage(snake,snakeArrDir[i].x , snakeArrDir[i].y , 10, 10);
  }
}

/**
  * @function checkForTail
  * Check if the segments are intersetcting the head
  */
function checkForTail() {
  for (var i = 0; i < snakeArr.length-1; i++) {
    //If a segment and the head intersetct, throw end()
    if (  snakeArrDir[snakeArrDir.length-1].x == snakeArrDir[i].x &&
          snakeArrDir[snakeArrDir.length-1].y == snakeArrDir[i].y)
        {
          console.log("failed tail");
          end();
        }
  }
}

/**
  * @function createApple
  * Create a new random apple that draws the apple.
  */
function createApple() {
  xApple = Math.floor(Math.random() * 750);
  yApple = Math.floor(Math.random() * 470);
  backCtx.drawImage(apple, xApple, yApple,10, 10);
  hasApple = true;
  console.log("created apple");
}

/**
  * @function checkForApple
  * Check if the apple is intersetcting the head
  */
function checkForApple(x, y) {
  if ( ( Math.pow(x - xApple, 2) +
         Math.pow(y - yApple, 2)) < 20){
    //Update score
    counter++;
    document.getElementById('score').innerHTML ="Score: "+ counter ;

    //Generate a new apple
    createApple();

    //apple touching head
    return true;
    }
  else{
    //apple and head not touching
    return false;
  }
  };



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
