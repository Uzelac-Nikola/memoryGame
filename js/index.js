(function() {

})
// Fade in the body
document.querySelector('body').style.opacity = 0;

setTimeout(function() {
    document.querySelector('body').style.opacity = 1;
});


var body = document.querySelector('body'),
    tilesNumber = document.querySelector('#settings p span'),
    tilesInput = document.querySelector('#settings input'),
    startBtn = document.querySelector('#settings button[name=start]'),
    resetBtn = document.querySelector('#settings button[name=reset]'),
    playArea = document.querySelector('#play-area');


tilesInput.addEventListener('input', function() {
    tilesNumber.innerHTML = tilesInput.value;
});

resetBtn.addEventListener('click', function() {
    startBtn.removeAttribute('disabled');
    tilesInput.removeAttribute('disabled');
    playArea.innerHTML = '';
});

startBtn.addEventListener('click', function() {
    startBtn.setAttribute('disabled', '');
    tilesInput.setAttribute('disabled', '');

    // Create tiles
    for (var i = 0; i < tilesInput.value; i++) {
        playArea.innerHTML += '<div class="tile"><p></p></div>';
    }

    // Push to `numsToAssign` all the numbers from 0 to `tilesInput / 2`
    var numsToAssign = [];

    for (var i = 0; i < tilesInput.value / 2; i++) {
        numsToAssign.push(i, i);
    }

    // Assign each number of `numsToAssign` to each tile randomly
    var randomNum = Math.floor(Math.random() * tilesInput.value);
    var randomTile = document.querySelectorAll('.tile p')[randomNum];

    for (var i = 0; i < tilesInput.value; i++) {
        do {
            if (!randomTile.innerHTML) {
                randomTile.innerHTML = numsToAssign.shift();
            }

            randomNum = Math.floor(Math.random() * tilesInput.value);
            randomTile = document.querySelectorAll('.tile p')[randomNum];
        } while (randomTile.innerHTML && numsToAssign.length > 0)
    }

    startGame();
})();


function startGame() {
    var tiles = document.querySelectorAll('.tile');
    var firstClickedTile;
    var secondClickedTile;

    // Add click event for every tile
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].addEventListener('click', matching);
    }

    function matching(event) {
        if (!firstClickedTile) {
            firstClickedTile = event.target.parentNode;
            firstClickedTile.firstChild.style.filter = 'blur(0px)';
        } else if (event.target.parentNode !== firstClickedTile) {
            secondClickedTile = event.target.parentNode;
            secondClickedTile.firstChild.style.filter = 'blur(0px)'


            if (firstClickedTile.firstChild.innerText == secondClickedTile.firstChild.innerText) {
                firstClickedTile.classList.add('matched');
                secondClickedTile.classList.add('matched');

                firstClickedTile.removeEventListener('click', matching);
                secondClickedTile.removeEventListener('click', matching);

                firstClickedTile.firstChild.style.filter = 'blur(0px)';
                secondClickedTile.firstChild.style.filter = 'blur(0px)';

                tilesClickDelayAndWinCheck();
            } else {
                setTimeout(function() {
                    firstClickedTile.firstChild.style.filter = 'blur(15px)';
                    secondClickedTile.firstChild.style.filter = 'blur(15px)';
                }, 400);

                tilesClickDelayAndWinCheck();
            }

            setTimeout(function() {
                firstClickedTile = undefined;
            }, 400);
        }
    }

    // Removes click events on tiles to be able to see the second tile, then adds events back.
    function tilesClickDelayAndWinCheck() {
        var notMatchedTiles = 0;

        for (var i = 0; i < tiles.length; i++) {
            tiles[i].removeEventListener('click', matching);

            if (!tiles[i].classList.contains('matched')) {
                notMatchedTiles++;
            }
        }

        if (notMatchedTiles === 0) {
            alert("Pobedio si.")

            return;
        }

        setTimeout(function() {
            for (var i = 0; i < tiles.length; i++) {
                tiles[i].addEventListener('click', matching);
            }
        }, 400);
    }
}