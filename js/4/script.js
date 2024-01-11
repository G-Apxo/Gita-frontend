const container = document.getElementById('container');

const SQUARES = 1020
const colors = ["#8ecae6" , "#219ebc", "#5FFBF1","#023047","#ffb703"]
for (let i = 0; i < SQUARES; i++) {
    const square = document.createElement('div')
    square.classList.add("square")

    square.addEventListener('mouseover', ()=> setColor(square))
    square.addEventListener("mouseout", ()=> removeColor(square))
    container.appendChild(square)
}

function setColor(element) {
    const color = getRandomColor()
    element.style.background = color
    element.style.boxShadow = `0 0 2px ${colors[0]}, 0 0 10px ${color}`
}

function removeColor(element) {
    element.style.background = '#1d1d1d'
    element.style.boxShadow = 'none'
}


function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}