let gameBoard = new GameBoard();
let data = gameBoard.drawBoard();
document.getElementById('board').innerHTML = data;

let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
canvas.width = X;
canvas.height = Y;


let paddle = new Bar(70, 'barLeft');
let paddle2 = new Bar(canvas.width - 70, 'barRight');
gameBoard.getBar(paddle);
gameBoard.getBar(paddle2);


let ball = new Ball('b1');
gameBoard.getBall(ball);
randomDirection(ball);
//gameBoard.drawBall(ball);
let ball2 = new Ball('b2');
gameBoard.getBall(ball2);
randomDirection(ball2);

function randomDirection(b) {
    let random = Math.random() * 2;
    let random2 = Math.random() * 2;
    console.log(random);
    console.log(random2);
    console.log('sY ' + b.speedY);
    console.log('sX ' + b.speedX);
    if (random < 1) {
        b.speedX = -b.speedX;
    }
    if (random2 < 1) {
        b.speedY = -b.speedY;

    }
    console.log('sY ' + b.speedY);
    console.log('sX ' + b.speedX);
}


run(gameBoard);
////
context.beginPath();
context.lineTo(canvas.width / 2, canvas.height);
context.stroke();
context.closePath();
document.addEventListener('keydown', function(event) {
    if (event.keyCode == 83) {
        paddle.isMovingDown = true;
    }
    if (event.keyCode == 87) {
        paddle.isMovingUp = true;
    }
    console.log(event);
});
document.addEventListener('keyup', function(event) {
    if (event.keyCode == 83) {
        paddle.isMovingDown = false;

    }
    if (event.keyCode == 87) {
        paddle.isMovingUp = false;
    }
});

////
document.addEventListener('keydown', function(event) {

    if (event.keyCode == 40) {
        paddle2.isMovingDown = true;
    }
    if (event.keyCode == 38) {
        paddle2.isMovingUp = true;
    }
});
document.addEventListener('keyup', function(event) {

    if (event.keyCode == 40) {
        paddle2.isMovingDown = false;

    }
    if (event.keyCode == 38) {
        paddle2.isMovingUp = false;
    }
});

///////////////////


function run(game) {
    ///////////////////////
    let isCotinue = true;
    if (!game.isOver) {
        game.clear();

        for (let i = 0; i < game.ball.length; i++) {
            game.ball[i].bounce(paddle);
            game.ball[i].bounce(paddle2);
            game.ball[i].move();

            if (game.ball[i].coorX < game.ball[i].radius && game.ball[i].speedX < 0) {
                //game.ball[i].coorX = 20;
                game.isOver = true;
                score[1] = score[1] + 1;
                document.getElementById('1').innerHTML = score[1];
                console.log(score);

            }
            if (game.ball[i].coorX + game.ball[i].radius >= canvas.width) {
                game.isOver = true;
                console.log('right');
                score[0] = score[0] + 1;
                document.getElementById('0').innerHTML = score[0];
                //console.log(score);

            }

            game.drawBall(game.ball[i]);
        }

        for (let i = 0; i < game.bar.length; i++) {
            if (game.bar[i].isMovingDown) {
                game.bar[i].moveDown();
            }
            if (game.bar[i].isMovingUp) {
                game.bar[i].moveUp();
            }
            game.bar[i].barBound();
            game.drawBar(game.bar[i]);
        }
    } else {
        let check = confirm('play again? \n' + 'score: ' + score);
        if (check) {
            for (let i = 0; i < game.ball.length; i++) {
                game.ball[i].coorX = canvas.width / 2;
                game.ball[i].coorY = canvas.height / 2;
                game.ball[i].speedX = game.ball[i].defaultSpeedX;
                game.ball[i].speedY = game.ball[i].defaultSpeedY;

                randomDirection(game.ball[i]);
                console.log("rX" + game.ball[i].speedX);
                console.log("rY" + game.ball[i].speedY);
            }
            for (let i = 0; i < game.bar.length; i++) {
                game.bar[i].height = 150;
            }

            game.isOver = false;
            isCotinue = true;
        } else {
            game.isOver = true;
            isCotinue = false;
        }
    }
    if (isCotinue) {
        setTimeout(() => run(game), 30);
    } else {
        alert('good bye!');

        window.location.href = '../index.html';
    }

    //requestAnimationFrame(run);
}

//////////////////////////////////////////////////////////////////////////

function getRandomHex(assizes) {
    return Math.floor(Math.random() * assizes);
}

function getRandomColor() {
    let red = getRandomHex(255);
    let green = getRandomHex(255);
    let blue = getRandomHex(255);
    return "rgb(" + red + "," + green + "," + blue + ")";
}