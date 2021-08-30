/**
 * Title
 * Started: 8/22/21
 * By: Art See Clarke
 * Twitter: https://twitter.com/thecodemedium
 * GitHub: https://github.com/codemedium
 * Personal website: https://codemedium.com
 *
 * 		 "Any sufficiently advanced technology is indistinguishable from magic"
 * 		 - Arthur C. Clarke
 *
 * Description: 
 */

/**
 * Color palettes
 */
// VSCode Shades of purple editor colors
colors = ['#ffffff', '#ff628c', '#FF9D00', '#fad000', '#2ca300', '#2EC4B6', '#5D37F0']

/**
 * Sketch entry point
 */
function setup() {
  // Param args
  params = Object.assign({
    pixelSize: 3
  }, getURLParams())
  // rectMode(CENTER)

	createCanvas(windowWidth, windowHeight)
  tile = createGraphics(300, 300)

  drawScene()
}

/**
 * Draws the scene once
 */
function drawScene () {
  background(0)
  noStroke()
  tile.background(0)
  tile.noStroke()

  // Noise
  for (let x = 0; x < 300 / params.pixelSize; x++) {
    for (let y = 0; y < 300 / params.pixelSize; y++) {
      tile.fill(random(255), random(255), random(255))
      tile.rect(x * params.pixelSize, y * params.pixelSize, params.pixelSize, params.pixelSize)
    }
  }

  image(tile, 0, 0)
  
  // Text
  fill(255, 255, 255)
  translate(0, -100)
  textSize(100)
  textAlign(CENTER, CENTER)
  textStyle(BOLD)
  text('Hello World', width / 2, height / 2)
  translate(0, 200)

  // Triangle
  translate(-250, 0)
  triangle(width / 2, height / 2 - 100, width / 2 + 100, height / 2 + 100, width / 2 - 100, height / 2 + 100)

  // Square
  translate(250, 0)
  rect(width / 2 - 100, height / 2 - 100, 200, 200)

  // Circle
  translate(250, 0)
  circle(width / 2, height / 2, 200)
}

/**
 * Main draw loop
 */
function draw() {}

/**
 * Returns a color in colors
 */
 function getColor (transparent = '') {
  return colors[Math.floor(random(colors.length))] + transparent
}















/**
 * Handle keypressed across multiple files
 */
function keyPressed () {
  keypressFn.forEach(fn => fn())
}

/**
 * Split keypressed into multiple functions
 * - On my localhost I have another file to record the canvas into a video,
 *   but on OpenProcessing.org this file is not. Locally, the other file
 *   adds another function that starts recording if space is pressed
 * 
 * @see https://github.com/CodeMedium/subdivided-starships
 */
const keypressFn = [function () {
  drawScene()
  
  switch (keyCode) {
    // Space
    case 32:
      break
    // 1
    case 49:
      break
    // 2
    case 50:
      break
    // 3
    case 51:
      break
    // 4
    case 52:
      break
    // 5
    case 53:
      break
  }
}]
