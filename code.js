// To run this assignment, right click on index.html in the Visual Studio Code file explorer to the left
// and select "Open with Live Server"

// YOUR CODE HERE!

 //html elements
 const body = document.getElementById('body');
 //entire game container
const bigContainer = document.querySelector('.big-container');
   //top row
 const bcRowOne = document.querySelector('.big-container-row-one');
   const urOne = document.querySelector('.upper-row-one');
     const container = document.querySelector('.wheel-container');
     const numContainer = document.querySelector('.number-container');
   const urTwo = document.querySelector('.upper-row-two');
     const image = document.getElementById("theClimb");
     const button = document.querySelector('.spin');
     const nameTurnTime = document.querySelector('.nam-tur-tim')
       const turns = document.querySelector('.turns');
       const name = document.getElementById("name");
       const nameImput = document.querySelector('.name-input');
       const text = document.querySelector('.user-name');
       const submit = document.querySelector('.submit');
       const time = document.querySelector('.time');
        const min = document.getElementById("minutes");
          min.innerHTML = "00"
        const sec = document.getElementById("seconds");
          sec.innerHTML = ":00"
        const ten = document.getElementById("tens");
          ten.innerHTML = ":00"
   const urThree = document.querySelector('.upper-row-three');
     const instruct = document.querySelector('.ins');
     
     
     //bottom row
 const bcRowTwo = document.querySelector('.big-container-row-two'); 
    const leader = document.querySelector('.leader');
    const table = document.querySelector('.l-board');
    const game = document.querySelector('.game');
    const question = document.querySelector('.question');
     const qTable = document.querySelector('.qTable');
     const title = document.querySelector('.title');
     const answerOne = document.querySelector(".answerOne")
     const answerTwo = document.querySelector(".answerTwo")
     const answerThree = document.querySelector(".answerThree")
     const answerFour = document.querySelector(".answerFour")

    //appends
body.appendChild(bigContainer);
bigContainer.appendChild(bcRowOne)
bigContainer.appendChild(bcRowTwo)
 bcRowOne.appendChild(urOne);
 bcRowOne.appendChild(urTwo);
 bcRowOne.appendChild(urThree);
   urOne.appendChild(container);
   urOne.appendChild(numContainer);
   urTwo.appendChild(image);
   urTwo.appendChild(button);
   urTwo.appendChild(nameTurnTime);
     nameTurnTime.appendChild(turns);
     nameTurnTime.appendChild(name);
     name.appendChild(text);
     name.appendChild(submit);
     nameTurnTime.appendChild(time);
      time.appendChild(min);
      time.appendChild(sec);
      time.appendChild(ten);
   urThree.appendChild(instruct);
   bcRowTwo.appendChild(leader);
   leader.appendChild(table);
 bcRowTwo.appendChild(game);
 game.src="/images/game-v2/space-1.png"
 bcRowTwo.appendChild(question);
   question.appendChild(qTable);

   let interval ;
   //object for game board
let board = {
  playerName: "",
  currentSpace: 1,
  time: 0,
  currentRoll: 0,
  finished: false
}
  //player constructor
const Player = function (pname, score, mi, se, te ){
  this.name = pname;
  this.turns = score;
  this.minutes = mi;
  this.seconds = se;
  this.tens = te;
  this.time = ((mi * 60) * 100) + (se * 60) + te;
}
  //leaderboard constructor
const LeaderBoard = function (){
  this.playerlist = [];
}
  //adds player to leaderboard object
LeaderBoard.prototype.addPlayer = function(username){
  this.playerlist.push(username);
}

  //orders the array of plays and their times in decending order of turns then time...aka 5 turns in 3min is higher up then 5 turns in 4min
let cmp = function(x, y){
  return x > y ? 1 : x < y ? -1 : 0; 
};
LeaderBoard.prototype.scoreOrder = function(){
leaderboard.playerlist.sort(function(a, b){
  return cmp( 
      [cmp(a.turns, b.turns), cmp(a.time, b.time)], 
      [cmp(b.turns, a.turns), cmp(b.time, a.id)]
  );
});
}
 
//creates leaderboard
let leaderboard = new LeaderBoard;

  //takes player imput to addname for display 
let player = function(){
    let nameText = text.value
    board.playerName = nameText;
    name.innerHTML = `Good Luck <b>${board.playerName}</b>`;
    document.getElementById('name').style.color = "white";
    button.addEventListener("click", spin,{once : reset});
    button.addEventListener("click", startTimer,{once : reset})
   }

//triva api

   //gets string to pass into api fetch based on random number 1 - 6
const getRandom = function(number){
  let category = ""
  if (number === 1){
    category = "science";
    return category;
  }
  if (number === 2){
    category = "film_and_tv";
    return category;
  }
  if (number === 3){
    category = "music";
    return category;
  }
  if (number === 4){
    category = "history";
    return category;
  }
  if (number === 5){
    category = "geography";
    return category;
  }
  if (number === 6){
    category = "sport_and_leisure";
    return category;
  }
}


 //generates number 0-5
const randomNum = function(){
  let num = Math.floor(Math.random() * 6);
  return num;
}

//starts timer
let startTimer = function(){
  interval = setInterval(timer, 10);
}

//timer function and display
let timer = function(){
  tens++; 
    
    if(tens <= 9){
      ten.innerHTML = ":0" + tens;
    }
    
    if (tens > 9){
      ten.innerHTML = ":" + tens;
      
    } 
    
    if (tens > 99) {
      seconds++;
      sec.innerHTML = ":0" + seconds;
      tens = 0;
      ten.innerHTML = ":0" + 0;
    }
    
    if (seconds > 9){
      sec.innerHTML = ":" + seconds;
    }

    if (seconds > 59){
      minutes++;
      tens = 0;
      seconds = 0;
      ten.innerHTML = ":0" + 0;
      sec.innerHTML = ":0" + seconds;
      min.innerHTML = "0" + minutes;
    }

    if (minutes > 9){
      min.innerHTML = minutes;
    }
  }

    //resets timer for next game
  let timerReset = function() {
    tens = ":00";
  	seconds = ":00";
    minutes = "00";
    ten.innerHTML = tens;
  	sec.innerHTML = seconds;
    min.innerHTML = minutes;
  }

  //fetches multi choice triva from api
async function getQuestion(catVaule) {
    const response = await fetch(`https://the-trivia-api.com/v2/questions?limit=1&categories=${getRandom(catVaule + 1)}&difficulties=medium`, {
      method: "Get"
    });
    const question = await response.json();
    return (question);
  }



//wheel import
import {Wheel} from 'https://cdn.jsdelivr.net/npm/spin-wheel@4.1.1/dist/spin-wheel-esm.js';

//category wheel props
const props = {
  items: [
    {
      label: 'Science',
    },
    {
      label: 'Film and TV',
    },
    {
      label: 'Music',
    },
    {
      label: 'History',
    },
    { 
      label: 'Geography',
    },
    {
      label: "sport and leisure",
    }
  ],
    "borderColor": "#e6ea0b",
    "borderWidth": 3,
    "debug": false,
    "image": null,
    "isInteractive": false,
    "itemBackgroundColors": [
      "#FF9933",
      "#EAF50B",
      "#C00BF5"
    ],
    "itemLabelAlign": "right",
    "itemLabelBaselineOffset": 0,
    "itemLabelColors": [
      "#000"
    ],
    "itemLabelFont": "Georgia",
    "itemLabelFontSizeMax": 100,
    "itemLabelRadius": .9,
    "itemLabelRadiusMax": .09,
    "itemLabelRotation": 0,
    "lineColor": "#e1aa14",
    "lineWidth": 0,
    "overlayImage": './images/example-0-overlay.svg',
    "pixelRatio": 0,
    "pointerAngle": 0,
    "radius": 0.45,
    "rotationResistance": -155,
    "rotationSpeedMax": 500,
    "rotationSpeed": 50
  }

  //number wheel props
  const numProps = {
    items: [
      {
        label: '1',
      },
      {
        label: '2',
      },
      {
        label: '3',
      },
      {
        label: '4',
      },
      { 
        label: '5',
      },
      {
        label: '6',
      }
    ],
  "borderColor": "#e6ea0b",
  "borderWidth": 3,
  "debug": false,
  "image": null,
  "isInteractive": false,
  "itemBackgroundColors": [
    "#FF9933",
    "#EAF50B",
    "#C00BF5"
  ],
  "itemLabelAlign": "right",
  "itemLabelBaselineOffset": 0,
  "itemLabelColors": [
    "#000"
  ],
  "itemLabelFont": "sans-serif",
  "itemLabelFontSizeMax": 57,
  "itemLabelRadius": 0.71,
  "itemLabelRadiusMax": 0.2,
  "itemLabelRotation": 0,
  "lineColor": "#e1aa14",
  "lineWidth": 0,
  "overlayImage": './images/example-0-overlay.svg',
  "pixelRatio": 0,
  "pointerAngle": 0,
  "radius": 0.45,
  "rotationResistance": -155,
  "rotationSpeedMax": 500,
  "rotationSpeed": 500
  }


  
 //wheel containers
const wheel = new Wheel(container, props);
const numWheel = new Wheel(numContainer, numProps);

//global varibale declerations
let tens = 0;
let seconds = 0;
let minutes = 0;
let answerCount = 0;
let turnCount = 0;
let winningCatIndex = 0
let winningNumIndex = 0
const duration = 2000;
let reset = true;


//adds random number to index for category wheel
let fetchWinningCatIndex = function (){
  winningCatIndex = 0;
  winningCatIndex += randomNum();
  return winningCatIndex;
}

//adds random number to index for number wheel
let fetchWinningNumIndex = function (){
    board.currentRoll = 0
    winningNumIndex = 0
    winningNumIndex += randomNum();
    return winningNumIndex;
}

 //spins the number wheel
let spinNum = function(){
  let indexNum = fetchWinningNumIndex();
  board.currentRoll += (indexNum + 1);
    numWheel.spinToItem(indexNum, duration, true, 2);
}

//randomized the answers
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  return array;
}

//displays questions and answers
let display = function (parameter){
  let answerArray = [];
  answerArray.push(parameter[0].correctAnswer);
  answerArray.push(parameter[0].incorrectAnswers[0]);
  answerArray.push(parameter[0].incorrectAnswers[1]);
  answerArray.push(parameter[0].incorrectAnswers[2]);

  shuffle(answerArray)
  title.innerText = `${parameter[0].question.text}`
  answerOne.innerText = `${answerArray[0]}`
  answerTwo.innerText = `${answerArray[1]}`
  answerThree.innerText = `${answerArray[2]}`
  answerFour.innerText = `${answerArray[3]}`
  //adds to the turn count and calls for answer buttons to be clickable
  turnCount++;
  answerReturn();
}

let array = []

//spins category wheel and displays question when it completes
async function questionDisplay(){
    // indexCat makes sure the category fetched and category shown on wheel
  let indexCat = fetchWinningCatIndex();
  wheel.spinToItem(indexCat, duration, true, 2);
  array = await getQuestion(indexCat);
    //timeOut so the wheel can finish spining before question is displayed
    setTimeout(() => {
      display(array);
    }, 1500);
  }

  //spins the wheels at start of turn and resets game if final space has been reached
 const spin = function(){
  if (board.finished === true){
    gameReset();
    reset = false;

  }
  else {
    reset = true;
    questionDisplay();
     spinNum();
  }
 }
  

  
  //determains what answer was selected
  const answerReturn = function(){
   
    answerOne.addEventListener("click", rightOrWrongOne);
    answerTwo.addEventListener("click", rightOrWrongTwo);
    answerThree.addEventListener("click", rightOrWrongThree);
    answerFour.addEventListener("click", rightOrWrongFour);
            
        }
  //removes clickability if answered already
  let remover = function(){
      answerOne.removeEventListener("click", rightOrWrongOne);
      answerTwo.removeEventListener("click", rightOrWrongTwo);
      answerThree.removeEventListener("click", rightOrWrongThree);
      answerFour.removeEventListener("click", rightOrWrongFour);
  }
  
  //checks if player answered correctly
  let rightOrWrongOne = function () {
    //correct
  if (answerOne.innerText === array[0].correctAnswer){
      turns.innerText = `Turn Count: ${turnCount}`;
      answerCount++;
      flashRight(answerOne);
    }
    //incorrect
    else {
      turns.innerText = `Turn Count: ${turnCount}`;
      answerCount++;
      flashWrong(answerOne);
    }
  }

  let rightOrWrongTwo = function () {
    if (answerTwo.innerText === array[0].correctAnswer){
      turns.innerText = `Turn Count: ${turnCount}`;
      answerCount++;
      flashRight(answerTwo)
    }
    else {
      turns.innerText = `Turn Count: ${turnCount}`;
      answerCount++;
      flashWrong(answerTwo)
    }
  }

  let rightOrWrongThree = function () {

    if (answerThree.innerText === array[0].correctAnswer){
      turns.innerText = `Turn Count: ${turnCount}`;
      answerCount++;
      flashRight(answerThree)
    }
    else {
      turns.innerText = `Turn Count: ${turnCount}`;
      answerCount++;
      flashWrong(answerThree);
      
    }
  }

  let rightOrWrongFour = function () {
    
    if (answerFour.innerText === array[0].correctAnswer){
      answerCount++;
      turns.innerText = `Turn Count: ${turnCount}`;
      flashRight(answerFour)
    }
    else {
      answerCount++;
      turns.innerText = `Turn Count: ${turnCount}`;
      flashWrong(answerFour);
    }
  }

//moves game piece
//the "board" is just images of game piece on every space, much cleaner looking to cycle through
let mover = function(number){
  if (board.currentSpace < 19){
    for (let i = 0; i < number; i++) {
        board.currentSpace++
        game.src = `images/game-v2/space-${board.currentSpace}.png`
          }
          nextTurn();
    }
   
    if (board.currentSpace >= 19){
      game.src = `images/game-v2/space-19.png`
      board.finished = true;
      nextTurn();
      
    }
  
}
  //pulls question field away then spins wheels for next turn
let nextTurn = function() {
  if (board.finished === false) {
    setTimeout(() => {
      resetColor();
      resetQuestion();
    }, 1500);
  
  setTimeout(() => {
    spin();
  }, 2000);
  }
}

//not called but determains if last game was a highscore...could trigger screen event or prompt 
let highScore = function (para){
  let tester = false;
  leaderboard.scoreOrder();
  for (let i = 0; i <= 10; i++){
    if (para.score < leaderboard.playerlist[0].score){
      return "highScore"
    }
  }
}
  //calls back to order the scoreboard 
  //redisplay 10 ten scores
let lbDisplay = function (){
    leaderboard.scoreOrder();
    console.log(leaderboard)
    table.innerHTML = `<tr><td>Ranks</td><td>Name</td><td>Turns</td><td>Time</td></tr>`
    for (let i = 0; i < leaderboard.playerlist.length; i++){
      if (i < 10) {

        table.innerHTML += `<tr>
        <td>${i + 1}</td><td>${leaderboard.playerlist[i].name}</td><td>${leaderboard.playerlist[i].turns}</td><td>${leaderboard.playerlist[i].minutes}:${leaderboard.playerlist[i].seconds}:${leaderboard.playerlist[i].tens}</td>
          </tr>`;
                 }
                  }
                    }
  //resets board for next game
let boardReset = function(){
  board.currentSpace = 1;
  board.finished = false;
  game.src = `/game-v2/space-1.png`
  turnCount = 0;
}
  //makes a "Player" out of current player with their finished game states
  //adds new player to leaderboard object
let addThisPlayer = function(pName) {
  let m = (minutes);
  let s = (seconds)
  pName = new Player(pName, turnCount, m, s, tens);
  leaderboard.addPlayer(pName);
}

//post game completion reset
//also adds this play to leaderboard object and updates leaderboard display
let gameReset = function(){
  addThisPlayer(board.playerName)
  lbDisplay(board.playerName);
  //prompts player 
  if (window.confirm(`You win ${board.playerName}! You took ${turnCount} turns for a total time of ${minutes} Minutes and ${seconds} seconds
  Would you like to play again?`)){
    //if yes resets the game
    resetColor();
    resetQuestion();
    boardReset();
    timerReset();
    button.addEventListener("click", startTimer,{once : reset})
    player();
  }
 }

//resets color for next question
 let resetColor = function(){
  answerOne.style.backgroundColor = "white";
  answerTwo.style.backgroundColor = "white";
  answerThree.style.backgroundColor = "white";
  answerFour.style.backgroundColor = "white";
 }

 //clears the color board
 let resetQuestion = function() {
  title.innerText = `Question: ${turnCount + 1}`
  answerOne.innerText = ``
  answerTwo.innerText = ``
  answerThree.innerText = ``
  answerFour.innerText = ``
 }

 //flasher for wrong answers
 let flashWrong = function (ans){
  setTimeout(() => {
    flashRed(ans)
      setTimeout(() => {
        white(ans)
        setTimeout(() => {
          flashRed(ans)
          setTimeout(() => {
            white(ans)
            setTimeout(() => {
              flashRed(ans)
            }, 250);
          }, 250);
        }, 250);
      }, 250);
  }, 250);
  remover();
  nextTurn();
}

//flashes for right answers
let flashRight = function (ans){
  setTimeout(() => {
    flashGreen(ans)
      setTimeout(() => {
        white(ans)
        setTimeout(() => {
          flashGreen(ans)
          setTimeout(() => {
            white(ans)
            setTimeout(() => {
              flashGreen(ans)
            }, 250);
          }, 250);
        }, 250);
      }, 250);
  }, 250);
  mover(board.currentRoll);
  remover();
}

//colors
 let white = function(ans){
  ans.style.backgroundColor = "white"; 
 }
 let flashRed = function(ans){
  ans.style.backgroundColor = "red"; 
 }

 let flashGreen = function(ans){
  ans.style.backgroundColor = "lime"; 
 }

//listener for player name submition
 submit.addEventListener("click", player, {once : true} );

//baseline score to beat and loads the display
 let neil = new Player("Neil", 7, 2, 30, 50);
 leaderboard.addPlayer(neil);
 lbDisplay();
 
 