/*
Pages:

page 0 = main menu
page 1 = play
page 2 = settings
page 3 = leaderboards
page 4 = quit
page 5 = customize ship
page 6 = difficulty

Wanted to add but run out of time:  
  Boss fight
  Hover over main menu lights it up as gray
  Use 1 video - Introduction, Boss fight, or ending scene
  Power ups - Faster shooting, Shield
  Difficulty - Changing user and enemy cooldown, speed, health, etc. 
  Volume slider
*/

let canvasWidth = 500;
let canvasHeight = 733;
//3:4 ratio - Same as Raiden

let bulletImg1;
let bulletImg2;
let shipImg1;
let shipImg2;
let enemiesImg;
let explostionImg;
//Global images

let explosionSound;
let enemyFlybySound;
let userSound;
let enemySound;
let hyperSpaceSound;
//Global Sounds

let user;
let topBorder;
let bottomBorder;
let enemy;
let spriteShowcase1;
let spriteShowcase2;
//Sprites

let userBullet;
let enemyBullet;
let enemies;
//Sprite Groups

let starsNum = 250;
let life = 3;
let shootCooldown = 1000; //1 Second (as per millis - miliseconds)
let enemyCooldown = 60; //1 Seconds (as per frame count - 60 fps)
//Changable variables

let angle = 0;
let page = 0;
let gamePause = false;
let randX = new Array;
let randY = new Array;
let randSize = new Array
let varY = 0;
let starWarsFont;
let hyperspace = false;
let temp = false;
let temp2 = true;
let waveStarted = true;
let lastAttackTime = 0;
let waveNum = 0;
let totalWaves = 4;
let enemiesHit = 0;
let missedShots = 0;
let score;
let loadStarted;
let difficulty = 'Easy';
let leaderboard;
let shipSelected;
let showcaseSprites = false;
let endGame = false;
//Needed global variables

function preload() {
  shipImg1 = loadImage('Images/milfal.png');
  shipImg2 = loadImage('Images/xwing.png');
  bulletImg1 = loadImage('Images/bulletup.png');
  bulletImg2 = loadImage('Images/bulletdown.png');
  enemiesImg = loadImage('Images/tiefighter1.png');
  explostionImg = loadImage('Images/explosion.png');
  //Preload all images

  starWarsFont = loadFont('Fonts/SF Distant Galaxy.ttf');
  //Preload font

  leaderboard = loadJSON('./leaderboard.json');
  //Preload json file

  soundFormats('mp3');
  userSound = loadSound('Sounds/blaster.mp3');
  enemySound = loadSound('Sounds/TIE fighter fire 1.mp3');
  enemyFlybySound = loadSound('Sounds/TIE fighter flyby 3.mp3');
  explosionSound = loadSound('Sounds/TIE fighter explode.mp3');
  hyperSpaceSound = loadSound('Sounds/hyperspace.mp3');
  //Preload sounds
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  //Create Canvas
  frameRate(60);

  imageMode(CENTER);
  shipImg1.resize(100, 100);
  shipImg2.resize(125, 75);
  enemiesImg.resize(50, 50);
  explostionImg.resize(50, 50);
  bulletImg1.resize(30, 80);
  bulletImg2.resize(30, 80);
  //Resize images

  topBorder = createSprite(width/2, -10, canvasWidth,2);
  bottomBorder = createSprite(width/2, height, canvasWidth,2);
  user = createSprite(width/2, height-75, 100, 100);
  user.setCollider('rectangle',0,0,60,60);
  //Add essential sprites

  userBullet = new Group();
  enemyBullet = new Group();
  enemies = new Group();
  //Add essential Groups

  textAlign(CENTER);
  textSize(30);
  textStyle(BOLD);
  textFont(starWarsFont);
  //Define default text style

  for(i=0;i<starsNum;i++) {
    randX[i] = random(5, width - 5);
    randY[i] = random(5, height);
    randSize[i] = random(1, 7);  
  }
  //Calculate random star x, y, size
}

function drawBackground() {
  strokeWeight(1);
  stroke(255);
  fill(255);
  background(0);
  for(i=0;i<starsNum;i++) {
    ellipse(randX[i], randY[i] + varY, randSize[i]);
    if(randY[i] + varY > height) {
      randY[i] = 0 - varY;
    }
  }
}

function drawText() {
  fill(0);
  textSize(30);
  stroke(250,220,50);
  strokeWeight(5);
  if(page === 0){
    fill(255,0,0);
    textSize(50);
    text("Raiden Wars", width/2 , height/3 -100);
    textSize(30)
    if(page === 0) {
      if(mouseX >= 200 && mouseX <= 305 && mouseY >=220 && mouseY <=250) {
        fill(255);
        text("Play", width/2 , height/3);
      } else {
        fill(0)
        text("Play", width/2 , height/3);
      } 
      if(mouseX >= 165 && mouseX <= 335 && mouseY >=295 && mouseY <=325) {
        fill(255);
        text("Settings", width/2, height/3 +75);
      } else {
        fill(0);
        text("Settings", width/2, height/3 +75);
      }
      if(mouseX >= 110 && mouseX <= 390 && mouseY >=370 && mouseY <=400) {
        fill(255);
        text("leaderboards", width/2, height/3 +150);
      } else {
        fill(0);
        text("leaderboards", width/2, height/3 +150);
      }
      if(mouseX >= 205 && mouseX <= 295 && mouseY >=445 && mouseY <=475) {
        fill(255);
        text("Quit", width/2, height/3 +225);
      } else {
        fill(0);
        text("Quit", width/2, height/3 +225);
      }
    }

  } else if(page === 2) {
    if(mouseX >= 150 && mouseX <= 340 && mouseY >=220 && mouseY <=250) {
      console.log("Page 2 Main Menu");
      fill(255);
      text("Main Menu", width/2 , height/3);
    } else {
      fill(0)
      text("Main Menu", width/2 , height/3);
    } 
    if(mouseX >= 115 && mouseX <= 390 && mouseY >=295 && mouseY <=325) {
      console.log("Page 2 Cusomise ship");
      fill(255);
      text("Customize Ship", width/2, height/3 +75);
    } else {
      fill(0);
      text("Customize Ship", width/2, height/3 +75);
    }
    if(mouseX >= 155 && mouseX <= 350 && mouseY >=370 && mouseY <=400) {
      console.log("Page 2 Difficulty");
      fill(255);
      text("Difficulty", width/2, height/3 +150);
    } else {
      fill(0);
      text("Difficulty", width/2, height/3 +150);
    }

  } else if(page === 3) {
    if(mouseX >= 150 && mouseX <= 340 && mouseY >=220 && mouseY <=250) {
      console.log("Page 3 Main Menu");
      fill(255);
      text("Main Menu", width/2 , height/3);
    } else {
      fill(0)
      text("Main Menu", width/2 , height/3);
    } 
    displayLeaderboard();
  } else if(page === 4) {
    console.log("Quit: " + page);
    noLoop();
    textSize(35);
    text("Thanks for playing!!", width/2, height/2);
  } else if(page === 5) {
    text("Settings", width/2 , height/3);
    image(shipImg1, width/2 - 100, height/2);
    image(shipImg2, width/2 + 100, height/2);
    if(shipSelected === 2) {
      noFill();
      stroke(0,255,0);
      rect(300, 320, 100, 100);
    } else {
      noFill();
      stroke(0,255,0);
      rect(100, 320, 100, 100);
    }
  } else if(page === 6) {
    if(mouseX >= 150 && mouseX <= 340 && mouseY >=220 && mouseY <=250) {
      console.log("Page 6 Settings");
      fill(255);
      text("Settings", width/2 , height/3);
    } else {
      fill(0)
      text("Settings", width/2 , height/3);
    } 
    if(mouseX >= 115 && mouseX <= 390 && mouseY >=295 && mouseY <=325) {
      console.log("Page 6 Easy");
      fill(255);
      text("Easy", width/2 , height/3 + 75);
    } else {
      fill(0,150,0);
      text("Easy", width/2, height/3 +75);
    }
    if(mouseX >= 155 && mouseX <= 350 && mouseY >=370 && mouseY <=400) {
      console.log("Page 6 Medium");
      fill(255);
      text("Medium", width/2 , height/3 + 150);
    } else {
      fill(125,125,0);
      text("Medium", width/2 , height/3 + 150);
    }
    if(mouseX >= 200 && mouseX <= 300 && mouseY >=450 && mouseY <=470) {
      console.log("Page 6 Hard");
      fill(255);
      text("Hard", width/2 , height/3 + 225);
    } else {
      fill(175,175,0);
      text("Hard", width/2 , height/3 + 225);
    }
    if(mouseX >= 150 && mouseX <= 350 && mouseY >=520 && mouseY <=545) {
      console.log("Page 6 Impossible");
      fill(255);
      text("Impossible", width/2 , height/3 + 300);
    } else {
      fill(255,0,0);
      text("Impossible", width/2 , height/3 + 300);
    }
  }
}

function drawGUI() {
  textSize(20);
  strokeWeight(2);
  text("Lives: " + life, 50, height - 10);
  text("Score: " + score, 70, 20);
  text("Hi-Score: " + score, width/2, 20);
  text(difficulty, width - 50, 20);
  // user.debug = true;
}

function hyperSpace() {
  fill(0);
  textSize(30);
  stroke(250,220,50);
  strokeWeight(5);
  loadStarted = millis();
  text(`Wave ${waveNum} Incoming!!`, width/2, height/2);
  setTimeout(() => {
    hyperspace = false;
  }, 3000)
}

function waveCompleted() {
  console.log("Wave Completed Function")
  fill(0);
  textSize(30);
  stroke(250,220,50);
  strokeWeight(5);
  text(`Wave ${waveNum} Completed`, width/2, height/2);
}

function loseLife() {
  console.log("Lost a life");
  life -= 1;
  if(life === 0) {
    endGame = true;
  }
}

function mouseClicked() {
  if(page === 0) {
    // Main Menu page
    if(mouseX >= 200 && mouseX <= 305 && mouseY >=220 && mouseY <=250) {
      console.log("Play")
      page = 1;
      hyperspace = true;
    } else if(mouseX >= 165 && mouseX <= 335 && mouseY >=295 && mouseY <=325) {
      console.log("Settings")
      page = 2;
    } else if(mouseX >= 110 && mouseX <= 390 && mouseY >=370 && mouseY <=400) {
      console.log("Leaderboards")
      page = 3;
    } else if(mouseX >= 205 && mouseX <= 295 && mouseY >=445 && mouseY <=475) {
      console.log("Quit")
      page = 4;
    }
  } else if(page === 1 && gamePause === false && millis() - lastAttackTime >= shootCooldown && hyperspace === false) {
    // Play page
    lastAttackTime = millis();
    let bullet = createSprite(user.position.x, user.position.y, 5, 10);
    bullet.addImage(bulletImg1);
    bullet.setCollider('rectangle', 0, 0, 2, 20)
    bullet.setSpeed(5, 270);
    userBullet.add(bullet)
    userSound.play();
    // bullet.debug = true;
  } else if(page === 2) {
    // Settings page
    if(mouseX >= 155 && mouseX <= 335 && mouseY >=220 && mouseY <=250) {
      console.log("Main Menu")
      page = 0;
    } else if(mouseX >= 115 && mouseX <= 390 && mouseY >=295 && mouseY <=325) {
      console.log("Customize Ship")
      page = 5;
    } else if(mouseX >= 150 && mouseX <= 350 && mouseY >=370 && mouseY <=400) {
      console.log("Difficulty")
      page = 6;
    }
  } else if (page === 3) {
    // Leaderboards page
    if(mouseX >= 155 && mouseX <= 335 && mouseY >=220 && mouseY <=250) {
      console.log("Main menu")
      page = 0;
    }
  } else if (page === 4) {
    // Quit page
  } else if (page === 5) {
    // Customize ship page
    if(mouseX >= 155 && mouseX <= 335 && mouseY >=220 && mouseY <=250) {
      console.log("Settings")
      page = 2;
    } else if(mouseX >= 100 && mouseX <= 200 && mouseY >= 320 && mouseY <=420) {
      console.log("Ship 1 selected");
      shipSelected = 1;
    } else if(mouseX >= 300 && mouseX <= 400 && mouseY >= 320 && mouseY <=420) {
      console.log("Ship 2 selected");
      shipSelected = 2;
    }
  } else if (page === 6) {
    // Difficulty page
    if(mouseX >= 155 && mouseX <= 335 && mouseY >=220 && mouseY <=250) {
      console.log("Settings")
      page = 2;
    }
  }
}

function keyPressed() {
  if(page === 1 && keyCode === ESCAPE) {
    if(gamePause === false) {
      gamePause = true;
      console.log("Pause");
    } else if(gamePause === true) {
      gamePause = false;
      console.log("Resume");
    }
  }
}

function startNextWave() {
  waveNum += 1;
  if(waveNum === 1) {
    hyperspace = true;
    for(i=1;i<3;i++) {
      enemy = createSprite(width/3 * i, -50, 50, 50);
      enemy.addImage(enemiesImg);
      enemy.setCollider('rectangle',0,0,50, 3);
      // enemy.debug = true;
      enemies.add(enemy);
    }

  } else if(waveNum === 2) {
    hyperspace = true;
    for(i=1;i<6;i++) {
      enemy = createSprite(50 * i + 30 * i, -50, 50, 50);
      enemy.addImage(enemiesImg);
      enemy.setCollider('rectangle',0,0,50, 3);
      // enemy.debug = true;
      enemies.add(enemy);
    }
  } else if(waveNum === 3) {
    hyperspace = true;
    enemyCooldown = enemyCooldown/2
    for(i=1;i<6;i++) {
      enemy = createSprite(50 * i + 30 * i, -50, 50, 50);
      enemy.addImage(enemiesImg);
      enemy.setCollider('rectangle',0,0,50, 3);
      // enemy.debug = true;
      enemies.add(enemy);
    }
    for(i=1;i<6;i++) {
      enemy = createSprite(50 * i + 30 * i, -100, 50, 50);
      enemy.addImage(enemiesImg);
      enemy.setCollider('rectangle',0,0,50, 3);
      // enemy.debug = true;
      enemies.add(enemy);
    }
  } else if(waveNum === 4) {
    hyperspace = true;
  }
}

function displayLeaderboard() {
  fill(0);
    textAlign(LEFT);
    text("1   " + leaderboard.p1.name + "   " + leaderboard.p1.score, width/5, height/2)
    text("2   " + leaderboard.p2.name + "   " + leaderboard.p2.score, width/5, height/2+50)
    text("3   " + leaderboard.p3.name + "   " + leaderboard.p3.score, width/5, height/2+100)
}


function draw() {
  drawBackground();
  angle += 0.02;
  varY += 1;

  // text(mouseX + ", " + mouseY, 100, 50)
  drawText();
  //Background

  // Speeding up background + text for next wave //
  if(hyperspace === true) {
    varY += 10;
    hyperSpace();
  }

  
  if(page === 0) {
    //Adding selected image to user - Default is shipImg1 //
    if(shipSelected === 2) {
      user.addImage(shipImg2);
    } else {
      user.addImage(shipImg1);
    }
  } else if(page === 1){
    score = (enemiesHit * 100 - missedShots * 10) * life;
    // Initial Game Start //
    if(temp === false) {
      startNextWave();
      hyperSpaceSound.play();
      setTimeout(() => {
        enemyFlybySound.play();
      }, 1500)
      temp = true;
    } 

    // Death //
    if(endGame === true) {
      textSize(35);
      gamePause = true;
      text("You died!!\nReturning to \nMain menu...", width/2, height/2);
      setTimeout(() => {
        page = 0;
        life = 3;
        score = 0;
        waveNum = 0;
        for(i=0;i<enemies.length;i++) {
          enemies[i].remove();
        }
        endGame = false;
      }, 2500)
    }
    drawSprites();
    drawGUI();

    // Animation into canvas //
    if(waveNum === 1) { 
      for(i=0;i<enemies.length;i++) {
        enemies[i].position.y = lerp(enemies[i].position.y, 60, 0.02);
      }
    } else if(waveNum === 2) {
      for(i=0;i<enemies.length;i++) {
        enemies[i].position.y = lerp(enemies[i].position.y, 60, 0.02);
      }
      if(millis() - loadStarted >= 350) {
        for(i=0;i<enemies.length;i++) {
          enemies[i].position.x = enemies[i].position.x + cos(angle);
          // enemies[i].position.y = enemies[i].position.y + sin(angle);
        }
      }
    } else if(waveNum === 3) {
      let row = 0;
      for(i=0;i<enemies.length;i++) {
        if(i > 4) {
          row = 50;
        } else {
          row = 0;
        }
        enemies[i].position.y = lerp(enemies[i].position.y, 60 + row, 0.02);
      }
      if(millis() - loadStarted >= 350) {
        for(i=0;i<enemies.length;i++) {
          enemies[i].position.x = enemies[i].position.x + cos(angle);
          // enemies[i].position.y = enemies[i].position.y + sin(angle);
        }
      }
    }

    // GAME LOGIC //

    // Enemies shooting
    if(enemies.length != 0 && millis() - loadStarted >= 350 && gamePause === false) {
      let enemyShoot = Math.round(random(0, enemies.length - 1));
      if(frameCount % enemyCooldown === 0) {
        let Ebullet = createSprite(enemies[enemyShoot].position.x, enemies[enemyShoot].position.y, 5, 10);
        Ebullet.addImage(bulletImg2);
        Ebullet.setSpeed(5, 90);
        enemyBullet.add(Ebullet)
        enemySound.play();
        // Ebullet.debug = true;
      }
    }
    
    // Pause game
    if(gamePause === true && endGame == false) {
      text("Paused!!\nPress 'ESC' to resume!!", width/2, height/2);
      for(i=0;i<userBullet.length;i++) {
        userBullet[i].setSpeed(0, 270); 
      }
      for(i=0;i<enemyBullet.length;i++) {
        enemyBullet[i].setSpeed(0, 270); 
      }
     } else {
        for(i=0;i<userBullet.length;i++) {
          userBullet[i].setSpeed(5, 270); 
      }
        for(i=0;i<enemyBullet.length;i++) {
          enemyBullet[i].setSpeed(5, 90); 
        }
    }
    
    // Controls
    if(keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      if(gamePause === false && user.position.x >= 35 && hyperspace === false){
        user.position.x -= 5;
      } 
    } else if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        if(gamePause === false && user.position.x <= width - 35 && hyperspace === false){
          user.position.x += 5;
        }
    } 

    // Remove user bullets if touches top border
    for(i=0;i<userBullet.length;i++) {
      if(userBullet[i].overlap(topBorder)) {
        userBullet[i].remove();
        missedShots += 1;
      } 
    }

    // Remove enemies bullet if touches bottom border & hit player logic
    for(i=0;i<enemyBullet.length;i++) {
      if(enemyBullet[i].overlap(bottomBorder)) {
        enemyBullet[i].remove();
      } else if(enemyBullet[i].overlap(user)) {
        loseLife();
        enemyBullet[i].remove();
        explosion = createSprite(user.position.x, user.position.y, 50, 50)
        explosion.addImage(explostionImg)
        explosionSound.play();
        setTimeout(() => {
          explosion.remove();
        }, 250)
      }
    }

    // User hit enemy logic
    for(i=0;i<enemies.length;i++) {
      for(j=0;j<userBullet.length;j++) {
        if(userBullet[j].overlap(enemies[i])) {
          explosion = createSprite(enemies[i].position.x, enemies[i].position.y, 50, 50)
          enemies[i].remove();
          enemiesHit += 1;
          explosion.addImage(explostionImg)
          explosionSound.play();
          userBullet[j].remove();
          console.log("Enemy removed");
          setTimeout(() => {
            explosion.remove();
          }, 250)
        }
      }
    }

    // Wave finished logic
    if(enemies.length === 0 && waveNum < totalWaves && endGame === false) {
      console.log(waveNum);
      console.log(totalWaves);
      waveCompleted();
      if(temp2 === true) {
        temp2 = false;
        setTimeout(() => {
          startNextWave();
          hyperSpaceSound.play();
          setTimeout(() => {
            enemyFlybySound.play();
          }, 1500)
          temp2 = true;
        }, 2000);
      }
    }
 
    // Game ended logic
    if(waveNum === totalWaves) {
      text("Congrats, \nyou've survived \nthe EMPIRE!!", width/2, height/2);
      if(temp2 === true) {
        temp2 = false;
        setTimeout(() => {
          page = 3;
          temp2 = true;
        }, 2000);
      }
    }
    // END GAME LOGIC //

    // Other game pages noted at top //
  } 
}