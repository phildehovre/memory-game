var  first, second
var score = 0 


const imgPaths = [
    './assets/pictures/cards/chicken1.png',
    './assets/pictures/cards/chicken2.png',
    './assets/pictures/cards/politician1.png',
    './assets/pictures/cards/politician2.png',
    './assets/pictures/cards/steampunk1.png',
    './assets/pictures/cards/steampunk2.png',
    './assets/pictures/cards/treasury1.png',
    './assets/pictures/cards/treasury2.png',
]


window.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector(".board")
    populateBoard(board)
    const tiles = document.querySelectorAll('.tile')
    initTiles(tiles)
})

function initTiles(board) {
    board.forEach(tile => {
        tile.addEventListener('click', () => {

        if (first && second) return;

        flipTile([tile]) 

        if (first) {
           second = tile
           if (checkMatch()) {
                handleMatch()
           } else {
                handleMismatch()
           }
        } 

        if (!first) {
            first = tile
            freezeTile(first)
            return
        }
    })
})
}

function populateBoard(board) {
    let boardImages = [...imgPaths, ...imgPaths]; 
    const originalLength = boardImages.length;  
    
    for (let i = 0; i < originalLength; i++) {
        const itemToSlice = Math.floor(Math.random() * boardImages.length);
        const tile = createTile(boardImages[itemToSlice], board);
        
        boardImages.splice(itemToSlice, 1);
        board.appendChild(tile)
    }
}

function createTile(imgPath) {
    const tile = document.createElement('li')
    tile.classList.add('tile')
    const front = document.createElement('span')
    front.classList.add('front')
    front.setAttribute("item", imgPath)
    const back = document.createElement('span')
    back.classList.add('back')
    back.classList.add('show')

    tile.appendChild(back)
    tile.appendChild(front)

    front.style.backgroundImage = `url(${imgPath})`
    front.style.backgroundSize = "cover"

    return tile
}

function flipTile(tiles) {
    tiles.forEach(tile => {
        const back = tile.querySelector('.back')
        const front = tile.querySelector('.front')
        back.classList.toggle('show')
        front.classList.toggle('show')
    })
}

function resetChoices() {
    const tilesToFlip = [first, second]
    const reset = setTimeout(() => {
        if (!checkMatch()) {
           flipTile(tilesToFlip) 
        }
        [first, second] = [undefined, undefined]
    }, 750 )
    return () => clearInterval(reset)
}

function checkMatch() {
    const firstChoice = first.querySelector('.front').getAttribute("item")
    const secondChoice = second.querySelector('.front').getAttribute("item")
    return  firstChoice === secondChoice 
}

function handleMatch() {
    freezeTile(second)
    updateScore()
    resetChoices()
}
function handleMismatch() {
    unfreezeTile(first)
    resetChoices()
}

function freezeTile(tile) {
    tile.classList.add('frozen')
}

function unfreezeTile(tile) {
    tile.classList.remove('frozen')
}

function updateScore() {
    score += 1
    const points = document.querySelector('.points')
    points.classList.add('points')
    points.style.width = `${12.5 * score}%` 
}
