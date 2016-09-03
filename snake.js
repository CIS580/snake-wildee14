/* Global variables */
var frontBuffer = document.getElementById('snake');
var frontCtx = frontBuffer.getContext('2d');
var backBuffer = document.createElement('canvas');
backBuffer.width = frontBuffer.width;
backBuffer.height = frontBuffer.height;
var backCtx = backBuffer.getContext('2d');
var oldTime = performance.now();
var snake = Image();
snake.src = "red-square.jpeg";

var input = {
  left: false;
  right: false;
  up: false;
  down: false;
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
//if (line < (r1 +r2)^2 ) overlap  using d^2 = (x1-x2)^2 + (y1 - y2)^2
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
  if(input.up) y-= 1;
  else if(input.down) y += 1;
  else if(input.left) x -= 1;
  else if(input.right) x += 1;
  // TODO: Determine if the snake has moved out-of-bounds (offscreen)
  if(x>760 || x<0 || y>480 || y<0) window.alert("You fail");
  // TODO: Determine if the snake has eaten an apple

  // TODO: Determine if the snake has eaten its tail

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
  backCtx.clearRect(0, 0, canvas.width, canvas.height);

  backCtx.drawImage(snake, 0, 0, 200, 100);
  for(i = 0; i < 100; i++){
    backCtx.fillStyle = "blue";
    backCtx.fillRect(
       (i*20)%100,
       (i*20)%100,
       10,
       10);
  }

  backCtx.fillStyle = "red"
  backCtx.fillRect(x, y, 5, 5);

  ctx.drawImage(backCanvas, 0, 0);

}

/* Launch the game */
window.requestAnimationFrame(loop);
