const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d');
const fieldWidth = innerWidth * 0.6
const fieldHeight = innerHeight * 0.65
const offsetX = innerWidth / 2 - fieldWidth / 2
const offsetY = innerHeight / 2 - fieldHeight / 2
const gateHeight = fieldHeight * 0.6
const gateWidth = fieldWidth * 0.1
const pi = Math.PI
const stepX = 10
const stepY = 10



const leftStriker = {
  x: offsetX + fieldWidth / 4,
  y: offsetY + fieldHeight / 2,
  color1: 'black',
  color2: 'blue'
}


const rightStriker = {
  x: offsetX + fieldWidth * 0.75,
  y: offsetY + fieldHeight / 2,
  color1: 'blue',
  color2: 'black'
}


canvas.width = innerWidth
canvas.height = innerHeight - 1

render()

function render() {
  drawField()
  drawStriker(leftStriker)
  drawStriker(rightStriker)
}

function drawField() {
  ctx.fillStyle = 'green';
  ctx.fillRect(offsetX, offsetY, fieldWidth, fieldHeight);
  drawCircle(offsetX + fieldWidth / 2, innerHeight / 2, 120)
  ctx.strokeRect(offsetX + fieldWidth / 2, offsetY, 0, fieldHeight)
  drawCircle(offsetX + fieldWidth / 2, innerHeight / 2, 20, 'red')
  drawRect(offsetX, offsetY + (fieldHeight - gateHeight) / 2, gateWidth, gateHeight)
  drawRect(offsetX + fieldWidth - gateWidth, offsetY + (fieldHeight - gateHeight) / 2, gateWidth, gateHeight)
}



canvas.onmousemove = e => {
  if (e.x < (offsetX + fieldWidth / 2) - 40 && e.x > offsetX + 40 && e.y > offsetY + 40  && e.y < offsetY + fieldHeight - 40) {
    moveStriker(leftStriker, e.x, e.y)
    render()
  }
}

document.onkeydown = e => {
    if (e.key == 'ArrowDown') {
    moveStrikerOnKeyboard(rightStriker, 0, stepY)
  } else if (e.key == 'ArrowRight') {
    moveStrikerOnKeyboard(rightStriker, stepX, 0)
  } else if (e.key == 'ArrowUp') {
    moveStrikerOnKeyboard(rightStriker, 0, -stepY)
  } else if (e.key == 'ArrowLeft') {
    moveStrikerOnKeyboard(rightStriker, -stepX, 0)
  }
  render()
}


function drawRect(x, y, w, h) {
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + w, y)
  ctx.lineTo(x + w, y + h)
  ctx.lineTo(x, y + h)
  ctx.lineTo(x, y)
  ctx.stroke()
}

function drawCircle(x, y, radius, color) {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * pi)
  ctx.fillStyle = color
  ctx.fill()
  ctx.stroke()
}

function drawStriker(striker) {
  drawCircle(striker.x, striker.y, 40, striker.color1)

  drawCircle(striker.x, striker.y, 25, striker.color2)

  ctx.fillStyle = striker.color1
  ctx.fillRect(striker.x - 7.5, striker.y - 27, 15, 54)
}


function moveStriker(striker, x, y) {
  striker.x = x
  striker.y = y
}

function moveStrikerOnKeyboard(striker, stepX = 0, stepY = 0) {
  striker.x += stepX
  striker.y += stepY
}


