var gamestate;
var START = 2;
var PLAY = 1;
var END = 0;
var ninja, ninjaImg, ninja_jump, ninja_fall;
var bg, bg_move;
var inv, inv_ground;
var police, policeImg, police_end;
var spikeGroup,spike1,spike2,spike3,spike4,spike5;
var life, lifeImg;
var life2;
var serve, serveImg;
var inv_stone;
var score;
var hits;
var highScore;
var gameOver, over;
var restart, restartImg;
var stoneImg, stoneGroup;
var coinImg, coinGroup, coinEnd;
var bulletImg, bulletGroup;

function preload()
{
  ninjaImg = loadAnimation ("Ninja running 1.png","Ninja running 2.png","Ninja running 3.png","Ninja running 4.png","Ninja running 5.png","Ninja running 6.png")
  
  ninja_jump = loadAnimation ("Ninja jumping 1.png","Ninja jumping 2.png","Ninja jumping 3.png","Ninja jumping 4.png","Ninja jumping 5.png","Ninja jumping 6.png","Ninja jumping 7.png");
  
  ninja_fall = loadAnimation ("ninja_fall3.png","ninja_fall3.png","ninja_fall3.png","ninja_fall3.png")
  
  policeImg = loadAnimation ("police1.png","police2.png","police3.png","police4.png","police5.png","police6.png","police7.png","police8.png","police9.png","police10.png","police11.png")
  
  police_end = loadAnimation ("police2.png")
  
  stoneImg = loadImage("stone.png");
  
  over = loadImage("Game Over.png");
  restartImg = loadImage("restart.png");
  
  coinImg = loadAnimation ("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png","coin7.png","coin8.png","coin9.png")
  
  coinEnd = loadAnimation ("coin1.png");
  
  spike1 = loadImage("obstacles1.png");
  spike2 = loadImage("obstacle2.png");
  spike3 = loadImage("obstacle3.png");
  spike4 = loadImage("obstacle4.png");
  spike5 = loadImage("obstacle5.png");
  
  lifeImg = loadImage("pixel heart.png");
  
  bulletImg = loadImage("bullet.png");
  
  bg_move = loadImage ("Dungeon.png"); 
  serveImg = loadImage("outside dungeon.png");
}

function setup()
{
  createCanvas(700,500);
  
  ninja = createSprite(450,300);
  ninja.addAnimation("run",ninjaImg);
  ninja.addAnimation("fall",ninja_fall);
  ninja.addAnimation("jump",ninja_jump);
  ninja.scale = 1.45;

  camera.position.y = ninja.y - 50;
  camera.position.x = 350;
  
  police = createSprite(100,280,30,140);
  police.addAnimation("running",policeImg);
  police.addAnimation("end",police_end);
  police.scale = 1.2;
  
  bg = createSprite(550,230,10,10)
  bg.addAnimation("background",bg_move);
  bg.scale = 1.21;
  bg.depth = 0;
  
  inv = createSprite(60,450,1100,10);
  inv.visible = false;
  
  life = createSprite(620,70,10,10);
  life.addImage(lifeImg);
  life.scale = 0.5;
  
  life2 = createSprite(660,70,10,10);
  life2.addImage(lifeImg);
  life2.scale = 0.5;
  
  inv_stone = createSprite(700,430,20,40);
  inv_stone.visible = false;
  
  inv_bullet = createSprite(170,340,40,10);
  inv_bullet.visible = false;
  
  gameOver = createSprite(350,170,10,10);
  gameOver.addImage(over);
  gameOver.scale = 0.6;
  gameOver.visible = false;
  
  restart = createSprite(350,235);
  restart.addImage(restartImg);
  restart.scale = 0.3;
  restart.visible = false;
  
  score = 0;
  hits = 0;
  highScore = 0;
  gamestate = START;
  
  stoneGroup = new Group();
  coinGroup = new Group();
  bulletGroup = new Group();
  spikeGroup = new Group();
  
  serve = createSprite(400,200,1000,1000);
  serve.addImage(serveImg);
  serve.scale = 1;
  serve.visible = false;
}

function draw()
{
  background("white");
  
  if(gamestate == START)
  {
    stoneGroup.setVelocityXEach(0);
    stoneGroup.destroyEach();
    bulletGroup.setVelocityXEach(0);
    bulletGroup.destroyEach();
    coinGroup.setVelocityXEach(0);
    coinGroup.destroyEach();
    spikeGroup.setVelocityXEach(0);
    spikeGroup.destroyEach();
    bg.velocityX = 0;
    
    inv_stone.velocityX = 0;
    inv_stone.x = 700;
    inv_stone.y = 430;
    
    inv_bullet.velocityX = 0;
    inv_bullet.x = 170;
    inv_bullet.y = 340;
    
    life.visible = true;
    life2.visible = true;
    
    score = 0;
    hits = 0;
    
    serve.visible = true;
    gameOver.visible = false;
    restart.visible = false;
  }
  
  if(touches.length > 0 || keyDown("space")&&gamestate == START)
  {
    gamestate = PLAY;
    touches = [];
  }
  
  if(gamestate == PLAY)
  {
    ninja.changeAnimation("run",ninjaImg);
    police.changeAnimation("running",policeImg);
    police.x = 100;
    ninja.x = 450;
    
    if(touches.length > 0 || keyDown("up") && ninja.y >= 370) 
    {
      ninja.velocityY = -15;
      touches = [];
    } 

    //to make the police jump on its own
    if(police.isTouching(stoneGroup)) 
    {
      police.velocityY = -15;
    } 

    //gravity
    ninja.velocityY = ninja.velocityY + 0.8;
    police.velocityY = police.velocityY + 0.8;

    bg.velocityX = -(6+3*score/2);

    if (bg.x < 10)
    {
      bg.x = bg.width/2;
    }
    
    if(inv_stone.isTouching(stoneGroup))
    {
    inv_stone.velocityX = -6;
    }
    
    if(inv_bullet.isTouching(bulletGroup))
    {
      inv_bullet.velocityX = 7.7;
    }
    
    serve.visible = false;
    gameOver.visible = false;
    restart.visible = false;

    if(ninja.isTouching(coinGroup))
    {
      score++;
      coinGroup.destroyEach();
    }

    if(ninja.isTouching(stoneGroup))
    {
      life.visible = false;
      hits++;
      stoneGroup.setLifetimeEach(0);
    }

    if(ninja.isTouching(bulletGroup))
    {
      life.visible = false;
      hits++;
      bulletGroup.setLifetimeEach(0);
    }
    
    if(ninja.isTouching(spikeGroup))
    {
      hits++;
      spikeGroup.setLifetimeEach(0);
    }
    
    if(hits==1)
    {
      life.visible = false;
    }

    if(hits == 2)
    {
      life2.visible = false;
    }      
    
    if(hits >= 3)
    {
      gamestate = END;
    }
    
    if(score > highScore)
    {
      highScore = score;
    }

    obstacles();
    coins();
    bullets();
    spikes();
  }
  
  if(gamestate == END)
  {
    ninja.changeAnimation("fall",ninja_fall);
    ninja.y = 430;
    police.changeAnimation("end",police_end);
    police.x = ninja.x - 35;
    police.y = 420;
    gameOver.visible = true;
    restart.visible = true;
    
    stoneGroup.setVelocityXEach(0);
    stoneGroup.setLifetimeEach(-1);
    bulletGroup.setVelocityXEach(0);
    bulletGroup.destroyEach();
    coinGroup.setVelocityXEach(0);
    coinGroup.setLifetimeEach(-1);
    coinGroup.destroyEach();
    spikeGroup.setVelocityXEach(0);
    spikeGroup.setLifetimeEach(-1);
    
    police.velocityY = 0;
    ninja.velocityY = 0;
    bg.velocityX = 0; 
    
    if(mousePressedOver(restart)) 
    {
      gamestate = START;
    }
  }
  
  ninja.collide(inv);
  police.collide(inv);
  
  ninja.depth = bg.depth;
  ninja.depth = ninja.depth + 1;
  
  drawSprites();
  
  textSize(20);
  textFont("bembo");
  fill("white");
  text("Coins = "+score,300,70);
  
  text("High Score = "+highScore,280,100)
  
  if(gamestate == PLAY)
  {
    //to tell the player of when to jump
    if(inv_stone.x < 600 && inv_stone.x > 450)
    {
      textSize(23)
      fill("white");
      text("Jump!",460,400);
    }
    
    if(inv_bullet.x>350 && inv_bullet.x<470)
    {
      textSize(23)
      fill("white");
      text("Jump!",460,400);
    }
    
    if(score>5&&score<7)
    {
      textSize(20);
      textFont("bembo");
      fill("white");
      text("Good! Keep Going!",260,200)
    }
  }
  
  if(gamestate == START)
  {
    textSize(30);
    textFont("bembo");
    fill("white");
    textAlign(LEFT);
    text("Press Space To Start ",225,200);
    textSize(15);
    text("To Make The Ninja Jump,",265,225);
    text("Press The Up Arrow",285,243);
    text("Note: Try To Avoid The Obstacles, and Collect As Many Coins As Possible",125,330);
    textSize(25);
    text("Good Luck Ninja!",265,430);
  }
  
  if(gamestate == END)
  {
    textSize(20);
    textFont("bembo");
    fill("white"); 
    text("Press To Restart",290,210);
  }
}

function obstacles()
{
  if(frameCount%150==0)
  {
     var stone = createSprite(700,410,30,30);
     stone.addImage(stoneImg);
     stone.scale = 0.2;
     stone.velocityX = -(6+1*score/2);
     stone.lifetime = 140;
     
     stone.setCollider("circle",0,0,70);
     stoneGroup.add(stone);
  }
}

function coins()
{
  if (frameCount % 220 === 0)
  {
    var coin = createSprite(700,120,40,10);
    coin.y = Math.round(random(220,300));
    coin.addAnimation("move",coinImg);
    coin.addAnimation("still".coin_still);
    coin.scale = 1.5;
    coin.velocityX = -(6+1*score/2);
    coin.lifetime = 140;
    
    coin.setCollider("circle",0,0,1);
  
    coinGroup.add(coin);
  }
}

function bullets()
{
  if(frameCount%350==0)
  {
     var bullet = createSprite(170,10,30,30);
     bullet.y = police.y - 40;
     bullet.addImage(bulletImg);
     bullet.scale = 0.5;
     bullet.velocityX = (7+1*score/2);
     bullet.lifetime = 140;
    
     bullet.setCollider("circle",10,10,1);
    
     bulletGroup.add(bullet);
  }
}

function spikes() 
{
  if(hits == 2) 
  {
    if(frameCount%60==0)
    {
      var spike = createSprite(700,10,10,10);
      spike.velocityX = -(12+1*score/2);

      spike.y = Math.round(random(200,350));

      var s = Math.round(random(1,5));
      switch(s) 
      {
        case 1: spike.addImage(spike1);
                break;
        case 2: spike.addImage(spike2);
                break;
        case 3: spike.addImage(spike3);
                break;
        case 4: spike.addImage(spike4);
                break;
        case 5: spike.addImage(spike5);
                break;
        default: break;
      }

      spike.scale = 0.5;
      spike.lifetime = 150;
      spikeGroup.add(spike);
     
      spike.setCollider("circle",0,0,1);
    }
  }
}



