const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 600;

const gravity = 1.5;
let difficulty = 0;
let score = 0;
let gameend = 0;

const scoreElement = document.getElementById("score");

// objektid

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 40
        this.height = 40
        this.frameIndex = 0;
        this.frameWidth = 40;
        this.frameHeight = 40;
        this.spriteSheet = new Image();
        this.spriteSheet.src = './img/player.png';
        this.spriteSheet.onload = () => {
            this.draw();
        };
        this.animationInterval = 100;
        this.lastAnimationTime = 0;
    }

    draw() {
        const frameX = this.frameIndex * this.frameWidth;
        c.drawImage(
            this.spriteSheet, 
            frameX, 0, this.frameWidth, this.frameHeight,
            this.position.x, this.position.y, this.width, this.height
        );
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height - ground.height) {
            this.velocity.y += gravity
        } else {
            this.velocity.y = 0
        }
    }

    updateAnimation() {
        const currentTime = Date.now();
        if (currentTime - this.lastAnimationTime > this.animationInterval) {
            this.frameIndex = (this.frameIndex + 1) % 2;
            this.lastAnimationTime = currentTime;
        }
    }
}

class Ground {
    constructor() {
        this.position = {
            x: 0,
            y: 580
        }
        this.width = 2200
        this.height = 20
        this.groundImg = new Image();
        this.groundImg.src = './img/ground.png';
        this.groundImg.onload = () => {
            this.draw();
        };
    }

    draw() {
        canvas.getContext('2d').drawImage(this.groundImg, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw()
        this.position.x += Obstacle.velocity
    }
}

class Background {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }
        this.width = 2000
        this.height = 580
        this.backgroundImg = new Image();
        this.backgroundImg.src = './img/background.png';
        this.backgroundImg.onload = () => {
            this.draw();
        };
    }

    draw() {
        canvas.getContext('2d').drawImage(this.backgroundImg, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw()
        this.position.x += Obstacle.velocity
    }
}

class Obstacle {
    static velocity = -7;
    constructor(randomInt) {
        this.type = randomInt;
        if (this.type == 0) {
            this.image = new Image();
            this.position = {
                x: 1000,
                y: 530
            }
            this.image.src = './img/obstacle0.png';
            this.width = 40;
            this.height = 50;
        } else if (this.type == 1) {
            this.image = new Image();
            this.position = {
                x: 1000,
                y: 500
            }
            this.image.src = './img/obstacle1.png';
            this.width = 30;
            this.height = 80;
        } else if (this.type == 2) {
            this.spriteSheet = new Image();
            this.position = {
                x: 1000,
                y: 420
            }
            this.spriteSheet.src = './img/obstacle2.png';
            this.width = 70;
            this.height = 30;
            this.width = 70;
            this.height = 30;
            this.frameIndex = 0;
            this.frameWidth = 70;
            this.frameHeight = 30;
            this.animationInterval = 500;
            this.lastAnimationTime = 0;
        }
    }

    draw() {
        if (this.type == 2) {
            const frameX = this.frameIndex * this.frameWidth;
            c.drawImage(
                this.spriteSheet,
                frameX, 0, this.frameWidth, this.frameHeight,
                this.position.x, this.position.y, this.width, this.height
            );
        } else {
            c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        }
    }

    update() {
        this.draw()
        this.position.x += Obstacle.velocity
        if (this.type == 2) {
            this.updateAnimation();
        }
    }

    updateAnimation() {
        const currentTime = Date.now();
        if (currentTime - this.lastAnimationTime > this.animationInterval) {
            this.frameIndex = (this.frameIndex + 1) % 2;
            this.lastAnimationTime = currentTime;
        }
    }

    delete() {
        const index = obstacles.indexOf(this);
        if (index > -1) {
            obstacles.splice(index, 1);
        }
    }
}

const background = new Background();
const player = new Player();
const ground = new Ground();
const obstacles = [];

// funktioonid

function updateScore() {
    scoreElement.textContent = "Score: " + score;
}

function createObstacle() {
    let randomInt = Math.floor(Math.random() * 3);
    obstacles.push(new Obstacle(randomInt));
    difficultyObstacle();
}

function detectCollision(player, obstacle) {
    return player.position.x + 5 < obstacle.position.x + obstacle.width &&
        player.position.x + player.width - 5 > obstacle.position.x &&
        player.position.y < obstacle.position.y + obstacle.height &&
        player.position.y + player.height > obstacle.position.y;
}

function animate() {
    score += 1;
    updateScore();;
    if (gameend == 0) {
        requestAnimationFrame(animate)
    } else {
        alert("You lost. Score: " + score)
    }
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    background.update();
    player.update();
    ground.update();

    obstacles.forEach(obstacle => {
        if (obstacles.length === 0) {
        } else {
            obstacle.update()
            if (obstacle.position.x + obstacle.width <= 0) {
                obstacle.delete();
            }
        }
        if (detectCollision(player, obstacle)) {
            gameend = 1;
            endGame()
        }
    })

    if (ground.position.x < -1000) {
        ground.position.x += 1000
    }

    if (background.position.x < -1000) {
        background.position.x += 1000
    }

    player.updateAnimation();
}

function difficultyObstacle() {
    if (difficulty == 0) {
        setTimeout(createObstacle, Math.floor(Math.random() * 1001) + 1600);
    } else if (difficulty == 1) {
        setTimeout(createObstacle, Math.floor(Math.random() * 1001) + 1400);
    } else if (difficulty == 2) {
        setTimeout(createObstacle, Math.floor(Math.random() * 801) + 1200);
    } else if (difficulty == 3) {
        setTimeout(createObstacle, Math.floor(Math.random() * 501) + 1000);
    } else if (difficulty == 4) {
        setTimeout(createObstacle, Math.floor(Math.random() * 501) + 800);
    } else if (difficulty == 5) {
        setTimeout(createObstacle, Math.floor(Math.random() * 501) + 600);
    }
    
    if (score <= 500) {
        difficulty = 0
        Obstacle.velocity = -7
    } else if (score > 1000 && score < 2000) {
        difficulty = 1
        Obstacle.velocity = -8
    } else if (score > 2000 && score < 4000) {
        difficulty = 2
        Obstacle.velocity = -9
    } else if (score > 4000 && score < 6000) {
        Obstacle.velocity = -10
    } else if (score > 6000 && score < 8000) {
        difficulty = 3
        Obstacle.velocity = -11
    } else if (score > 8000 && score < 10000) {
        Obstacle.velocity = -12
    } else if (score > 10000 && score < 12000) {
        difficulty = 4
        Obstacle.velocity = -13
    } else if (score > 12000 && score < 15000) {
        Obstacle.velocity = -14
    } else if (score > 14000 && score < 16000) {
        difficulty = 5
        Obstacle.velocity = -15
    } else if (score > 16000) {
        Obstacle.velocity -= (Math.floor((score - 16000) / 2000)) / 20;
    }
}

function endGame() {
    restartButton.style.display = 'block';
}

function jump() {
    if (player.position.y + player.height >= ground.position.y) {
        player.velocity.y -= 20;
    }
}

// mängu alustamine
createObstacle();
animate()

// event listenerid
const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', () => {
    location.reload();
});

addEventListener('keydown', ({keyCode}) => {
    switch (keyCode) {
        case 32:
        case 87:
        case 38:
            jump();
            break;
    }
})

addEventListener('click', () => {
    jump();
});