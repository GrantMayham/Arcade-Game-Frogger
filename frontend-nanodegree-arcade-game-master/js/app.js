//gem object to create gems
var Gems = function(x, y) {
    this.x = x;
    this.y = y;
    this.boxWidth = 100;
    this.boxHeight = 100;
    this.hitBox = {
        x: this.x,
        y: this.y,
        width: this.boxWidth,
        height: this.boxHeight
    };
    this.sprite = "images/Gem_Blue.png";
};

Gems.prototype.makeHitBox = function() {
    this.hitBox.x = this.x;
    this.hitBox.y = this.y;
};

Gems.prototype.drawHitBoxs = function(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();

};

Gems.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    var rectX = this.hitBox.x;
    var rectY = this.hitBox.y + 60;
    var rectWidth = this.boxWidth;
    var rectHeight = this.boxHeight;
    this.drawHitBoxs(rectX, rectY, rectWidth, rectHeight, "red");
};
Gems.prototype.update = function(dt) {
    this.checkCollisions();
    this.makeHitBox();
    return this.x;
};

//checks to see if player hits gem to collect it
Gems.prototype.checkCollisions = function() {
    var rect1 = player.getBoundingBox();
    var rect2 = this.hitBox;
    //this is the collision check code from the MDN 2d collision check:
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
        // collision detected!
        console.log('collected');
        this.reset();
    }
};

Gems.prototype.reset = function() {
    score += 100;
    this.x = -500;
    this.makeHitBox();
};

Gems.prototype.randomGemsOnWin = function() {
    this.x = Math.floor((Math.random() * 450) + 10);
};

// Enemies our player must avoid
var Enemy = function(x, y, enemySpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.enemySpeed = changeEnemySpeeds();
    this.boxWidth = 100;
    this.boxHeight = 70;
    this.hitBox = {
        x: this.x,
        y: this.y,
        width: this.boxWidth,
        height: this.boxHeight
    };

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.makeHitBox = function() {
    this.hitBox.x = this.x;
    this.hitBox.y = this.y;
};

Enemy.prototype.drawHitBox = function(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
};

//randomly gives enemies a speed
function changeEnemySpeeds() {
    return Math.floor((Math.random() * 175) + 10);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.enemySpeed * dt);
    if (this.x > 505) {
        this.x = 0;
    }
    this.makeHitBox();
    return this.x;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    var rectX = this.hitBox.x;
    var rectY = this.hitBox.y + 75;
    var rectWidth = this.boxWidth;
    var rectHeight = this.boxHeight;
    this.drawHitBox(rectX, rectY, rectWidth, rectHeight, "red");
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = "images/char-boy.png";
    this.x = 200;
    this.y = 425;
    this.boxWidth = 65;
    this.boxHeight = 75;
    this.boxXvalue = this.x + 18;
    this.boxYvalue = this.y + 61;
    this.hitBox = {
        x: this.x,
        y: this.y,
        width: this.boxWidth,
        height: this.boxHeight
    };
};

Player.prototype.drawBox = function(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 425;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.drawBox(this.boxXvalue, this.boxYvalue, this.boxWidth, this.boxHeight, "blue");
    displayInfo();
};

Player.prototype.updateHitBox = function() {
    this.boxXvalue = this.x + 20;
    this.boxYvalue = this.y + 65;
};

//I use this to dynamically get the box of the player to see if it hits gem
Player.prototype.getBoundingBox = function() {
    var box = {
        x: this.boxXvalue,
        y: this.boxYvalue,
        width: this.boxWidth,
        height: this.boxHeight
    };
    return box;
};

//checks to see if enemy got my player
Player.prototype.checkCollisions = function() {
    var playerBox = {
        x: this.boxXvalue,
        y: this.boxYvalue,
        width: this.boxWidth,
        height: this.boxHeight
    };
    for (var k = 0; k < allEnemies.length; k++) {
        var rect1 = playerBox;
        var rect2 = allEnemies[k].hitBox;
        //this is the collision check code from the MDN 2d collision check:
        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y) {
            // collision detected!
            score -= 100;
            console.log('collided');
            this.render();
            this.reset();
        }
    }

};

//handles movement of my player
Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case "left":
            this.x -= 50;
            break;
        case "right":
            this.x += 50;
            break;
        case "up":
            this.y -= 50;
            break;
        case "down":
            this.y += 50;
            break;
    }
};

//displays player score
function displayInfo(player) {
    var canvas = document.getElementsByTagName("canvas");
    scoreDiv.innerHTML = "Player Score: " + score + " ! ";
    document.body.insertBefore(scoreDiv, canvas[0]);


};

Player.prototype.update = function() {
    if (this.x > 505 || this.x < 0) {
        if (this.x > 400) {
            this.x = 400;
        } else if (this.x < 0) {
            this.x = 0;
        }
    }
    if (this.y > 606 || this.y < 0) {
        if (this.y > 606) {
            this.y = 606;
        } else if (this.y < 0) {
            //this.playerWin();
            for (var k = 0; k < allGems.length; k++) {
                allGems[k].randomGemsOnWin();

            };
            this.reset();
            score += 25;
            displayInfo(); //make a function that says they win and accounts for jewels collected
        }
    }
    //check if its hit anything
    this.updateHitBox();
    this.checkCollisions();

};

/* 
// Increase number of enemies on screen based on player's score
var increaseDifficulty = function(numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;

    // load new set of enemies
    for (var i = 0; i <= numEnemies; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
        
        allEnemies.push(enemy);
    }
};
*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0, 230), new Enemy(0, 145), new Enemy(0, 60)];
var player = new Player();
var score = 0;
var scoreDiv = document.createElement("div");
var allGems = [new Gems(175, 140), new Gems(10, 75), new Gems(420, 220)];
//$('#lifeOutput').html("<h1>"+lives+"<h1>");
//$('#scoreOutput').html("<h1>"+score+"<h1>");


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});