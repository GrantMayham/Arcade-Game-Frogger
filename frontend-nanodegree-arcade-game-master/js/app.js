// Enemies our player must avoid
var Enemy = function(x, y, enemySpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.enemySpeed = changeEnemySpeeds();
    this.boxWidth = 100;
    this.boxHeight = 70;
    this.hitBox = {x:this.x, y:this.y, width:this.boxWidth, height:this.boxHeight};

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

var Gems = function(x, y){
    this.x = x;
    this.y = y;
    this.boxWidth = 100;
    this.boxHeight = 100;
    this.hitBox = {x:this.x, y:this.y, width:this.boxWidth, height:this.boxHeight};
    this.sprite = "images/Gem_Blue.png";
};

Gems.prototype.makeHitBox = function(){
    this.hitBox.x = this.x;
    this.hitBox.y = this.y;
};

Gems.prototype.drawHitBoxs = function(x, y, width, height, color){
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();

}; 

Gems.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    var rectX = this.hitBox.x;
    var rectY = this.hitBox.y+60;
    var rectWidth = this.boxWidth;
    var rectHeight = this.boxHeight;
    this.drawHitBoxs(rectX, rectY, rectWidth, rectHeight, "red");
};
Gems.prototype.update = function(dt){
    //score +=500;
    //this.x = 0;
    //this.y = 0;
    this.checkCollisions();
    this.makeHitBox();
    return this.x;
};

Gems.prototype.checkCollisions = function(){
    for(var k = 0; k < allGems.length; k++){
        var rect1 = player.hitBox;
        var rect2 = allGems[k].hitBox;
          //this is the collision check code from the MDN 2d collision check:
        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y) {
            // collision detected!
            console.log('collected');
            Gems.prototype.update();
            //this.render();
            this.reset();
        }
    }

};

Gems.prototype.reset = function(){
    score += 100;
    this.x = 0;
    this.x = 0;
    this.makeHitBox();
}


Enemy.prototype.makeHitBox = function(){
    this.hitBox.x = this.x;
    this.hitBox.y = this.y;
};

Enemy.prototype.drawHitBox = function(x, y, width, height, color){
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
};

function changeEnemySpeeds(){
    return Math.floor((Math.random() * 50) + 10);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x +=  (this.enemySpeed*dt);
    if(this.x > 505){
        this.x = 0;
    }
    this.makeHitBox();
    return this.x;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    var rectX = this.hitBox.x;
    var rectY = this.hitBox.y+75;
    var rectWidth = this.boxWidth;
    var rectHeight = this.boxHeight;
    this.drawHitBox(rectX, rectY, rectWidth, rectHeight, "red");
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = "images/char-boy.png";
    this.x = 200;
    this.y = 425;
    this.boxWidth = 65;
    this.boxHeight = 75;
    this.boxXvalue = this.x + 18;
    this.boxYvalue = this.y + 61;
    this.hitBox = {x:this.boxXvalue, y:this.boxYvalue, width:this.boxWidth, height: this.boxHeight};
};

Player.prototype.drawBox = function(x, y, width, height, color){
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
};

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 425;
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.drawBox(this.boxXvalue, this.boxYvalue, this.boxWidth, this.boxHeight, "blue");
    displayInfo();
};

Player.prototype.updateHitBox = function(){
    this.boxXvalue = this.x + 20;
    this.boxYvalue = this.y + 65;
};

Player.prototype.checkCollisions = function(){
    var playerBox = {x:this.boxXvalue, y:this.boxYvalue, width:this.boxWidth, height: this.boxHeight};
    for(var k = 0; k < allEnemies.length; k++){
        var rect1 = playerBox;
        var rect2 = allEnemies[k].hitBox;
          //this is the collision check code from the MDN 2d collision check:
        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y) {
            // collision detected!
            console.log('collided');
            this.render();
            this.reset();
        }
    }
    
};

Player.prototype.handleInput = function(direction){
    switch(direction){
         case "left":
            this.x -=50;
            break;
        case "right":
            this.x +=50;
            break;
        case "up":
            this.y -=50;
            break;
        case "down":
            this.y +=50;
            break;
    }
};

function displayInfo(player){
    var canvas = document.getElementsByTagName("canvas");
    //$('#scoreOutput').html("<h1>"+score+"<h1>");
    scoreDiv.innerHTML = "Player Score: " + score + " ! " ;
    document.body.insertBefore(scoreDiv, canvas[0]);


};

Player.prototype.update = function(){
    if(this.x > 505 || this.x < 0){
        if(this.x > 400){
            this.x = 400;
        }else if(this.x < 0){
            this.x = 0;
        } 
    }
    if (this.y > 606 || this.y < 0){
        if (this.y > 606){
            this.y = 606;
        }else if (this.y < 0){
            //this.playerWin();
            this.reset();
            score++;
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
var allEnemies = [new Enemy(0,230), new Enemy(0,145), new Enemy(0,60)];
var player = new Player();
var score = 0;
var scoreDiv = document.createElement("div");
var allGems = [new Gems(175, 140), new Gems(10, 80), new Gems(420, 100)];
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
