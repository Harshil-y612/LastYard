`use strict;`;
const grid = document.getElementById("grid"); //Intiaistaion of grid to get From Html
const doodler = document.createElement("div"); //Create div doodle in html
const startButton = document.getElementById("startButton"); //get StratButton from html
let gameOverFlag = false; //GameOver flag intialise @false in start
let startPoint = 20; //startPoint of doodler
let doodleBottom = startPoint; //doodlerBottom style property value
let doodlerLeft = 20; //doodlerLeft div's side value
let score = 0; //score intialise to zero
let groudCount = 5; //Number of Grounds on screen
let plateFormArray = []; //Array to store every div for future use
let isJumping,
  isFalling,
  isleft,
  isRight = false; //flags for doodle movement
let jumpInterval, fallInterval, leftInterval, rightInterval; //Flags to start and stopInterval call

const gameOver = () => {
  /*Function is Called when doodle touch the grid Ground
    GameOverFlag is changed to true 
    and clear all doodler moving Function's Interval*/

  gameOverFlag = true;
  clearInterval(jumpInterval);
  clearInterval(fallInterval);
  clearInterval(leftInterval);
  clearInterval(rightInterval);
  startButton.enabled = true;
};

const makeGrid = () => {
  /*Function to style the Grid Called From StratFunction*/

  grid.style.height = `${600}px`;
  grid.style.width = `${600}px`;
  grid.style.backgroundColor = `skyblue`;
  grid.style.position = `relative`;
};

const makeDoodle = () => {
  /*Function to style the doodle and append It to the Grid*/

  grid.appendChild(doodler);
  doodler.setAttribute("class", "doodler");
  doodler.style.backgroundColor = `gold`;
  doodler.style.bottom = `${startPoint}px`;
  doodler.style.left = plateFormArray[0].style.left;
  doodler.style.position = `absolute`;
  doodler.style.height = `${60}px`;
  doodler.style.width = `${60}px`;
};

const makeGround = (newGroungbottom, groudLeft) => {
  /*Function to make a NewGround and style it,Called from makeNewGround Function
    creates a div with class plateform and stores It in Array after
    appending it in Grid*/

  const ground = document.createElement("div");
  ground.style.height = `${40}px`;
  ground.style.width = `${80}px`;
  ground.style.backgroundColor = `green`;
  ground.style.position = `absolute`;
  ground.setAttribute("class", "plateform");
  ground.style.left = `${groudLeft}px`;
  ground.style.bottom = `${newGroungbottom}px`;
  grid.appendChild(ground);
  plateFormArray.push(ground);
};

const makeNewGround = (callFrom) => {
  /*makeNewground with string argument which is name of function from which it
    calls */

  if (callFrom === "startGame") {
    /*If called from  startGameFunction for totalNumber of Grounds
        this will add randomBottom from counter and give random left 
        property to plateform with which makeGroundFunction is called*/

    for (let counter = 0; counter < groudCount; counter++) {
      let newGroungbottom = 100 + `${counter}` * 100;
      let groudLeft = Math.random() * 500;
      makeGround(newGroungbottom, groudLeft);
    }
  } else if (callFrom === "moveGround") {
    /*If called via moveGroundFunction increase score by one 
        and on 500 height with random left style create a ground
        By calling makeGround Function
        */

    score++;
    document.getElementById("point").innerText = `Points :${score}`;
    grounLeft = Math.random() * 500;
    makeGround(500, grounLeft);
  }
};

const moveGround = () => {
  /*Function To move Ground by 5px down Side */
  if (doodleBottom > 150) {
    /* if doodle's bottom is greater then 150 foreach
        div in grid remove 5px from their bottom  */

    plateFormArray.forEach((plateform) => {
      const groundBottom = parseInt(plateform.style.bottom) - 5;
      plateform.style.bottom = `${groundBottom}px`;
      if (plateform.style.bottom == `0px`) {
        /*if platform touches gridGround remove that div from Array &
                Grid and call the  makeNewGroundFunction*/

        removeGround = plateFormArray.shift();
        removeGround.remove();
        makeNewGround(`moveGround`);
      }
    });
  }
};

const fallDoodle = () => {
  /* Function to shift doodle down side by removing 10px from bottom
    every 50miliseconds */
  isFalling = true; //Flag of falling set to true
  isJumping = false; //Flag of jumping set to false
  clearInterval(jumpInterval); //clear The Interval call to jumpFunction
  fallInterval = setInterval(() => {
    //remove 10px form doodle bottom every 50milisecond
    doodleBottom -= 10;
    doodler.style.bottom = `${doodleBottom}px`;
    if (doodleBottom <= 0 || doodler.style.bottom == `0px`) {
      //If bottom of doodle is 0 remove doodler and call GameOver Function
      clearInterval(fallInterval); //clear The Interval call to fallFunction
      doodler.remove();
      gameOver();
    } else {
      plateFormArray.forEach((plateform) => {
        if (
          // forEach div in grid if doodler touches plateform call Jump Function
          doodleBottom >= parseInt(plateform.style.bottom) && //doodle is @higher then ground
          doodleBottom <= parseInt(plateform.style.bottom) + 40 && //doodle lower then ground+Ground's height
          parseInt(doodler.style.left) <= parseInt(plateform.style.left) + 60 && //doodle's left is same as plateform or lesser then plateform+doodlerwidth
          parseInt(doodler.style.left) + 80 >= parseInt(plateform.style.left) && //doodler's left+platform width is greater or eaqual to platform's left
          isJumping === false //Doodler is not jumping
        ) {
          /*if all of above is true shift doodle startpoint to 
                    that height in grid & call jumpFunction*/
          console.log(`landed`);
          startPoint = doodleBottom;
          jumpDoodle();
        }
      });
    }
  }, 50);
};

const jumpDoodle = () => {
  /*Function to jump the doodle by adding 20px to it's bottom value*/
  isJumping = true; //jumping flag true
  isFalling = false; //falling flag false
  clearInterval(fallInterval); //clear interval call to FallingFunction
  jumpInterval = setInterval(() => {
    //every 50minisecond add 20px to doodleBoottom
    doodleBottom += 20;
    doodler.style.bottom = `${doodleBottom}px`;
    if (doodleBottom > startPoint + 200) {
      //If doodle's latest height is added 200px call fallFunction
      fallDoodle();
    }
  }, 50);
};

const startGame = () => {
  //Called Onclick of startButton
  if (gameOverFlag === false) {
    //if game is not over
    startButton.disabled = true; //disabled start button
    makeGrid(); //make a grid
    makeNewGround(`startGame`); //make grounds with GroundCount
    makeDoodle(); //make a doodle
    jumpDoodle(); //Start jumping the doodle
    setInterval(moveGround, 50); //move ground downside every 50milisceonds
  } else {
    startButton.disabled = false;
  }
};

const doodlerMove = document.addEventListener("keyup", (event) => {
  //On keyUp event detect the keyPressed and work accordingly
  let doodlerLeft = parseInt(doodler.style.left); //get Number value of left of doodler
  if (event.key == "ArrowLeft") {
    //if leftArrow key is pressed
    isleft = true; //set flag true for leftside

    if (isRight === true) {
      //if right flag is true clear Inerval call oof rightkey event
      clearInterval(rightInterval);
      isRight = false; //set flag to false
    }
    leftInterval = setInterval(() => {
      if (doodlerLeft >= 0) {
        //If dooler is not @ left of grid for every 20milisecond
        //remove 3px from It's left value
        doodlerLeft -= 3;
        doodler.style.left = `${doodlerLeft}px`;
      } else {
        //else call rightKey condition
        event.key = "ArrowRight";
      }
    }, 20);
  } else if (event.key == "ArrowRight") {
    //if rightArrow key is pressed set flag to true
    isRight = true;

    if (isleft === true) {
      //if left flag is true clear Inerval call of leftkey event
      clearInterval(leftInterval);
      isleft = false; //set flag of left to false
    }

    rightInterval = setInterval(() => {
      if (doodlerLeft <= 540) {
        //If dooler is not @ right of grid for every 20milisecond
        //add 3px to It's left value
        doodlerLeft += 3;
        doodler.style.left = `${doodlerLeft}px`;
      } else {
        //else call LeftKey condition
        event.key = "ArrowLeft";
      }
    }, 20);
  }
});

// document.getElementById("startButton").addEventListener("click",()=>{
//Click Function to call startGame Function on startButton Of html
startGame();
// }
