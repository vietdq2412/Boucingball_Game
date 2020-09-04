let score = [0, 0];
const X = 800;
const Y = 400;
let fps = 100;


function GameBoard() {
    this.width = X;
    this.height = Y;

    //his.score=[0,0];
    this.ball = [];
    this.bar = [];
    this.isOver = false;

    this.getBall = function(b) {
        this.ball.push(b);
    }
    this.getBar = function(bar) {
        this.bar.push(bar);
    }

    this.drawBoard = function() {
        let board = '<canvas id="myCanvas" width="' + this.width + '" height="' + this.height + '"></canvas>';
        return board;
    }

    this.drawBar = function(bar) {
        let index = this.bar.indexOf(bar);
        context.beginPath();
        context.rect(this.bar[index].coorX, this.bar[index].coorY, this.bar[index].width, this.bar[index].height);
        context.fillStyle = 'red';
        context.fill();
        context.closePath();
    }

    this.drawBall = function(b) {
        let color = getRandomColor();
        let index = this.ball.indexOf(b);
        context.beginPath();
        context.arc(this.ball[index].coorX, this.ball[index].coorY, this.ball[index].radius, 0, 2 * Math.PI);
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
function Ball(name) {
    this.name = name;
    this.coorX = X / 2;
    this.coorY = Y / 2;
    this.radius = 20;
    this.defaultSpeedX = Math.random() * 7 + 3;
    this.defaultSpeedY = Math.random() * 7 + 3;

    this.speedX = this.defaultSpeedX;
    this.speedY = this.defaultSpeedY;


    this.angle;

    this.move = function() {
        this.coorX += this.speedX;
        this.coorY += this.speedY;

        // if (this.coorX + this.radius > canvas.width && this.speedX > 0) {
        //     this.speedX = -this.speedX;
        // }

        if (this.coorY - this.radius < 0 && this.speedY < 0) {
            this.speedY = -this.speedY;
            fps -= 2;
        }
        if (this.coorY + this.radius > canvas.height && this.speedY > 0) {
            this.speedY = -this.speedY;
            fps -= 2;
        }
    };

    this.bounce = function(bar) {
        //console.log(bar.width + ' - ' + this.radius);
        let c = false;
        if (bar.name == 'barLeft') {
            if (this.coorY + this.radius / 2 >= bar.coorY &&
                this.coorY - this.radius / 2 <= bar.coorY + bar.height &&
                this.coorX - this.radius - bar.width < bar.coorX &&
                this.coorX - this.radius > bar.coorX &&
                this.speedX < 0) {
                c = true;
            }
        } else {
            if (this.coorY + this.radius >= bar.coorY &&
                this.coorY - this.radius <= bar.coorY + bar.height &&
                this.coorX + this.radius > bar.coorX &&
                this.coorX + this.radius < bar.coorX + bar.width &&
                this.speedX > 0) {
                c = true;
            }
        }
        if (c) {
            this.speedX = -(this.speedX * 6 / 5);
            this.speedY = this.speedY * 6 / 5;
            bar.height -= 8;
            if (bar.height < 22) bar.height = 22;
            console.log('bounce');
        }
    };
}

////////////////////////////////////////////////////////
function Bar(coordinateX, name) {
    this.name = name;
    this.width = 10;
    this.height = 150;
    this.coorX = coordinateX;
    this.coorY = canvas.height / 2 - this.height / 2;
    this.speed = 20;

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
    };
}