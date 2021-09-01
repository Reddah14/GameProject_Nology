alert("Hello")const lifeBarsArray = document.getElementsByClassName("progress-bar");
console.log(lifeBarsArray);
const lifeBarsArray = document.getElementsByClassName("progress-bar");

const buttonsArray = document.querySelectorAll("button");
//console.log(buttonsArray);

const startGameButton = buttonsArray[1];
const reStartGameButton = buttonsArray[2];
const logPannel = document.getElementsByClassName("header__info--logPannel")[0];
console.log(logPannel.innerText);
const mainDiv = document.getElementsByTagName("main");
const finalGiffSection = document.getElementsByTagName("section");
let turnCounterPlayerOne = 0;
let turnCounterCPU = 0;
let attackDamage = 30;
let untilWhatTurnIsCPUspell = 0;
let untilWhatTurnIsPlayerOnespell = 0;
function reStartGame() {
  finalGiffSection[1].classList.add("remove-from-screen");
  buttonsArray[0].classList.remove("remove-from-screen");
  buttonsArray[1].classList.add("remove-from-screen");
  buttonsArray[2].classList.add("remove-from-screen");
  logPannel.innerText = "Another Round ?"

/* reset cpu giff when finish battle */
  const cpuMainGiff = document.querySelector("#cpuMainGiff");
  cpuMainGiff.classList.remove("remove-from-screen");
  const cpuRandomGiff = document.getElementById("cpuRandomGiff");
  cpuRandomGiff.classList.add("remove-from-screen");
/* reset player1 giff when finish battle */
  const playerOneMainGiff = document.querySelector("#playerOneMainGiff");
  playerOneMainGiff.classList.remove("remove-from-screen");
  const playerOneRandomGiff = document.getElementById("playerOneRandomGiff");
  playerOneRandomGiff.classList.add("remove-from-screen");
}
function startGame() {
  lifeBarsArray[0].style.width = "100%";
  lifeBarsArray[1].style.width = "100%";
  startGameButton.classList.add("remove-from-screen");
  logPannel.innerText = "Fight ! ";
  mainDiv[0].classList.remove("remove-from-screen");
  const whoStarts = sessionStorage.getItem('whoStartTheGame');
  const playerOneButtonsArray = Object.values(buttonsArray).filter( button => {
    return button.parentElement.className === "row gap-2 d-md-block battlefield__player1-buttons";
  })

  if ( whoStarts === "cpu" ) {
    playerOneButtonsArray.forEach(button => {
      button.classList.add("remove-from-screen");
    })
    setTimeout(function cpuTurnDecision() {
      // After waiting for 3 seconds, call the function below.
      CPUselectRandomOption();
    }, 2000);

    setTimeout( () => {
      playerOneButtonsArray.forEach(button => {
        button.classList.remove("remove-from-screen");
      })
    }, 2500);
  }
}

function CPUselectRandomOption() {
  console.log('cpu is ON!!!');
  const cpuButtonsArray = Object.values(buttonsArray).filter( (button, index) => {
    return index > 5;
  })
  const randomButton = cpuButtonsArray[Math.floor(Math.random()*cpuButtonsArray.length)];

  if ( randomButton.value === "attack" ) {
    console.log("attack button ON");
    CPUattackPlayerOne();
  } else if ( randomButton.value === "spell" ) {
    console.log("spell button ON");
    CPUspellPlayerOne();
  } else if ( randomButton.value === "pizza" ) {
    console.log("pizza button ON");
    CPUeatPizza();
  } else if ( randomButton.value === "" ) {
    console.log("randomButton has no value");
  } else {
    console.log("cpu button not catched");
  }
}

function playerOneAttackCPU() {
  turnCounterPlayerOne++;

  const regexOption = /\d+/g; // to select only numbers
  let currentCPUlifeDirty = lifeBarsArray[1].style.width; // cojo el valor
  let currentCPUlifeClean = currentCPUlifeDirty.match(regexOption); // currentLifeClean = ["100"]
  let currentCPUlifeCleanAndTypeNumber = parseInt(currentCPUlifeClean);
  console.log('CPU life clean: ', currentCPUlifeCleanAndTypeNumber); // 75 (number type)
  
  const isPlayerOneunderSpell = sessionStorage.getItem("isPlayerOnespell");
  if (isPlayerOneunderSpell) {
    untilWhatTurnIsPlayerOnespell = sessionStorage.getItem("CPUSpellPlayerOneuntilTurn");
  }
  if (isPlayerOneunderSpell === "true" && turnCounterPlayerOne <= untilWhatTurnIsPlayerOnespell) {
    attackDamage = 15;
  } else {
    attackDamage = 30;
  } 
  let modifiedLifeTypeNumber = currentCPUlifeCleanAndTypeNumber - attackDamage; // cambio el valor
  console.log(modifiedLifeTypeNumber);

  let modifiedFormattedLife = modifiedLifeTypeNumber.toString();
  let readyToApplyLife = modifiedFormattedLife + "%";
  console.log( typeof readyToApplyLife);

  if ( (lifeBarsArray[1].style.width = readyToApplyLife) <= "0%" ) {
    lifeBarsArray[1].style.width = "0%";
    //alert("KO!");
    logPannel.innerText = "Player 1 Wins ! 🎉🎉🎉";
    reStartGameButton.classList.remove("remove-from-screen");
    mainDiv[0].classList.add("remove-from-screen");
    finalGiffSection[1].classList.remove("remove-from-screen");
    grab_dataForEndFightGiff("victory");
    setTimeout( cpuTurnDecision = () => {
      // After waiting for 3 seconds, call the function below.
      logPannel.innerText = "Player 1 Wins ! 🎉🎉🎉";
      reStartGameButton.classList.remove("remove-from-screen");
      mainDiv[0].classList.add("remove-from-screen");
      finalGiffSection[1].classList.remove("remove-from-screen");
      grab_dataForEndFightGiff("victory");
    }, 1500);
  } else {
    lifeBarsArray[1].style.width = readyToApplyLife;
    logPannel.innerText = "Player 1 Attacks 🗡🗡🗡 and takes 30 life points . . . ."
    setTimeout(function cpuTurnDecision() {
      // After waiting for 3 seconds, call the function below.
      console.log("from attack");
      CPUselectRandomOption();
    }, 0500);
  }  
}

function playerOneSpellCPU() {
  turnCounterPlayerOne++;
  let playerOneSpellCPUuntilTurn = turnCounterPlayerOne + 2;
  sessionStorage.setItem('playerOneSpellCPUuntilTurn', playerOneSpellCPUuntilTurn);
  sessionStorage.setItem('isCPUspell', true);
  const regexOption = /\d+/g; // to select only numbers
  let currentCPUlifeDirty = lifeBarsArray[1].style.width; // cojo el valor
  let currentCPUlifeClean = currentCPUlifeDirty.match(regexOption); // currentLifeClean = ["100"]
  let currentCPUlifeCleanAndTypeNumber = parseInt(currentCPUlifeClean);
  console.log('CPU life clean: ', currentCPUlifeCleanAndTypeNumber); // 75 (number type)
  const spellDamage = 20;
  let modifiedLifeTypeNumber = currentCPUlifeCleanAndTypeNumber - spellDamage; // cambio el valor
  console.log(modifiedLifeTypeNumber);

  let modifiedFormattedLife = modifiedLifeTypeNumber.toString();
  let readyToApplyLife = modifiedFormattedLife + "%";
  console.log( typeof readyToApplyLife);

  if ( (lifeBarsArray[1].style.width = readyToApplyLife) <= "0%" ) {
    lifeBarsArray[1].style.width = "0%";
    alert("KO!");

    setTimeout( cpuTurnDecision = () => {
      // After waiting for 3 seconds, call the function below.
      logPannel.innerText = "Player 1 Wins ! 🎉🎉🎉";
      reStartGameButton.classList.remove("remove-from-screen");
      mainDiv[0].classList.add("remove-from-screen");
      finalGiffSection[1].classList.remove("remove-from-screen");
      grab_dataForEndFightGiff("winner");
    }, 1500);    
  } else {
    const cpuMainGiff = document.querySelector("#cpuMainGiff");
    cpuMainGiff.classList.add("remove-from-screen");

    const cpuRandomGiff = document.getElementById("cpuRandomGiff");
    cpuRandomGiff.classList.remove("remove-from-screen");
    grab_dataForCPUgiff("dog");

    lifeBarsArray[1].style.width = readyToApplyLife;
    logPannel.innerText = "Player 1 Spells on rival giff ✨! Takes 20 life points . . . ."
    setTimeout(function cpuTurnDecision() {
      // After waiting for 3 seconds, call the function below.
      console.log("from spell");
      CPUselectRandomOption();
    }, 1500);
  }  
}

function playerOneEatPizza() {
  turnCounterPlayerOne++;
  sessionStorage.setItem('isPlayerOnespell', false);  
  const regexOption = /\d+/g; // to select only numbers
  let playerOneLifeDirty = lifeBarsArray[0].style.width; // cojo el valor
  let playerOneLifeClean = playerOneLifeDirty.match(regexOption); // currentLifeClean = ["100"]
  let currentPlayerOneLifeCleanAndTypeNumber = parseInt(playerOneLifeClean);
  console.log('rival life clean: ', currentPlayerOneLifeCleanAndTypeNumber); // 75 (number type)
  const pizzaHealing = 15;
  let modifiedLifeTypeNumber = currentPlayerOneLifeCleanAndTypeNumber + pizzaHealing; // cambio el valor
  console.log(modifiedLifeTypeNumber);

  let modifiedFormattedLife = modifiedLifeTypeNumber.toString();
  let readyToApplyLife = modifiedFormattedLife + "%";
  console.log( typeof readyToApplyLife);

  logPannel.innerText = "Player 1 eats a slice of pizza 🍕! Recovers 15 life points . . . ."
  lifeBarsArray[0].style.width = readyToApplyLife;
  setTimeout(function cpuTurnDecision() {
    // After waiting for 3 seconds, call the function below.
    console.log("from pizza");
    CPUselectRandomOption();
  }, 3000);  
}

function CPUattackPlayerOne() {
  const regexOption = /\d+/g; // to select only numbers
  let playerOneLifeDirty = lifeBarsArray[0].style.width; // cojo el valor
  let playerOneLifeClean = playerOneLifeDirty.match(regexOption); // currentLifeClean = ["100"]
  let playerOneLifeCleanAndTypeNumber = parseInt(playerOneLifeClean);
  console.log('rival life clean: ', playerOneLifeCleanAndTypeNumber); // 75 (number type)
  const attackDamage = 30;
  let modifiedLifeTypeNumber = playerOneLifeCleanAndTypeNumber - attackDamage; // cambio el valor
  console.log(modifiedLifeTypeNumber);

  let modifiedFormattedLife = modifiedLifeTypeNumber.toString();
  let readyToApplyLife = modifiedFormattedLife + "%";
  console.log( typeof readyToApplyLife);

  if ( (lifeBarsArray[0].style.width = readyToApplyLife) <= "0%" ) {
    lifeBarsArray[0].style.width = "0%";
    alert("KO!");
  } else {
    logPannel.innerText = "CPU Attacks!! 🗡🗡🗡 on Player 1 !  -30 life points . . . ."
    lifeBarsArray[0].style.width = readyToApplyLife;
  }    
}

function CPUspellPlayerOne() {
  const regexOption = /\d+/g; // to select only numbers
  let playerOneLifeDirty = lifeBarsArray[0].style.width; // cojo el valor
  let playerOneLifeClean = playerOneLifeDirty.match(regexOption); // currentLifeClean = ["100"]
  let playerOneLifeCleanAndTypeNumber = parseInt(playerOneLifeClean);
  console.log('rival life clean: ', playerOneLifeCleanAndTypeNumber); // 75 (number type)
  const spellDamage = 20;
  let modifiedLifeTypeNumber = playerOneLifeCleanAndTypeNumber - spellDamage; // cambio el valor
  console.log(modifiedLifeTypeNumber);

  let modifiedFormattedLife = modifiedLifeTypeNumber.toString();
  let readyToApplyLife = modifiedFormattedLife + "%";
  console.log( typeof readyToApplyLife);

  if ( (lifeBarsArray[0].style.width = readyToApplyLife) <= "0%" ) {
    lifeBarsArray[0].style.width = "0%";
    alert("KO!");
  } else {
    logPannel.innerText = "CPU Spells on Player 1 !! ✨✨  -20 life points . . . ."
    const playerOneMainGiff = document.querySelector("#playerOneMainGiff");
    playerOneMainGiff.classList.add("remove-from-screen");

    const playerOneRandomGiff = document.getElementById("playerOneRandomGiff");
    playerOneRandomGiff.classList.remove("remove-from-screen");
    grab_dataForPlayerOneGiff("cat");


    lifeBarsArray[0].style.width = readyToApplyLife;
    logPannel.innerText = "CPU Spells on Player 1 !! ✨✨  -20 life points . . . ."
  }
}

function CPUeatPizza() {
  const regexOption = /\d+/g; // to select only numbers
  let CPUlifeDirty = lifeBarsArray[1].style.width; // cojo el valor
  let CPUlifeClean = CPUlifeDirty.match(regexOption); // currentLifeClean = ["100"]
  let currentCPUlifeCleanAndTypeNumber = parseInt(CPUlifeClean);
  console.log('rival life clean: ', currentCPUlifeCleanAndTypeNumber); // 75 (number type)
  const pizzaHealing = 15;
  let modifiedLifeTypeNumber = currentCPUlifeCleanAndTypeNumber + pizzaHealing; // cambio el valor
  console.log(modifiedLifeTypeNumber);

  let modifiedFormattedLife = modifiedLifeTypeNumber.toString();
  let readyToApplyLife = modifiedFormattedLife + "%";
  console.log( typeof readyToApplyLife);

  logPannel.innerText = "CPU has a Pizza Fest 🍕🍕🍕 And recovers 15 life points . . . ."
  lifeBarsArray[1].style.width = readyToApplyLife;  
}

buttonsArray.forEach(button => {

  button.addEventListener("click", event => {
    if ( event.target.name === "ChoosePlayerToStart" ) {
      const randomNumber = Math.floor(Math.random() * 10);
      if ( randomNumber <= 6 ) {
        console.log("p1 starts");
        sessionStorage.setItem('whoStartTheGame', 'player1');
        logPannel.innerHTML = "Player 1 Starts !";
        event.target.classList.add("remove-from-screen");
        startGameButton.classList.remove("remove-from-screen");
      } else {
        console.log("cpu starts");
        sessionStorage.setItem('whoStartTheGame', 'cpu');
        logPannel.innerHTML = "CPU Starts !";
        event.target.classList.add("remove-from-screen");
        startGameButton.classList.remove("remove-from-screen");        
      }
    }
    /* if attack button is clicked by player 1*/
    else if ( event.target.name === "attack" ) {
      playerOneAttackCPU();
    }
    /* if spell button is clicked */
    else if ( event.target.name === "spell" ) {
      playerOneSpellCPU();
    }
    /* if pizza button is clicked */
    else if ( event.target.name === "pizza" ) {
      playerOneEatPizza();      
    }    
  })
});