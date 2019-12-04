var gameState = "start";


var random_cap_color, balloon_color;
var balloon_yellow, balloon_blue, balloon_red;
var shape;
var score = 0;

function preload() {
    bluecapImg = loadAnimation("Doraemon_blue.png");
    yellowcapImg = loadAnimation("Doraemon_yellow.png");
    redcapImg = loadAnimation("Doraemon_red.png");
    balloon_blueImg = loadAnimation("blue.png");
    balloon_redImg = loadAnimation("red.png");
    balloon_yellowImg = loadAnimation("yello.png");

}

function setup() {
    createCanvas(600, 600);

    var shape = createSprite(200, 200);
    shape.addAnimation("redcapImg", redcapImg);

    blueBalloon = createSprite(Math.round(random(20, 580)));
    blueBalloon.addImage("blueBalloon", balloon_blueImg);

    redBalloon = createSprite(Math.round(random(20, 580)));
    redBalloon.addImage("redBalloon", balloon_redImg);

    yellowBalloon = createSprite(Math.round(random(20, 580)));
    yellowBalloon.addImage("yellowBalloon", balloon_yellowImg);


}

function draw() {
    background(rgb(197, 247, 223));
    if (gameState === "start") {
        var shape_cap_color = ["yellow", "red", "blue"];
        var index = Math.round(random(0, shape_cap_color.length - 1));
        random_cap_color = shape_cap_color[index];
        gameState = "play";
    }

    if (gameState === "play") {
        if (mouseDidMove()) {
            shape.x = World.mouseX;
            shape.y = World.mouseY;
        }

        if (shape.isTouching(redBalloon)) {
            balloon_color = "red";
            //   playSound();
            redBalloon.destroy();
            redBalloon = createSprite(Math.round(random(20, 580), Math.round(random(-400, 0))));
            redBalloon.setAnimation("red_balloon");
            redBalloon.width = 40;
            redBalloon.height = 100;
            redBalloon.velocityY = randomNumber(1, 3);

        } else if (shape.isTouching(yellowBalloon)) {
            balloon_color = "yellow";
            //    playSound("sound://category_hits/retro_game_simple_impact_2.mp3", false);
            yellowBalloon.destroy();
            yellowBalloon = createSprite(Math.round(random(20, 580), Math.round(random(-400, 0))));;
            yellowBalloon.setAnimation("yellow_balloon");
            yellowBalloon.width = 40;
            yellowBalloon.height = 100;
            yellowBalloon.velocityY = randomNumber(1, 3);
        } else if (shape.isTouching(blueBalloon)) {
            balloon_color = "blue";
            playSound("sound://category_hits/retro_game_simple_impact_2.mp3", false);
            blueBalloon.destroy();
            blueBalloon = createSprite(Math.round(random(20, 580), Math.round(random(-400, 0))));;
            blueBalloon.setAnimation("blue_balloon");
            blueBalloon.width = 40;
            blueBalloon.height = 100;
            blueBalloon.velocityY = randomNumber(1, 3);
        }
        if (redBalloon.y > 400) {
            redBalloon.x = randomNumber(20, 390);
            redBalloon.y = 0;
        } else if (yellowBalloon.y > 400) {
            yellowBalloon.x = randomNumber(20, 390);
            yellowBalloon.y = 0;
        } else if (blueBalloon.y > 400) {
            blueBalloon.x = randomNumber(20, 390);
            blueBalloon.y = 0;
        }

        shape.setAnimation("Doraemon_" + random_cap_color);

        if (balloon_color === random_cap_color) {
            gameState = "start";
            score++;
            balloon_color = "";

        }
        if (balloon_color !== random_cap_color && balloon_color !== "") {
            score = 0;
        }
        if (score === 5) {
            gameState = "end";
        }
        textSize(20);
        text("Score = " + score, 0, 15);
    }

    if (gameState === "end") {
        textSize(50);
        text("You Won", 100, 190);
    }
    textSize(15);
    text("Pop the balloons that match the color of Dorarmon's hat", 10, 380);
    drawSprites();
}