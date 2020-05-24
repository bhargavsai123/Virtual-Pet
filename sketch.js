var dog, voice,foodbtn;
var time,sc;
var hungry = "I'm Hungry";
var happy = " I'm Happy!";
var goGetFood = "You'r Out of Food, Go to the Store to Purchase Food"
var database,dataTime,clickTime;
var food= 10;
var foodSprite, fI;
var sec,total;
function preload(){

  bgI = loadImage("park.jpg");

  dogI = loadImage("image_processing20190924-19941-gk2yzl.gif");
  
  fI = loadImage("Capture.PNG");
}
function setup() {
  createCanvas(displayWidth,displayHeight);

  database = firebase.database();

  dataTime = database.ref('time');
  
  foodSprite = createSprite(displayWidth-150,displayHeight/8 - 90);
  foodSprite.scale = 0.1;
  foodSprite.addImage(fI,"Capture.PNG");


  dog = createSprite(displayWidth/2,displayHeight/2);
  
  voice = createElement('h2',hungry);
  voice.position(dog.x + 30, dog.y - 170);

  foodbtn = createButton('Feed');
  foodbtn.style('background-color',"brown");
  foodbtn.style('font-size','50 px');
  foodbtn.size(50,27);
  foodbtn.position(voice.x + 126, voice.y + 20);


  t = new Time();

}
function draw() {
  background(251);

   time = second();

   t.Time(time);

   fill(0);
    textSize(40);
   text("X"+ food,displayWidth-110,displayHeight/8 - 75)

  //    fcount = createElement('h3',"X"+food);
  // fcount.position(foodSprite.x+50, foodSprite.y - 30);

  dog.addImage(dogI,"image_processing20190924-19941-gk2yzl.gif");

    //console.log(time);

  foodbtn.mousePressed(function(){
    console.log("happy");
    foodbtn.hide();
    voice.html(happy);
    sc = time;
    food--;
    t.Clicked(sc,food);
  });

// console.log(sc);
// console.log(time);
// console.log(food);

  if(sec === total+1){

    console.log("1 min"); 
    voice.html(hungry);
    foodbtn.show();
    if(food <= 0){

      voice.html(goGetFood);
      foodbtn.hide();
    }
  }
  console.log(total);
  console.log(sec);
  drawSprites();
}
class Time{

  constructor(){

  }

  Clicked(sc,food){
     clickTime = "ClickTime";
    database.ref(clickTime).set({
          sc : sc,
          food: food
    })
     database.ref('ClickTime/sc').on('value',function(data){
        sec = data.val();
    })
}
Time(time){
    database.ref('/').update({
        time: time
    })
    database.ref('time').on('value',function(data){
      total = data.val();
  })
}


}