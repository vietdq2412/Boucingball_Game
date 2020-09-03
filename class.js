var score = [];
const X = 800;
const Y = 400;
let fps = 100;


function GameBoard() {
    this.width = X;
    this.height = Y;

    this.score;
    this.ball = [];
    this.bar;
    this.isOver = false;

    this.getBall = function(ball) {
        this.ball = ball;
    }
    this.getBar = function(bar) {
        this.bar = bar;
    }

    this.drawBoard = function() {
        let board = '<canvas id="myCanvas" width="' + this.width + '" height="' + this.height + '"></canvas>';
        return board;
    }

    this.drawBar = function() {
        context.beginPath();
        context.rect(this.bar.coorX, this.bar.coorY, this.bar.width, this.bar.height);
        context.fillStyle = 'red';
        context.fill();
        context.closePath();
    }

    this.drawBall = function() {
        let color = getRandomColor();
        context.beginPath();
        context.arc(this.ball.coorX, this.ball.coorY, this.ball.radius, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }

    this.clear = function() {
        context.clearRect(0, 0, this.width, this.height);
    }

    this.reset = function() {}
}

/////////////////////////////////////////////////////////////////
function Ball() {
    this.coorX = X / 2;
    this.coorY = Y / 2;
    this.radius = 20;

    this.speedX = Math.floor(Math.random()) + 3;
    this.speedY = Math.floor(Math.random()) + 3;
    this.angle;

    this.move = function() {
        this.coorX += this.speedX;
        this.coorY += this.speedY;

        if (this.coorX + this.radius > canvas.width && this.speedX > 0) {
            this.speedX = -this.speedX;
        }

        if (this.coorY - this.radius < 0 && this.speedY < 0) {
            this.speedY = -this.speedY;
            fps -= 2;
        }
        if (this.coorY + this.radius > canvas.height && this.speedY > 0) {
            this.speedY = -this.speedY;
            fps -= 2;
        }
    }

    this.bounce = function(bar) {
        console.log(bar.width + ' - ' + this.radius);
        if (this.coorY > bar.coorY && this.coorY < bar.coorY + bar.height &&
            this.coorX - this.radius - bar.width < bar.coorX &&
            this.coorX - this.radius > bar.coorX &&
            this.speedX < 0) {
            ball.speedX = -ball.speedX;
            bar.height -= 8;
            if (bar.height < 22) bar.height = 22;
            console.log('bounce');
        }
    }
}
////////////////////////////////////////////////////////
function Bar() {
    this.coorX = 0;
    this.coorY = 0;
    this.width = 10;
    this.height = 150;
    this.speed = 10;

    this.isMovingUp = false;
    this.isMovingDown = false;

    this.drawBar = function() {
        context.beginPath();
        context.rect(this.coorX, this.coorY)
        context.endPath();
    }

    this.moveUp = function() {
        this.coorY -= this.speed;
    }

    this.moveDown = function() {
        this.coorY += this.speed;
    }

    this.barBound = function() {
        if (this.coorY < 0) {
            this.coorY = 0;
        }

        if (this.coorY + this.height > Y) {
            this.coorY = Y - this.height;
        }
    }
}