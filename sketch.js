var bg, bgImg;
var r;
var p1,p2,p3,p4,p5,platform,platformGroup;
var plr,plrImg;
var iGround, iB, ibGroup;
var coin, coinImg, moneyBag, moneyBagImg;
var cG, mbG;
var score=0;
var cbS, cS, bgS;

function preload() {
  bgImg=loadImage("./assets/bg.png");
  p1=loadImage("./assets/platformVar1.png");
  p2=loadImage("./assets/platformVar2.png");
  p3=loadImage("./assets/platformVar3.png");
  p4=loadImage("./assets/platformVar4.png");
  p5=loadImage("./assets/platformVar5.png");

  coinImg=loadImage("./assets/coin.png");
  moneyBagImg=loadImage("./assets/moneybag.png");

  cbS=loadSound("./assets/cb.mp3");
  cS=loadSound("./assets/c.mp3");
  bgS=loadSound("./assets/bg.mp3");

  plrImg=loadAnimation(
  "./assets/runningFrames/r1.gif",
  "./assets/runningFrames/r2.gif",
  "./assets/runningFrames/r3.gif",
  "./assets/runningFrames/r4.gif",
  "./assets/runningFrames/r5.gif",
  "./assets/runningFrames/r6.gif",
  "./assets/runningFrames/r7.gif",
  "./assets/runningFrames/r8.gif",
  "./assets/runningFrames/r9.gif",
  "./assets/runningFrames/r10.gif",
  "./assets/runningFrames/r11.gif",
  "./assets/runningFrames/r12.gif");
}

function setup() {
  createCanvas( 1800,750);
  bg=createSprite(900,375);
  bg.addImage(bgImg);
  bg.scale=0.8;
  bg.velocityX=-5;
  
  cG=new Group();
  mbG=new Group();

  platformGroup=new Group();
  ibGroup=new Group();

  plr=createSprite(100,500,40,40);
  plr.addAnimation("running",plrImg);
  plr.scale=0.5;
  plr.setCollider("rectangle", 0, 0, 150, 500);

  plr.debug=true;

  iGround=createSprite(150,650,300,5);
  //iGround.visible=false;

  setTimeout(() => {
    iGround.remove();
  }, 12000);
}

function draw() {
  background(0);  
  if(!bgS.isPlaying()){
    bgS.play();
  }

  fill("#6d4c41");
  textSize(40);
  text(`You have collected ${score} coins!`, width/2, height/2);
  textAlign(CENTER, CENTER);
  fill("white");

  if(bg.x<400){
    bg.x=width/2;
  }
  
  if(keyDown("space") && plr.y>150){
    plr.velocityY=-10;
    console.log(plr.y);
  }
  plr.velocityY+=0.8;

  handleCoins()
  handleCoinBags();

  randomPlatforms();
  spawnCoins()

  if(plr.y>800){
    gameOver();
  }

  plr.collide(iGround);
  plr.collide(ibGroup);

  drawSprites();
}

function randomPlatforms(){
  if(frameCount%80===0){
    platform=createSprite(2000,500);
    platform.y=Math.round(random(400,650));
    platform.velocityX=-5;

    choice=Math.round(random(1,100));
    if(choice<25){
      moneyBagSpawn(platform.y-100);
    }

    k = Math.round(random(1,5));
    if(frameCount%80===0){
      
      iB=createSprite(platform.x,platform.y-50,100,2);
      iB.velocityX=-5;
      iB.debug=true;
      ibGroup.add(iB);
    }
    switch(k){
      case 1:
        platform.addImage(p1);
        break;
      case 2:
        platform.addImage(p2);
        break;
      case 3:
        platform.addImage(p3);
        break;
      case 4:
        platform.addImage(p4);
        break;
      case 5:
        platform.addImage(p5);
        break;

      default:break;
      
    }
    platform.scale=0.25;
    platform.lifetime=500;
    platformGroup.add(platform);
  }
}

function spawnCoins(){

  if(frameCount%100===0){
    coin=createSprite(2000,Math.round(random(10,500)));
    coin.addImage(coinImg);
    coin.velocityX=-5;
    coin.scale=0.1

    coin.lifetime=450;
    cG.add(coin);
  }

}

function moneyBagSpawn(y){
  moneyBag=createSprite(2000,y);
  moneyBag.addImage(moneyBagImg);
  moneyBag.velocityX=-5;
  moneyBag.scale=0.07

  moneyBag.lifetime=450;
  mbG.add(moneyBag);
}


function handleCoins() {
  plr.overlap(cG, function(collector, collected) {
    score += 1;
    collected.remove();
    cS.play();
  });
}

function handleCoinBags() {
  plr.overlap(mbG, function(collector, collected) {
    score += 50;
    collected.remove();
    cbS.play()
  });
}

function gameOver(){
  plr.destroy();
  swal(
    {
      html: true,
      title: `You Lost!!!`,
      text: 'You fell off the map or died to the enemies!!',
      imageUrl:
        "https://th.bing.com/th/id/R.3e58c0e950de0b26f805dff1ccd8a030?rik=fUrVRF8p1ov3Og&pid=ImgRaw&r=0",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}