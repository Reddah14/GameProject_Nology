alert("Hello")const lifeBarsArray = document.getElementsByClassName("progress-bar");
console.log(lifeBarsArray);

const buttonsArray = document.querySelectorAll("button");
console.log(buttonsArray);
function CPUselectRandomOption() {
  console.log('cpu is ON!!!');
  const cpuButtonsArray = Object.values(buttonsArray).filter( (button, index) => {
    return index > 2;
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
  } else {
    console.log("cpu button not catched");
  }
}

function playerOneAttackCPU() {
  const regexOption = /\d+/g; // to select only numbers
  let currentRivalLifeDirty = lifeBarsArray[1].style.width; // cojo el valor
  let currentRivalLifeClean = currentRivalLifeDirty.match(regexOption); // currentLifeClean = ["100"]
  let currentRivalLifeCleanAndTypeNumber = parseInt(currentRivalLifeClean);
  console.log('rival life clean: ', currentRivalLifeCleanAndTypeNumber); // 75 (number type)
  const attackDamage = 35;
  let modifiedLifeTypeNumber = currentRivalLifeCleanAndTypeNumber - attackDamage; // cambio el valor
  console.log(modifiedLifeTypeNumber);

  let modifiedFormattedLife = modifiedLifeTypeNumber.toString();
  let readyToApplyLife = modifiedFormattedLife + "%";
  console.log( typeof readyToApplyLife);

  if ( (lifeBarsArray[1].style.width = readyToApplyLife) <= "0%" ) {
    lifeBarsArray[1].style.width = "0%";
    alert("KO!");
  } else {
    lifeBarsArray[1].style.width = readyToApplyLife;
    setTimeout(function cpuTurnDecision(){
      // After waiting for 3 seconds, call the function below.
      console.log("from attack");
      cpuSelectRandomOption();
    }, 0500);
  }  
}

function playerOneSpellCPU() {
  const regexOption = /\d+/g; // to select only numbers
  let currentRivalLifeDirty = lifeBarsArray[1].style.width; // cojo el valor
  let currentRivalLifeClean = currentRivalLifeDirty.match(regexOption); // currentLifeClean = ["100"]
  let currentRivalLifeCleanAndTypeNumber = parseInt(currentRivalLifeClean);
  console.log('rival life clean: ', currentRivalLifeCleanAndTypeNumber); // 75 (number type)
  const spellDamage = 25;
  let modifiedLifeTypeNumber = currentRivalLifeCleanAndTypeNumber - spellDamage; // cambio el valor
  console.log(modifiedLifeTypeNumber);

  let modifiedFormattedLife = modifiedLifeTypeNumber.toString();
  let readyToApplyLife = modifiedFormattedLife + "%";
  console.log( typeof readyToApplyLife);

  if ( (lifeBarsArray[1].style.width = readyToApplyLife) <= "0%" ) {
    lifeBarsArray[1].style.width = "0%";
    alert("KO!");
  } else {
    lifeBarsArray[1].style.width = readyToApplyLife;
    setTimeout(function cpuTurnDecision(){
      // After waiting for 3 seconds, call the function below.
      console.log("from spell");
      cpuSelectRandomOption();
    }, 3000);
  }  
}

function playerOneEatPizza() {
  const regexOption = /\d+/g; // to select only numbers
  let playerOneLifeDirty = lifeBarsArray[0].style.width; // cojo el valor
  let playerOneLifeClean = playerOneLifeDirty.match(regexOption); // currentLifeClean = ["100"]
  let currentPlayerOneLifeCleanAndTypeNumber = parseInt(playerOneLifeClean);
  console.log('rival life clean: ', currentPlayerOneLifeCleanAndTypeNumber); // 75 (number type)
  const pizzaHealing = 20;
  let modifiedLifeTypeNumber = currentPlayerOneLifeCleanAndTypeNumber + pizzaHealing; // cambio el valor
  console.log(modifiedLifeTypeNumber);

  let modifiedFormattedLife = modifiedLifeTypeNumber.toString();
  let readyToApplyLife = modifiedFormattedLife + "%";
  console.log( typeof readyToApplyLife);

  lifeBarsArray[0].style.width = readyToApplyLife;
  setTimeout(function cpuTurnDecision(){
    // After waiting for 3 seconds, call the function below.
    console.log("from pizza");
    cpuSelectRandomOption();
  }, 3000);  
}
function cpuSelectRandomOption() {
  console.log('cpu is ON!!!');
  const cpuButtonsArray = Object.values(buttonsArray).filter( (buttons, index) => {
    return index > 2;
  })
  console.log(cpuButtonsArray);
  const item = cpuButtonsArray[Math.floor(Math.random()*cpuButtonsArray.length)];
  console.log("random button: ", item);
function CPUattackPlayerOne() {
  const regexOption = /\d+/g; // to select only numbers
  let playerOneLifeDirty = lifeBarsArray[0].style.width; // cojo el valor
  let playerOneLifeClean = playerOneLifeDirty.match(regexOption); // currentLifeClean = ["100"]
  let playerOneLifeCleanAndTypeNumber = parseInt(playerOneLifeClean);
  console.log('rival life clean: ', playerOneLifeCleanAndTypeNumber); // 75 (number type)
  const attackDamage = 35;
  let modifiedLifeTypeNumber = playerOneLifeCleanAndTypeNumber - attackDamage; // cambio el valor
  console.log(modifiedLifeTypeNumber);

  let modifiedFormattedLife = modifiedLifeTypeNumber.toString();
  let readyToApplyLife = modifiedFormattedLife + "%";
  console.log( typeof readyToApplyLife);

  if ( (lifeBarsArray[0].style.width = readyToApplyLife) <= "0%" ) {
    lifeBarsArray[0].style.width = "0%";
    alert("KO!");
  } else {
    lifeBarsArray[0].style.width = readyToApplyLife;
  }    
}

function CPUspellPlayerOne() {
  const regexOption = /\d+/g; // to select only numbers
  let playerOneLifeDirty = lifeBarsArray[0].style.width; // cojo el valor
  let playerOneLifeClean = playerOneLifeDirty.match(regexOption); // currentLifeClean = ["100"]
  let playerOneLifeCleanAndTypeNumber = parseInt(playerOneLifeClean);
  console.log('rival life clean: ', playerOneLifeCleanAndTypeNumber); // 75 (number type)
  const spellDamage = 25;
  let modifiedLifeTypeNumber = playerOneLifeCleanAndTypeNumber - spellDamage; // cambio el valor
  console.log(modifiedLifeTypeNumber);

  let modifiedFormattedLife = modifiedLifeTypeNumber.toString();
  let readyToApplyLife = modifiedFormattedLife + "%";
  console.log( typeof readyToApplyLife);

  if ( (lifeBarsArray[0].style.width = readyToApplyLife) <= "0%" ) {
    lifeBarsArray[0].style.width = "0%";
    alert("KO!");
  } else {
    lifeBarsArray[0].style.width = readyToApplyLife;
  }
}

function CPUeatPizza() {
  const regexOption = /\d+/g; // to select only numbers
  let CPUlifeDirty = lifeBarsArray[1].style.width; // cojo el valor
  let CPUlifeClean = CPUlifeDirty.match(regexOption); // currentLifeClean = ["100"]
  let currentCPUlifeCleanAndTypeNumber = parseInt(CPUlifeClean);
  console.log('rival life clean: ', currentCPUlifeCleanAndTypeNumber); // 75 (number type)
  const pizzaHealing = 20;
  let modifiedLifeTypeNumber = currentCPUlifeCleanAndTypeNumber + pizzaHealing; // cambio el valor
  console.log(modifiedLifeTypeNumber);

  let modifiedFormattedLife = modifiedLifeTypeNumber.toString();
  let readyToApplyLife = modifiedFormattedLife + "%";
  console.log( typeof readyToApplyLife);

  lifeBarsArray[1].style.width = readyToApplyLife;  
}
buttonsArray.forEach(button => {

  button.addEventListener("click", event => {
    console.log(event);
    console.log(typeof event.target.name);
    /* if attack button is pressed */
    if ( event.target.name === "attack" ) {
      playerOneAttackCPU();
    }
    /* if spell button is clicked */
    if ( event.target.name === "spell" ) {
      playerOneSpellCPU();
    }
    /* if pizza button is clicked */
    if ( event.target.name === "pizza" ) {
      playerOneEatPizza();      
    }    
  })
});

