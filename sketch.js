// var name ="Ayaan"
// console.log(name);

// var num=86;
// console.log(num);

// var bool=true;
// console.log(bool);

// var object
// console.log(object);

// object=null;
// console.log(object);

// var arr1=[1,2,45,6,7]
// console.log(arr1.length);

// var arr2=[[1,2,3],[4,56,7],[5,8,12]]
// console.log(arr2[2][2])

// arr2.push("element");
// console.log(arr2)
// arr2.pop();
// console.log(arr2)
/*
position1=[x1,y1]
position2=[x2,y2]

trajectory=[position1,position2,position3,....]
=[[x1,y1],[x2,y2],....]*/



const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint=Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var score=0;

function preload() {
    // backgroundImg = loadImage("sprites/bg.png");
    getBG()

}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
    

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 310, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
   clog = new Log(100,80,80, PI/2);
    
    slingshot=new Slingshot(bird.body,{x:200,y:50})
 //   slingshot1=new Slingshot(pig1.body,pig3.body)
}

function draw(){
  if(backgroundImg)
      background(backgroundImg);
      else 
      background(255)
        
      push();
      noStroke();
      textSize(25);
      fill(255);
      text("score: "+score,width-300,50)
      pop();
    Engine.update(engine);
    
    // console.log(box2.body.position.x);
    // console.log(box2.body.position.y);
    // console.log(box2.body.angle);
    
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();
    //clog.display();
    //slingshot1.display();
    bird.display();
    slingshot.display();
    platform.display();
    //getTime();
   


  }

function mouseDragged(){
  Matter.Body.setPosition(bird.body,{x:mouseX,y:mouseY})

}

function mouseReleased(){
    slingshot.fly()
  }
function keyPressed(){
  if(keyCode===32&&(bird.body.speed<1||bird.body.position.x>width)){
  Matter.Body.setPosition(bird.body,{x:200,y:50})
  bird.trajectory=[]
  slingshot.attach(bird.body);
}
  }

 async function getBG(){
  // backgroundImg=loadImage("sprites/bg.png")
    var response =await fetch("https://worldtimeapi.org/api/timezone/Australia/Darwin")
    var responseJson=await response.json();

    console.log(responseJson.datetime.slice(11,13));
    var hour= responseJson.datetime.slice(11,13)
    if(hour<=06&&hour<18){
    backgroundImg=loadImage("sprites/bg.png")
    }else{
      backgroundImg=loadImage("sprites/bg2.jpg")
    }
}