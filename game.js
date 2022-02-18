var score = 0;
var cross = true;

 
var gamestarter = document.querySelector(".game-starter");
var mycloud = document.querySelector(".cloud");
var cityInner = document.querySelector(".city-inner");
var cityouter=document.querySelector(".city-outer");
var cat = document.querySelector(".cat");
let car = document.querySelector(".car");
var myaudio = document.querySelector("#my-audio");
var gameaudio = document.querySelector(".game-audio");
var cataudio = document.querySelector(".cat-audio");
var points=document.querySelector(".points");

var second = document.querySelector("#counter").textContent;

var countdown = setInterval(function () {
  second--;
  document.querySelector("#counter").textContent = second;
  if (second <= 0) {
    clearInterval(countdown);
    cat.style.visibility = "visible";
    car.style.visibility = "visible";
    gamestarter.style.visibility = "hidden";

    mycloud.classList.add("cloudanimation");
    cityInner.classList.add("roadAnimation");
    cat.classList.add("animationcat");
   

  var toggolTime=setInterval(function(){
    cityouter.classList.toggle("daytoNight");
    cityouter.classList.toggle("rainAnimation");
  },10000);



function changedImg(){

  var photos=["images/dog.gif","images/cat2.gif","images/horin.gif",];

const count=Math.floor(Math.random()*photos.length);
console.log("Hey i am here"+count);
cat.src=photos[count];

}
var music=false;
document.addEventListener("keypress",keycontrol1);
function keycontrol1(e)
{
  if(e.keyCode==109)
  {
    if(music)
    {
      gameaudio.pause();
      music=false;
    }
    else{
      gameaudio.play();
      music=true;
    }

  }

}

    document.addEventListener("keydown", keycontrol);

    function keycontrol(e) {
      console.log("your keycode is = " + e.keyCode);

    


      if (e.keyCode == 38) {
        myaudio.play();

        car.classList.add("animationCar");

        setTimeout(function () {
          car.classList.remove("animationCar");
        }, 900);
      }
      if (e.keyCode == 39) {
        let car = document.querySelector(".car");
        let carxx = parseInt(
          window.getComputedStyle(car, null).getPropertyValue("left")
        );
        car.style.left = carxx + 112 + "px";
      }
      if (e.keyCode == 37) {
        let car = document.querySelector(".car");
        let carxx = parseInt(
          window.getComputedStyle(car, null).getPropertyValue("left")
        );
        console.log(carxx);
        car.style.left = carxx - 112 + "px";
      }
    }
    /*Collission detection part*/
    setInterval(() => {
      var car = document.querySelector(".car");

      var gameOver = document.querySelector(".game-over ");
      var body = document.querySelector("body");


    


      let carX = parseInt(
        window.getComputedStyle(car, null).getPropertyValue("left")
      );
      let carY = parseInt(
        window.getComputedStyle(car, null).getPropertyValue("top")
      );

      let catX = parseInt(
        window.getComputedStyle(cat, null).getPropertyValue("left")
      );
      let catY = parseInt(
        window.getComputedStyle(cat, null).getPropertyValue("top")
      );

      let offsetX = Math.abs(carX - catX);
      let offsetY = Math.abs(carY - catY);
      console.log(offsetX, offsetY);
      //cataudio.play();

      if (offsetX < 112 && offsetY < 52) {
        gameOver.style.visibility = "visible";
        cat.classList.remove("animationcat");
      
      
        mycloud.classList.remove("cloudanimation");
        // body.classList.add("opacity");
        car.style.visibility = "hidden";
        cat.style.visibility = "hidden";
        cityInner.classList.remove("roadAnimation");
        cat.classList.remove("animationcat");
        cityouter.classList.remove("rainAnimation");
        clearInterval(toggolTime);

          points.innerHTML="Points : "+score;
          


      }
      
      else if (offsetX < 145 && cross) {
        setInterval(changedImg(),7000);
        score++;
        update(score);
        cross = false;
        setTimeout(function () {
          cross = true;
        }, 100);
      }
    }, 10);
  }
}, 1000);

/*for score -----------------*/
function update(score) {
  document.querySelector("#score h1").innerHTML = "Your Score : " + score;
}
