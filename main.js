// Parameters
let smallSize = 10;
let mediumSize = 16;
let largeSize = 24;
let color = "black";
let isDrawing = false;
let drawer;

window.addEventListener('mousedown', e => {
    isDrawing = true;
    let target = e.target;
        if(target.classList.contains('gameSquare')) {
            target.style.backgroundColor = color;
        }
    console.log(isDrawing)
});

window.addEventListener('mouseup', e => {
    isDrawing = false;
    console.log(isDrawing)
});

drawer = function(e) {
    if (isDrawing) {
        let target = e.target;
        if(target.classList.contains('gameSquare')) {
            target.style.backgroundColor = color;
        }
    }
}

function selectControl(arg) {
    // Reset all background colors first
    const allButtons = document.querySelectorAll('.control');
    let buttonArray = Array.prototype.slice.call(allButtons);
    for (let i = 0; i < buttonArray.length; i++) {
        buttonArray[i].style.backgroundColor = "";
    }

    // Set bg color to selected
    arg.style.backgroundColor = "var(--pixelBackground)";
}

// Color selection buttons
const blackBtn = document.querySelector('#blackSelect');
blackBtn.addEventListener('click', function (e) {
    color = "black";
    selectControl(blackBtn);
});

const colorBtn = document.querySelector('#colorSelect');
colorBtn.addEventListener('click', function (e) {
    const colorBox = document.querySelector('.colorBox');
    const colorSelect = document.getElementById("colorSelect");
    const colorButton = document.getElementById("colorButton");

    colorSelect.addEventListener("change", updateColor, false);

    function updateColor(event) {
        color = colorSelect.value;
        colorBox.style.backgroundColor = colorSelect.value;
        selectControl(colorButton);
    }
});

const eraseBtn = document.querySelector('#eraseSelect');
eraseBtn.addEventListener('click', function (e) {
    color = "";
    selectControl(eraseBtn);
});

// Setting space buttons
const smallBtn = document.querySelector('#small');
smallBtn.addEventListener('click', function (e) {
    if (window.confirm("Changing size will reset your progress.")) {
        drawGameSpace(smallSize);
    }
});

const mediumBtn = document.querySelector('#medium');
mediumBtn.addEventListener('click', function (e) {
    if (window.confirm("Changing size will reset your progress.")) {
        drawGameSpace(mediumSize);
    }
});

const largeBtn = document.querySelector('#large');
largeBtn.addEventListener('click', function (e) {
    if (window.confirm("Changing size will reset your progress.")) {
        drawGameSpace(largeSize);
    }
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

const resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', function (e) {
    if (window.confirm("Do you really want to reset the drawing space?")) {
        const gameSquares = document.querySelectorAll('.gameSquare');

        // Convert to array and reset backgroundColor.value
        let arr = Array.prototype.slice.call(gameSquares);
        for (let i = 0; i < arr.length; i++) {
            arr[i].style.backgroundColor = '';
        }
    }
});

const settingsBtn = document.querySelector('#slider');
settingsBtn.addEventListener('click', function (e) {
    const settingSpace = document.querySelector('.settingSpace');
    settingSpace.classList.toggle('displayNone');
});

const toolsBtn = document.querySelector('#tools');
toolsBtn.addEventListener('click', function (e) {
    const controlSpace = document.querySelector('.controlSpace');
    controlSpace.classList.toggle('displayNone');
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