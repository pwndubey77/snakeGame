const gameCanvas = document.getElementById("snake");
const gameContext = gameCanvas.getContext("2d");


//create unit
const snakeBodyBox = 32;

//load images

const groundImg = new Image();
groundImg.src = "img/ground.png";

const snakeFoodImg = new Image();
snakeFoodImg.src = "img/food.png";
//snakeFoodImg.alt = "Food";

//load Audio

const eat = new Audio();
const dead = new Audio();
const left = new Audio();
const up = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
left.src = "audio/left.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
down.src = "audio/down.mp3";

//create snake

let snakeInGame = []
snakeInGame[0] = {
    x: 9 * snakeBodyBox,
    y: 10 * snakeBodyBox
}


// create food

let food = {
    x: Math.floor(Math.random()*17+1) * snakeBodyBox,
    y: Math.floor(Math.random()*15+3) * snakeBodyBox
}

//create score var

let score = 0;


// control snake
document.addEventListener("keydown",directions);

let userKey;

function directions(event){
    
    
        if(event.keyCode == 37 && userKey != "RIGHT") {
            userKey="LEFT";
            left.play();
        }
                
        if(event.keyCode == 38 && userKey != "DOWN") {
            userKey="UP";
            up.play();
        }
                
        if(event.keyCode == 39 && userKey != "LEFT") {
            userKey="RIGHT";
            right.play();
        }
                
        if(event.keyCode == 40 && userKey != "UP") {
            userKey="DOWN";
            down.play();
        }
                
    
}

// check collision in snake body
function snakeCollided(head,bodyArray){
    for(let i = 0 ; i < bodyArray.length ; i++){
        if(head.x == bodyArray[i].x && head.y == bodyArray[i].y){
            return true;
        }
    }
    return false;
}

//draw everything to canvas

function draw(){
    
    gameContext.drawImage(groundImg,0,0);

    for(let i =0; i < snakeInGame.length; i++ ){
        gameContext.fillStyle = (i==0)? "green": "white";
        gameContext.fillRect(snakeInGame[i].x,snakeInGame[i].y,snakeBodyBox,snakeBodyBox);

        gameContext.strokeStyle = "red";
        gameContext.strokeRect(snakeInGame[i].x,snakeInGame[i].y,snakeBodyBox,snakeBodyBox);
        
    }
    gameContext.drawImage(snakeFoodImg,food.x,food.y);

    //old snake position
    let snakeCurrentX = snakeInGame[0].x;
    let snakeCurrentY = snakeInGame[0].y;

    //direct the snake

        if(userKey == "LEFT"){
            snakeCurrentX -= snakeBodyBox;
        }
        if(userKey == "UP"){
            snakeCurrentY -= snakeBodyBox;
        }
        if(userKey == "RIGHT"){
            snakeCurrentX += snakeBodyBox;
        }
        if(userKey == "DOWN"){
            snakeCurrentY += snakeBodyBox;
        }
   
    if(snakeCurrentX == food.x && snakeCurrentY == food.y){
        if(score > 3 && score < 10){
            score += 2;
        }else if(score >= 10 ){
            score += 3;
        }else{
            score++;
        }

        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random()*17+1) * snakeBodyBox,
            y: Math.floor(Math.random()*15+3) * snakeBodyBox
        }
        // no tail removal
    }else{
        //remove tail
        snakeInGame.pop();
    }

  

    // add new head

    let newHead = {
        x: snakeCurrentX,
        y: snakeCurrentY
    } 

     // game over
     if(snakeCurrentX < snakeBodyBox || snakeCurrentX > 17 * snakeBodyBox || snakeCurrentY < 3 * snakeBodyBox 
        || snakeCurrentY > 17 * snakeBodyBox || snakeCollided(newHead,snakeInGame)){
            console.log(snakeCollided(newHead,snakeInGame));
            clearInterval(gameActivated);
            dead.play();
    }
    // add new head to snake...unshifts add to first element
    snakeInGame.unshift(newHead);

    gameContext.fillColor = "white";
    gameContext.font = "45px Changa one";
    gameContext.fillText(score,2*snakeBodyBox,1.6*snakeBodyBox);

}

// call draw function every 100 ms

let gameActivated = setInterval(draw,200);
