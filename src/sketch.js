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
    pixelSize: 2,
    tileSize: 128
  }, getURLParams())

	createCanvas(windowWidth, windowHeight)
  tile = createGraphics(params.tileSize, params.tileSize)
  depthMap = createGraphics(windowWidth, windowHeight)

  drawScene()
}

/**
 * Draws the scene once
 */
function drawScene () {
  background(0)
  noStroke()

  drawTiles()
  drawDepthMap()
}

/**
 * Create the magic tiles
 */
function drawTiles () {
  tile.clear()
  tile.noStroke()

  // Draw the tile
  for (let x = 0; x < 300 / params.pixelSize; x++) {
    for (let y = 0; y < 300 / params.pixelSize; y++) {
      tile.fill(random(255), random(255), random(255))
      tile.rect(x * params.pixelSize, y * params.pixelSize, params.pixelSize, params.pixelSize)
    }
  }

  // Draw two blank columns
  for (let i = 0; i < height / params.tileSize; i++) {
    image(tile, 0, i * params.tileSize)
    image(tile, params.tileSize, i * params.tileSize)
  }
}

/**
 * Draws the depthmap
 */
function drawDepthMap () {
  depthMap.clear()
  depthMap.noStroke()

  // Text
  depthMap.push()
  depthMap.fill(255, 255, 255)
  depthMap.translate(0, -100)
  depthMap.textSize(100)
  depthMap.textAlign(CENTER, CENTER)
  depthMap.textStyle(BOLD)
  depthMap.text('Hello World', width / 2, height / 2)
  depthMap.translate(0, 200)

  // Triangle
  depthMap.translate(-250, 0)
  depthMap.triangle(width / 2, height / 2 - 100, width / 2 + 100, height / 2 + 100, width / 2 - 100, height / 2 + 100)

  // Square
  depthMap.translate(250, 0)
  depthMap.rect(width / 2 - 100, height / 2 - 100, 200, 200)

  // Circle
  depthMap.translate(250, 0)
  depthMap.circle(width / 2, height / 2, 200)
  depthMap.pop()

  image(depthMap, 0, 0)
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
function mouseClicked () {
  drawScene()
}
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
