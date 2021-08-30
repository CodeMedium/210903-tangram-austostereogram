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
    tileSize: 128,
    intensity: 0.25
  }, getURLParams())

	createCanvas(windowWidth, windowHeight)
  tile = createGraphics(params.tileSize, params.tileSize)
  depthMap = createGraphics(windowWidth, windowHeight)
  pixelDensity(1)
  tile.pixelDensity(1)
  depthMap.pixelDensity(1)

  drawScene()
}

/**
 * Draws the scene once
 */
function drawScene () {
  background(0)
  noStroke()

  drawDepthMap()
  drawTiles()
  // image(depthMap, 0, 0)
}

/**
 * Create the magic tiles
 * @see https://github.com/vpoupet/playground
 */
function drawTiles () {
  tile.clear()
  tile.noStroke()

  // Draw the tile
  for (let x = 0; x < parseInt(params.tileSize) / parseInt(params.pixelSize); x++) {
    for (let y = 0; y < parseInt(params.tileSize) / parseInt(params.pixelSize); y++) {
      tile.fill(random(255), random(255), random(255))
      tile.rect(x * parseInt(params.pixelSize), y * parseInt(params.pixelSize), parseInt(params.pixelSize), parseInt(params.pixelSize))
    }
  }

  // Get depth map data
  let depthData = depthMap.drawingContext.getImageData(0, 0, windowWidth, windowHeight)

  // Draw two blank columns
  // for (let i = 0; i < height / params.tileSize; i++) {
  //   image(tile, 0, i * params.tileSize)
  //   image(tile, params.tileSize, i * params.tileSize)
  // }
  for (let i = 0; i < windowHeight; i += parseInt(params.tileSize)) {
    drawingContext.drawImage(tile.canvas, 0, i);
    drawingContext.drawImage(tile.canvas, parseInt(params.tileSize), i);
  }

  // Draw the rest of the austostereogram
  let imageData = drawingContext.getImageData(0, 0, windowWidth, windowHeight)

  // make stereogram
  for (let y = 0; y < windowHeight; y++) {
    for (let x = 0; x < windowWidth; x++) {
      let shift = ~~(depthData.data[4 * (x + windowWidth * y)] * parseFloat(params.intensity)) - parseInt(params.tileSize)
      if (0 <= x + shift && x + shift < windowWidth) {
        let offset = (x + windowWidth * y) << 2
        let offset_shift = (x + shift + windowWidth * y) << 2
        imageData.data[offset] = imageData.data[offset_shift]
        imageData.data[offset + 1] = imageData.data[offset_shift + 1]
        imageData.data[offset + 2] = imageData.data[offset_shift + 2]
        imageData.data[offset + 3] = 255
      }
    }
  }

  drawingContext.putImageData(imageData, 0, 0)
}

/**
 * Draws the depthmap
 */
function drawDepthMap () {
  depthMap.background(0)
  depthMap.noStroke()

  // Text
  depthMap.push()
  // depthMap.fill(200, 200, 200)
  // depthMap.translate(0, -100)
  // depthMap.textSize(100)
  // depthMap.textAlign(CENTER, CENTER)
  // depthMap.textStyle(BOLD)
  // depthMap.text('Hello World', width / 2, height / 2)
  // depthMap.translate(0, 200)

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
