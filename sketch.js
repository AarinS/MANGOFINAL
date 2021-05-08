
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;
var treeObj, stoneObj,groundObject, launcherObj;
var mango1,mango2,mango3,mango4,mango5
var boy, boyImage
var stone;

function preload(){
	boy=loadImage("images/boy.png");
    
}

function setup() {
	createCanvas(1300, 600);
	engine = Engine.create();
	world = engine.world;

	mango1 = new mango(1100,100,30);
    mango2 = new mango(1000,100,30)
	mango3 = new mango(1050,150,35);
	mango4 = new mango(1150,120,30);
	mango5 = new mango(920,220,60);
	
	
	treeObj=new tree(1050,580);
	groundObject= new ground(width/2,600,width,20);
    stoneObj = new Stone(235,420,30);
	launcherObj = new Launcher(stoneObj.body,{x:200, y:340});
	

	Engine.run(engine);

}

function draw() {

  background(230);
  //Add code for displaying text here!
  image(boy ,200,340,200,300);
 
  detectCollision(stoneObj,mango1);
  detectCollision(stoneObj,mango2);
  detectCollision(stoneObj,mango3);
  detectCollision(stoneObj,mango4);
  detectCollision(stoneObj,mango5);

  launcherObj.display();
  stoneObj.display();
  treeObj.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();

  groundObject.display();
}

function keyPressed() {
	if (keyCode === 32) {
		Matter.Body.setPosition(stoneObj.body, {x:235, y:420})
		launcherObj.attach(stoneObj.body)
	}
}
function detectCollision(lstone,lmango) {
	mangoBodyPosition = lmango.body.position
	stoneBodyPosition = lstone.body.position


	var distance=dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x,mangoBodyPosition.y)
	  if(distance<= lmango.r+lstone.r)
	  {
	    Matter.Body.setStatic(lmango.body,false);
  }
}
function mouseDragged(){
	Matter.Body.setPosition(stoneObj.body, {x: mouseX , y: mouseY});
}

function mouseReleased(){
    launcherObj.fly();
}