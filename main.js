let gameBoard = new GameBoard();
let data = gameBoard.drawBoard();
document.getElementById('board').innerHTML = data;

let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');

let paddle = new Bar();
gameBoard.getBar(paddle);


let ball = new Ball();
gameBoard.getBall(ball);
canvas.width = X;
canvas.height = Y;
gameBoard.drawBall();

if (Math.random() * 2 < 1) {
    ball.speedX = -ball.speedX;
}
if (Math.random() * 2 < 1) {
    ball.speedY = -ball.speedY;
}
run(); //
////
document.addEventListener('keydown', function(event) {
    if (event.keyCode == 39) {
        paddle.coorX += 20;
    }
    if (event.keyCode == 37) {
        paddle.coorX -= 20;
    }
    if (event.keyCode == 40) {
        paddle.isMovingDown = true;
    }
    if (event.keyCode == 38) {
        paddle.isMovingUp = true;
    }
});
document.addEventListener('keyup', function(event) {
    if (event.keyCode == 39) {
        paddle.coorX += 20;
    }
    if (event.keyCode == 37) {
        paddle.coorX -= 20;
    }
    if (event.keyCode == 40) {
        paddle.isMovingDown = false;

    }
    if (event.keyCode == 38) {
        paddle.isMovingUp = false;
    }
});

///////////////////
function run() {
    if (!gameBoard.isOver) {
        gameBoard.clear();
        ball.bounce(paddle);
        ball.move();


        if (ball.coorX < ball.radius && ball.speedX < 0) {
            ball.coorX = 20;
            gameBoard.isOver = ball;
        }

        gameBoard.drawBall();
        if (paddle.isMovingDown) {
            paddle.moveDown();
        }

        if (paddle.isMovingUp) {
            paddle.moveUp();
        }
        paddle.barBound();
        gameBoard.drawBar();

    } else {
        console.log('gameOver')
    }
    //setTimeout(run, fps);
    requestAnimationFrame(run);
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