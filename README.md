# Austostereogram
An exploration into "Magic Eye" style images

!["Magic Eye" styled austostereogram](https://user-images.githubusercontent.com/89111078/131412344-39c6f498-e103-4496-8917-dbf78671c87d.png)

```js
?pixelSize=2&tileSize=128&intensity=0.05
```

## CCapture to mp4 with spacebar

Uncomment `ccapturer` line in `index.html` to enable. Then press Space to start recording the canvas into an mp4

## `keyPressed.push(fn)`

All functions passed into this array will be called when p5 calls `keyPressed()`. This is helpful for splitting it across multiple files (eg to record the canvas into a mp4)

## `getColor(transparentAmountHex)`

Returns a random color from `colors`

# Acknowledgements

This work was inspired and derived from this project: https://github.com/vpoupet/playground
