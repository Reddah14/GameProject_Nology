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
const playerOneButtonsArray = Object.values(buttonsArray).filter( button => {
  return button.parentElement.className === "row gap-2 d-md-block battlefield__player1-buttons";
})
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

const reStartGame = () => {
const startGame = () => {
  sessionStorage.removeItem("playerOneSpellCPUuntilTurn");
  sessionStorage.removeItem("isCPUspell");
  sessionStorage.removeItem("CPUSpellPlayerOneuntilTurn");
  sessionStorage.removeItem("isPlayerOnespell");

  lifeBarsArray[0].style.width = "100%";
  lifeBarsArray[1].style.width = "100%";
  startGameButton.classList.add("remove-from-screen");
  logPannel.innerText = "Fight ! ";
  mainDiv[0].classList.remove("remove-from-screen");
  const whoStarts = sessionStorage.getItem("whoStartTheGame");
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

const CPUselectRandomOption = () => {
  console.log('cpu is ON!!!');
  
  const randomNumber = Math.floor(Math.random() * 8);
  console.log(randomNumber);

  if ( randomNumber <= 2 ) {
    console.log("attack button ON");
    CPUattackPlayerOne();
  } else if ( randomNumber > 2 && randomNumber <= 5 ) {
    console.log("spell button ON");
    CPUspellPlayerOne();
  } else if ( randomNumber > 5 ) {
    console.log("pizza button ON");
    CPUeatPizza();
  }
}

const playerOneAttackCPU = () => {
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

    setTimeout( cpuTurnDecision = () => {
      // After waiting for 3 seconds, call the function below.
      logPannel.innerText = "Player 1 Wins ! 🎉🎉🎉";
      reStartGameButton.classList.remove("remove-from-screen");
      mainDiv[0].classList.add("remove-from-screen");
      finalGiffSection[1].classList.remove("remove-from-screen");
      grab_dataForEndFightGiff("winner");
    }, 1500);



  } else {
    lifeBarsArray[1].style.width = readyToApplyLife;
    logPannel.innerText = `Player 1 Attacks 🗡🗡🗡 and takes ${attackDamage} life points . . . .`;
    setTimeout( cpuTurnDecision = () => {
      // After waiting for 3 seconds, call the function below.
      console.log("from attack");
      CPUselectRandomOption();
    }, 3000);
  }
}

const playerOneSpellCPU = () => {
  turnCounterPlayerOne++;
  let playerOneSpellCPUuntilTurn = turnCounterPlayerOne + 2;
  sessionStorage.setItem("playerOneSpellCPUuntilTurn", playerOneSpellCPUuntilTurn);
  sessionStorage.setItem("isCPUspell", "true");

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
    grab_dataForCPUgiff("dog funny");

    lifeBarsArray[1].style.width = readyToApplyLife;
    logPannel.innerText = "Player 1 Spells✨ on rival giff for 2 more turns ! And takes 20 life points . . . .";
    setTimeout(function cpuTurnDecision() {
      // After waiting for 3 seconds, call the function below.
      console.log("from spell");
      CPUselectRandomOption();
    }, 3000);
  }  
}

const playerOneEatPizza = () => {
  turnCounterPlayerOne++;
  
  if ( lifeBarsArray[0].style.width === "100%" || lifeBarsArray[0].style.width > "50%" ) {
    logPannel.innerText = "Player 1 tries to eat pizza ... but still waiting for delivery and loses turn !! 🎃🎃🎃";
    
    setTimeout(function cpuTurnDecision() {
      console.log('p1 cant eat pizza & lose turn');
      CPUselectRandomOption();
    }, 1500);

    return;
  }
  
  const playerOneRandomGiff = document.getElementById("playerOneRandomGiff");
  playerOneRandomGiff.classList.add("remove-from-screen");
  const playerOneMainGiff = document.querySelector("#playerOneMainGiff");
  playerOneMainGiff.classList.remove("remove-from-screen");

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

  if ( sessionStorage.getItem("isPlayerOnespell") === "true" ) {
    sessionStorage.setItem("isPlayerOnespell", "false");
    logPannel.innerText = "Player 1 eats a slice of pizza 🍕 ! Recovers 15 life points and is not under the spell anymore !";
  } else {
    logPannel.innerText = "Player 1 eats a slice of pizza 🍕 ! Recovers 15 life points . .";
  }
  lifeBarsArray[0].style.width = readyToApplyLife;
  setTimeout(function cpuTurnDecision() {
    // After waiting for 3 seconds, call the function below.
    console.log("from pizza");
    CPUselectRandomOption();
  }, 3000);  
}

const CPUattackPlayerOne = () => {
  turnCounterCPU++;

  const regexOption = /\d+/g; // to select only numbers
  let playerOneLifeDirty = lifeBarsArray[0].style.width; // cojo el valor
  let playerOneLifeClean = playerOneLifeDirty.match(regexOption); // currentLifeClean = ["100"]
  let playerOneLifeCleanAndTypeNumber = parseInt(playerOneLifeClean);
  console.log('rival life clean: ', playerOneLifeCleanAndTypeNumber); // 75 (number type)
  
  const isCPUunderSpell = sessionStorage.getItem("isCPUspell");
  if (isCPUunderSpell) {
    untilWhatTurnIsCPUspell = sessionStorage.getItem("playerOneSpellCPUuntilTurn");
  }
  if (isCPUunderSpell === "true" && turnCounterCPU <= untilWhatTurnIsCPUspell) {
    attackDamage = 15;
  } else {
    attackDamage = 30;
  }
  let modifiedLifeTypeNumber = playerOneLifeCleanAndTypeNumber - attackDamage; // cambio el valor
  console.log(modifiedLifeTypeNumber);

  let modifiedFormattedLife = modifiedLifeTypeNumber.toString();
  let readyToApplyLife = modifiedFormattedLife + "%";
  console.log( typeof readyToApplyLife);

  if ( (lifeBarsArray[0].style.width = readyToApplyLife) <= "0%" ) {
    lifeBarsArray[0].style.width = "0%";

    setTimeout( cpuBeatsPlayerOne = () => {
      logPannel.innerText = "CPU Wins ! 👾🤖👾";
      reStartGameButton.classList.remove("remove-from-screen");
      mainDiv[0].classList.add("remove-from-screen");
      finalGiffSection[1].classList.remove("remove-from-screen");
      grab_dataForEndFightGiff("loser");
    }, 1500);    
  } else {
    logPannel.innerText = `CPU Attacks!! 🗡🗡🗡 on Player 1 ! And takes ${attackDamage} life points . . . .`
    lifeBarsArray[0].style.width = readyToApplyLife;
  }    
}

const CPUspellPlayerOne = () => {
  turnCounterCPU++;
  let CPUSpellPlayerOneuntilTurn = turnCounterCPU + 2;
  sessionStorage.setItem("CPUSpellPlayerOneuntilTurn", CPUSpellPlayerOneuntilTurn);
  sessionStorage.setItem("isPlayerOnespell", "true");  

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

    setTimeout( cpuBeatsPlayerOne = () => {
      // After waiting for 3 seconds, call the function below.
      logPannel.innerText = "CPU Wins ! 👾🤖👾";
      reStartGameButton.classList.remove("remove-from-screen");
      mainDiv[0].classList.add("remove-from-screen");
      finalGiffSection[1].classList.remove("remove-from-screen");
      grab_dataForEndFightGiff("loser");
    }, 1500);
  } else {
    const playerOneMainGiff = document.querySelector("#playerOneMainGiff");
    playerOneMainGiff.classList.add("remove-from-screen");

    const playerOneRandomGiff = document.getElementById("playerOneRandomGiff");
    playerOneRandomGiff.classList.remove("remove-from-screen");
    grab_dataForPlayerOneGiff("cat");


    lifeBarsArray[0].style.width = readyToApplyLife;
    logPannel.innerText = "CPU Spells on Player 1 !! ✨✨  -20 life points . . . ."
  }
}

const CPUeatPizza = () => {
  turnCounterCPU++;
  
  
  if ( lifeBarsArray[1].style.width === "100%" || lifeBarsArray[1].style.width > "50%" ) {
    logPannel.innerText = "CPU tries to eat pizza ... but still waiting for delivery and loses turn !! 🎃🎃🎃";
    
    return;
  }
  
  const cpuRandomGiff = document.getElementById("cpuRandomGiff");
  cpuRandomGiff.classList.add("remove-from-screen");  

  const cpuMainGiff = document.querySelector("#cpuMainGiff");
  cpuMainGiff.classList.remove("remove-from-screen");

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

  if (  sessionStorage.getItem("isCPUspell") === "true" ) {
    sessionStorage.setItem("isCPUspell", "false");
    logPannel.innerText = "CPU eats a slice of pizza 🍕 ! Recovers 15 life points and is not under the spell anymore !";
  } else {
    logPannel.innerText = "CPU eats a slice of pizza 🍕 ! Recovers 15 life points . .";
  }
  lifeBarsArray[1].style.width = readyToApplyLife;  
}

buttonsArray.forEach( button => {

  button.addEventListener( "click", event => {
    if ( event.target.name === "ChoosePlayerToStart" ) {
      const randomNumber = Math.floor(Math.random() * 10);
      if ( randomNumber <= 5 ) {
        console.log("p1 starts");
        sessionStorage.setItem("whoStartTheGame", "player1");
        logPannel.innerHTML = "Player 1 Starts !";
        event.target.classList.add("remove-from-screen");
        startGameButton.classList.remove("remove-from-screen");
      } else {
        console.log("cpu starts");
        sessionStorage.setItem("whoStartTheGame", "cpu");
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