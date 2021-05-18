// Parameters
let smallSize = 10;
let mediumSize = 16;
let largeSize = 24;
let color = "purple";
let isDrawing = false;
let drawer;

drawer = function(e) {
    let target = e.target;
    if(target.classList.contains('gameSquare')) {
        target.style.backgroundColor = color;
    }
}

// Color selection buttons
const blackBtn = document.querySelector('#blackSelect');
blackBtn.addEventListener('click', function (e) {
    color = "black";
});

const colorBtn = document.querySelector('#colorSelect');
colorBtn.addEventListener('click', function (e) {
    const colorBox = document.querySelector('.colorBox');
    const colorSelect = document.getElementById("colorSelect");
    colorSelect.addEventListener("change", updateColor, false);
    color = colorSelect.value;

    function updateColor(event) {
        color = colorSelect.value;
        colorBox.style.backgroundColor = colorSelect.value;    
    }
});

const eraseBtn = document.querySelector('#eraseSelect');
eraseBtn.addEventListener('click', function (e) {
    color = "";
});

// Setting space buttons
const smallBtn = document.querySelector('#small');
smallBtn.addEventListener('click', function (e) {
    drawGameSpace(smallSize);
});

const mediumBtn = document.querySelector('#medium');
mediumBtn.addEventListener('click', function (e) {
    drawGameSpace(mediumSize);
});

const largeBtn = document.querySelector('#large');
largeBtn.addEventListener('click', function (e) {
    drawGameSpace(largeSize);
});

const borderBtn = document.querySelector('#border');
borderBtn.addEventListener('click', function (e) {
    const gameSquares = document.querySelectorAll('.gameSquare');

    // Convert to array and toggle noBorder style
    let arr = Array.prototype.slice.call(gameSquares);
    for (let i = 0; i < arr.length; i++) {
        arr[i].classList.toggle('noBorder');
    }
});

// Function to draw the game space
function drawGameSpace(size) {
    const gameSpace = document.querySelector('.gameSpace');

    // Reset the game space
    resetGameSpace();

    // Create 'size' number of rows
    for(i = 1; i <= size; i++) {    
        const row = document.createElement('div');
        row.classList.add('gameRow');

        gameSpace.appendChild(row);

        // That each contain 'size' number of square
        for(j = 1; j <= size; j++) {
            const square = document.createElement('div');
            square.classList.add('gameSquare');
            square.addEventListener('mouseover', drawer);
            
            row.appendChild(square);

            // Remove border on final elements in each row
            if (j == size) {
                square.classList.add('lastSquareInRow');
            }
            
            // Remove border-bottom on the entire last row
            if (i == size) {
                square.classList.add('lastRow');
            }
        }
    }
}

function resetGameSpace() {
    while(document.querySelector('.gameRow')) {
        let rowRemove = document.querySelector('.gameRow');
        rowRemove.remove();    
    }
}

// Initial drawing of the game space on page load
drawGameSpace(mediumSize);