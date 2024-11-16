

window.addEventListener('DOMContentLoaded', () => {

var first, second
const tiles = document.querySelectorAll(".tile")
const backs = document.querySelectorAll('.back')
// Init fronts as hidden
backs.forEach(back => back.classList.add("show"))


tiles.forEach((tile ) => {
    tile.addEventListener('click', ( ) => {
        const back = tile.querySelector('.back')
        const front = tile.querySelector('.front')
        
        // Show card
        back.classList.remove('show')
        front.classList.add('show')

        if (first != undefined) {
            freezeBoard()
            second = tile 
            if (checkMatch(first, second)) {
                console.log(first, second)
                handleMatch()
                return;
            } 
            handleMismatch(first, second)
            return;
        }

        if (!first) {
            first = tile 
            freezeTile([tile])
        }


        function handleMismatch(first, second) {
            console.log('handling mismatch')
            freezeBoard()
            setTimeout(() => {
                // This can be done in a separate function
                toggleTiles([first, second])
                unfreezeBoard()
            }, 1000)
        }

        function handleMatch() {
            freezeTile([first, second])
            first, second = undefined, undefined
        }
    })
})
})

function checkMatch(first, second) {
    return first == second
}

function freezeBoard() {
    console.log('Freeze!')
}

function unfreezeBoard() {
    console.log('UN-Freeze!')
}

function toggleTiles(tiles) {
    tiles.forEach(tile => {
        const back = tile.querySelector('.back')
        const front = tile.querySelector('.front')
        back.classList.add('show')
        front.classList.remove('show')
    })

}
function freezeTile(tiles) {
    tiles.forEach(tile => {
        tile.classList.add('frozen')
    })
}

function unfreezetile() {
    tiles.forEach(tile => {
        tile.classList.remove('frozen')
    })
}

