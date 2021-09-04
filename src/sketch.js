/**
 * Austostereogram - Basic 🔺🟥🔴
 * Started: 8/29/21
 * Oz Ramos @TheCodeMedium
 * Twitter: https://twitter.com/thecodemedium
 * GitHub: https://github.com/codemedium
 * Personal website: https://codemedium.com
 */

/**
 * Color palettes
 */
// VSCode Shades of purple editor colors
colors = ['#ffffff', '#ff628c', '#FF9D00', '#fad000', '#2ca300', '#2EC4B6', '#5D37F0']
bg = '#000000'

/**
 * Sketch entry point
 */
function setup() {
  // Param args
  params = Object.assign({
    pixelSize: 4,
    tileSize: 128,
    intensity: 0.05,
    baseScale: 4
  }, getURLParams())

	createCanvas(windowWidth, windowHeight)
  tile = createGraphics(parseInt(params.tileSize), parseInt(params.tileSize))
  depthMap = createGraphics(windowWidth, windowHeight)

  pixelDensity(1)
  tile.pixelDensity(1)
  depthMap.pixelDensity(1)

  tile.angleMode(DEGREES)
  tile.rectMode(CENTER)
  depthMap.angleMode(DEGREES)
  depthMap.rectMode(CENTER)

  curDrawCanvas = tile

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
  image(depthMap, windowWidth - windowWidth / 6, windowHeight - windowHeight / 6, windowWidth / 6, windowHeight / 6)
}

/**
 * Create the magic tiles
 * @see https://github.com/vpoupet/playground
 */
function drawTiles () {
  curDrawCanvas.clear()

  // Draw the tile
  bg = getColor()
  curDrawCanvas.background(bg)

  for (let x = 0; x < parseInt(params.tileSize) / parseInt(params.pixelSize) + 1; x++) {
    for (let y = 0; y < parseInt(params.tileSize) / parseInt(params.pixelSize) + 1; y++) {
      curDrawCanvas.noStroke()
      if (bg === '#ffffff') {
        curDrawCanvas.fill(0, 0, 0, random(50))
      } else {
        curDrawCanvas.fill(255, 255, 255, random(100))
      }
      curDrawCanvas.rect(x * parseInt(params.pixelSize), y * parseInt(params.pixelSize), parseInt(params.pixelSize), parseInt(params.pixelSize))
    }
  }
  curDrawCanvas.stroke(50)
  refresh()

  // Get depth map data
  let depthData = depthMap.drawingContext.getImageData(0, 0, windowWidth, windowHeight)

  // Draw two blank columns to use for shifting
  for (let i = 0; i < height / parseInt(params.tileSize); i++) {
    image(tile, 0, i * parseInt(params.tileSize))
    image(tile, parseInt(params.tileSize), i * parseInt(params.tileSize))
  }
  let imageData = drawingContext.getImageData(0, 0, windowWidth, windowHeight)

  // Create the austostereogram
  for (let y = 0; y < windowHeight; y++) {
    for (let x = 0; x < windowWidth; x++) {
      let shift = Math.floor(depthData.data[4 * (x + windowWidth * y)] * parseFloat(params.intensity)) - parseInt(params.tileSize)
      if (0 <= x + shift && x + shift < windowWidth) {
        let offset = (x + windowWidth * y) << 2
        let offsetShift = (x + shift + windowWidth * y) << 2
        imageData.data[offset] = imageData.data[offsetShift]
        imageData.data[offset + 1] = imageData.data[offsetShift + 1]
        imageData.data[offset + 2] = imageData.data[offsetShift + 2]
        imageData.data[offset + 3] = 255
      }
    }
  }

  drawingContext.putImageData(imageData, 0, 0)

  // Draw helper dots
  push()
  fill(255, 0, 0)
  stroke(255, 255, 255)
  strokeWeight(3)
  circle(width / 2 - 64, 20, 20)
  circle(width / 2 + 64, 20, 20)

  textSize(30)
  strokeWeight(5)
  textAlign(CENTER, CENTER)
  text('Relax eyes until 2 dots merge into a 3rd dot', width / 2, 80)
  text('Relax eyes until 2 dots merge into a 3rd dot', width / 2, height - 20)

  strokeWeight(3)
  circle(width / 2 - 64, height - 80, 20)
  circle(width / 2 + 64, height - 80, 20)
  pop()
}

/**
 * Draws the depthmap
 */
function drawDepthMap () {
  // depthMap.background(0)
  // depthMap.noStroke()

  // depthMap.push()

  // // Triangle
  // depthMap.translate(-250, 0)
  // depthMap.triangle(width / 2, height / 2 - 100, width / 2 + 100, height / 2 + 100, width / 2 - 100, height / 2 + 100)

  // // Square
  // depthMap.translate(250, 0)
  // depthMap.rect(width / 2 - 100, height / 2 - 100, 200, 200)

  // // Circle
  // depthMap.translate(250, 0)
  // depthMap.circle(width / 2, height / 2, 200)
  // depthMap.pop()
  curDrawCanvas = depthMap
  curDrawCanvas.push()

  let baseScale = params.baseScale
  let colorsTemp = colors
  colors = ['#ffffff']
  params.baseScale = 80

  depthMap.stroke('#ffffff')
  depthMap.translate(depthMap.width / 2, depthMap.height / 2.5)
  depthMap.background(0)
  new TangramBuilding(round(random(1, 3)), '#000000')

  params.baseScale = baseScale
  colors = colorsTemp
  curDrawCanvas.pop()
  curDrawCanvas = tile
}

/**
 * Main draw loop
 */
function draw() {}

/**
 * Returns a color in colors
 */
function getColor (arr) {
  if (!arr) arr = colors
  return arr[Math.floor(random(arr.length))]
}















/**
 * Refresh the scene
 */
function refresh () {
  for (let x = 0; x < ~~(width / (params.baseScale * 6)); x++) {
    for (let y = 0; y < ~~(height / (params.baseScale * 6)); y++) {
      curDrawCanvas.push()
      curDrawCanvas.translate(x * params.baseScale * 8 + params.baseScale * 3.5, y * params.baseScale * 8 + params.baseScale * 3.5)
      new TangramBuilding(round(random(1, 3)), bg)
      curDrawCanvas.pop()
    }
  }
}

/**
 * Create a building
 */
class TangramBuilding {
  constructor (type, bg) {
    switch (type) {
      case 1:
        curDrawCanvas.translate(0, .45 * params.baseScale)

        // Chimney
        addTangram('square', 'sm', bg)
        
        // Roof
        addTangram('quadFlipped', 'sm', bg, -.5, 1)
        addTangram('triangle', 'lg', bg, .9, 1.03)

        // Facade
        addTangram('triangle', 'md', bg, -.5, 1.97, -45)
        addTangram('triangle', 'lg', bg, .445, 2.44, 0)
        addTangram('triangle', 'md', bg, 1.4, 1.975, 45)
      break

      case 2:
        curDrawCanvas.translate(0, 2 * -params.baseScale)

        // Chimney
        addTangram('triangle', 'sm', bg)
        addTangram('square', 'sm', bg, 0, .745)
        addTangram('triangle', 'md', bg, 0, 1.58, 180)

        // Stack
        addTangram('triangle', 'sm', bg, 0.465, 2.25, -90)
        addTangram('quadFlipped', 'sm', bg, 0.5, 3.26, -90)

        // Base
        addTangram('triangle', 'lg', bg, .665, 4.6, -135)
        addTangram('triangle', 'lg', bg, -.665, 4.6, 135)
      break

      case 3:
        curDrawCanvas.translate(1.535 * -params.baseScale, .35 * -params.baseScale)

        // Chimney
        addTangram('triangle', 'sm', bg, 0, 0, -45)
        addTangram('triangle', 'md', bg, .335, .68, -90)
        addTangram('quadFlipped', 'sm', bg, .167, 1.67, -90)

        // Base left
        addTangram('triangle', 'lg', bg, .34, 3, -135)
        addTangram('triangle', 'sm', bg, 1.34, 3, 45)

        // Roof
        addTangram('triangle', 'lg', bg, 2.09, 2.195, 0)

        // Base right
        addTangram('square', 'sm', bg, 3, 3.17, 0)
      break
    }
  }
}

/**
 * Tangram
 */
function addTangram (shape, size, bg, xShift = 0, yShift = 0, rot = 0) {
  curDrawCanvas.push()
  if (xShift || yShift) {
    curDrawCanvas.translate(xShift * params.baseScale, yShift * params.baseScale)
  }
  
  switch (shape) {
    /**
     * Squares
     */
    case 'square':
      switch (size) {
        case 'sm':
          r = random()
          if (r < 1 / 3) {
            new TriangleSm(0, 0, 270 + rot, bg, .1695, .1695)
            new TriangleSm(0, 0, 90 + rot, bg, .1695, .1695)
          } else if (r < 2 / 3) {
            new TriangleSm(0, 0, 0 + rot, bg, .1695, .1695)
            new TriangleSm(0, 0, -180 + rot, bg, .1695, .1695)
          } else {
            new SquareSm(0, 0, 0 + rot, bg)
          }
        break

        // @todo
        case 'md':
          r = random()
          if (r < 1 / 3) {
            new TriangleLg(-1, 2.42, 0 + rot, bg)
            new TriangleLg(1, 4.43, 180 + rot, bg)
          } else if (r < 2 / 3) {
            new TriangleLg(1, 2.42, 90 + rot, bg)
            new TriangleLg(-1, 4.43, -90 + rot, bg)
          } else {
            new SquareMd(0, 3.42, 0 + rot, bg)
          }
        break
      }
    break

    /**
     * Triangles
     */
    case 'triangle':
      switch (size) {
        case 'sm':
          new TriangleSm(0, 0, 45 + rot, bg)
        break
        case 'md':
          r = random()
          if (r < .5) {
            new TriangleMd(0, 0, 45 + rot, bg)
          } else {
            new TriangleSm(0, 0, 270 + rot, bg, 0, -.33)
            new TriangleSm(0, 0, 180 + rot, bg, -.33, 0)
          }
        break
        case 'lg':
          r = random()
          if (r < .5) {
            new TriangleLg(0, 0, 45 + rot, bg)
          } else {
            new TriangleMd(0, 0, 180 + rot, bg, -.47, 0)
            new TriangleMd(0, 0, 270 + rot, bg, 0, -.47)
          }
          // @todo subdivide further
        break
      }
    break

    /**
     * Quad
     */
    case 'quad':
      switch (size) {
        case 'sm':
          r = random()
          if (r < .5) {
            new TriangleSm(0, 0, 90 + rot, bg, .17, -.33)
            new TriangleSm(0, 0, 270 + rot, bg, .17, -.33)
          } else {
            new Quad(0, 0, 0 + rot, bg)
          }
        break
      }
    break

    case 'quadFlipped':
      switch (size) {
        case 'sm':
          r = random()
          if (r < .5) {
            new TriangleSm(0, 0, 180 + rot, bg, -0.33, 0.17)
            new TriangleSm(0, 0, 0 + rot, bg, -.33, .17)
          } else {
            new QuadFlipped(0, 0, 0 + rot, bg)
          }
        break
      }
    break
  }

  curDrawCanvas.pop()
}

/**
 * Triangles
 */
class TriangleSm {
  constructor (x, y, rot, bg, xShift = 0, yShift = 0) {
    let newColors = colors.filter(c => c !== bg)
    
    curDrawCanvas.push()
    curDrawCanvas.translate(x * params.baseScale, y * params.baseScale)
    curDrawCanvas.rotate(rot)
    curDrawCanvas.fill(getColor(newColors))
    curDrawCanvas.triangle(
      0 - params.baseScale * .33 - params.baseScale * xShift, params.baseScale - params.baseScale * .33 - params.baseScale * yShift,
      0 - params.baseScale * .33 - params.baseScale * xShift, 0 - params.baseScale * .33 - params.baseScale * yShift,
      params.baseScale - params.baseScale * .33 - params.baseScale * xShift, 0 - params.baseScale * .33 - params.baseScale * yShift)
    curDrawCanvas.pop()
  }
}

// @todo
class TriangleMd {
  constructor (x, y, rot, bg, xShift = 0, yShift = 0) {
    let newColors = colors.filter(c => c !== bg)
    
    curDrawCanvas.push()
    curDrawCanvas.translate(x * params.baseScale, y * params.baseScale)
    curDrawCanvas.rotate(rot)
    curDrawCanvas.fill(getColor(newColors))
    curDrawCanvas.triangle(
      params.baseScale * -.47 - params.baseScale * xShift, params.baseScale * sqrt(2) + params.baseScale * -.47 - params.baseScale * yShift,
      params.baseScale * -.47 - params.baseScale * xShift, params.baseScale * -.47 - params.baseScale * yShift,
      params.baseScale * sqrt(2) + params.baseScale * -.47 - params.baseScale * xShift, params.baseScale * -.47 - params.baseScale * yShift
    )
    curDrawCanvas.pop()
  }
}

// @todo
class TriangleLg {
  constructor (x, y, rot, bg) {
    let newColors = colors.filter(c => c !== bg)
    
    curDrawCanvas.push()
    curDrawCanvas.translate(x * params.baseScale, y * params.baseScale)
    curDrawCanvas.rotate(rot)
    curDrawCanvas.fill(getColor(newColors))
    curDrawCanvas.triangle(params.baseScale * -.67, params.baseScale * 2 + params.baseScale * -.67, params.baseScale * -.67, params.baseScale * -.67, params.baseScale * 2 + params.baseScale * -.67, params.baseScale * -.67)
    curDrawCanvas.pop()
  }
}

/**
 * Squares
 */
class SquareSm {
  constructor (x, y, rot, bg) {
    let newColors = colors.filter(c => c !== bg)
    
    curDrawCanvas.push()
    curDrawCanvas.translate(x * params.baseScale, y * params.baseScale)
    curDrawCanvas.rotate(rot)
    curDrawCanvas.fill(getColor(newColors))
    curDrawCanvas.rect(0, 0, params.baseScale, params.baseScale)
    curDrawCanvas.pop()
  }
}

class SquareMd {
  constructor (x, y, rot, bg) {
    let newColors = colors.filter(c => c !== bg)
    
    curDrawCanvas.push()
    curDrawCanvas.translate(x * params.baseScale, y * params.baseScale)
    curDrawCanvas.rotate(rot)
    curDrawCanvas.fill(getColor(newColors))
    curDrawCanvas.rect(0, 0, params.baseScale * 2, params.baseScale * 2)
    curDrawCanvas.pop()
  }
}

class SquareLg {
  constructor () {}
}

/**
 * Parallelagrams
 */
class Quad {
  constructor (x, y, rot, bg) {
    let newColors = colors.filter(c => c !== bg)
    
    curDrawCanvas.push()
    curDrawCanvas.translate(x * params.baseScale, y * params.baseScale)
    curDrawCanvas.rotate(rot)
    curDrawCanvas.fill(getColor(newColors))
    curDrawCanvas.quad(
      0 - params.baseScale, 0 - params.baseScale / 2,
      0, 0 - params.baseScale / 2,
      params.baseScale, params.baseScale - params.baseScale / 2,
      0, params.baseScale - params.baseScale / 2
    )
    curDrawCanvas.pop()
  }
}
class QuadFlipped {
  constructor (x, y, rot, bg) {
    let newColors = colors.filter(c => c !== bg)
    
    curDrawCanvas.push()
    curDrawCanvas.translate(x * params.baseScale, y * params.baseScale)
    curDrawCanvas.rotate(rot)
    curDrawCanvas.fill(getColor(newColors))
    
    curDrawCanvas.quad(
      0 + params.baseScale, 0 - params.baseScale / 2,
      0, 0 - params.baseScale / 2,
      -params.baseScale, params.baseScale - params.baseScale / 2,
      0, params.baseScale - params.baseScale / 2
    )
    curDrawCanvas.pop()
  }
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
  refresh()
  drawScene()
}
const keypressFn = [function () {
  refresh()
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

