drawGameSpace(12);

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