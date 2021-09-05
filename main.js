const lifeBarsArray = document.getElementsByClassName("progress-bar");
const buttonsArray = document.querySelectorAll("button");
const startGameButton = buttonsArray[1];
const reStartGameButton = buttonsArray[2];
const logPannel = document.getElementsByClassName("header__info--logPannel")[0];
const mainDiv = document.getElementsByTagName("main");
const finalGiffSection = document.getElementsByTagName("section");
const regexOptionForOnlyNumbers = /\d+/g; // to select only numbers

let turnCounterPlayerOne = 0;
let turnCounterCPU = 0;
let attackDamage = 30;
let untilWhatTurnIsCPUspell = 0;
let untilWhatTurnIsPlayerOnespell = 0;

//TODO: fix loggin pannel when attacking under spell (should say 15 damage not 30)

const choosingWhoStartsFirst = (randomNumberParam, buttonParam) => {
  if ( randomNumberParam <= 5 ) {
    sessionStorage.setItem("whoStartTheGame", "player1");
    printAtLogPannel("Player 1 Starts !");
    buttonParam.classList.add("remove-from-screen");
    startGameButton.classList.remove("remove-from-screen");
  } else {
    sessionStorage.setItem("whoStartTheGame", "cpu");
    printAtLogPannel("CPU Starts !");
    event.target.classList.add("remove-from-screen");
    startGameButton.classList.remove("remove-from-screen");
  }  
}

const cleaningLifearStringAndTurningIntoTypeNumber = (indexOfLifeBarParam) => {
  let lifebarDirtyAndString = lifeBarsArray[indexOfLifeBarParam].style.width;
  let lifebarCleanAndTypeString = lifebarDirtyAndString.match(regexOptionForOnlyNumbers);
  let lifebarCleanAndTypeNumber = parseInt(lifebarCleanAndTypeString);

  return lifebarCleanAndTypeNumber;
}
const modifyLifebarPointsOfPlayerOne = (typeOfAttackParam, pointsToModifyParam) => {
//TODO: switch case refactor ?

  if ( typeOfAttackParam === "pizza" ) {
    const pizzaHealing = 15;
    if ( lifeBarsArray[1].style.width === "100%" || lifeBarsArray[1].style.width > "50%" ) {
      printAtLogPannel("CPU tries to eat pizza ... but still waiting for delivery and loses turn !! 🎃🎃🎃");
      
      return;
    }
    displayingCpuMainGiff();

    let CPUlifeDirty = lifeBarsArray[1].style.width; // cojo el valor
    let CPUlifeClean = CPUlifeDirty.match(regexOptionForOnlyNumbers); // currentLifeClean = ["100"]
    let currentCPUlifeCleanAndTypeNumber = parseInt(CPUlifeClean);
    let modifiedLifeTypeNumber = currentCPUlifeCleanAndTypeNumber + pizzaHealing; // cambio el valor
    let modifiedFormattedLife = modifiedLifeTypeNumber.toString();
    let readyToApplyLife = modifiedFormattedLife + "%";    
    lifeBarsArray[1].style.width = readyToApplyLife;  

    if (  sessionStorage.getItem("isCPUspell") === "true" ) {
      sessionStorage.setItem("isCPUspell", "false");
      printAtLogPannel("CPU eats a slice of pizza 🍕 ! Recovers 15 life points and is not under the spell anymore !");
    } else {
      printAtLogPannel("CPU eats a slice of pizza 🍕 ! Recovers 15 life points . .");
    }

    return;
  }

  let playerOneLifeDirty = lifeBarsArray[0].style.width; // cojo el valor
    let playerOneLifeClean = playerOneLifeDirty.match(regexOptionForOnlyNumbers); // currentLifeClean = ["100"]
    let playerOneLifeCleanAndTypeNumber = parseInt(playerOneLifeClean);
    
    const isCPUunderSpell = sessionStorage.getItem("isCPUspell");
  if (isCPUunderSpell) {
    untilWhatTurnIsCPUspell = sessionStorage.getItem("playerOneSpellCPUuntilTurn");
  }
  if ( typeOfAttackParam === "attack" ) {
    if ( isCPUunderSpell === "true" && turnCounterCPU <= untilWhatTurnIsCPUspell ) {
      pointsToModifyParam = 15;
    } else {
      pointsToModifyParam = 30;
    }
  } else if ( typeOfAttackParam === "spell" ) {
    pointsToModifyParam = 20;
  } else {
    console.error("Can't read the type of attack in order to modify lifebar !");
  }

  let modifiedLifeTypeNumber = playerOneLifeCleanAndTypeNumber - pointsToModifyParam; // cambio el valor

  let modifiedFormattedLife = modifiedLifeTypeNumber.toString();
  let readyToApplyLife = modifiedFormattedLife + "%";

  if ( (lifeBarsArray[0].style.width = readyToApplyLife) <= "0%" ) {
    lifeBarsArray[0].style.width = "0%";
    setTimeout( () => {
      printAtLogPannel("CPU Wins ! 👾🤖👾");
      reStartGameButton.classList.remove("remove-from-screen");
      mainDiv[0].classList.add("remove-from-screen");
      finalGiffSection[1].classList.remove("remove-from-screen");
      grab_dataForEndFightGiff("loser");
    }, 1500);
  } else {
    if ( typeOfAttackParam === "attack" ) {
      printAtLogPannel(`CPU Attacks!! 🗡🗡🗡 on Player 1 ! And takes ${attackDamage} life points . . . .`);
      lifeBarsArray[0].style.width = readyToApplyLife;

      return;
    } else if ( typeOfAttackParam === "spell" ) {
      grab_dataForPlayerOneGiff("cat");
      displayingPlayerOneRandomGiff();
      printAtLogPannel("CPU Spells on Player 1 !! ✨✨  -20 life points . . . .");
      lifeBarsArray[0].style.width = readyToApplyLife;

      return;
    }
  }
}

const modifyLifebarPointsOfCpu = (typeOfAttackParam, pointsToModifyParam) => {
//TODO: switch case refactor ?

  if ( typeOfAttackParam === "pizza" ) {
    const pizzaHealing = 15;
    if ( lifeBarsArray[0].style.width === "100%" || lifeBarsArray[0].style.width > "50%" ) {
      printAtLogPannel("Player 1 tries to eat pizza ... but still waiting for delivery and loses turn !! 🎃🎃🎃");
      
      setTimeout( () => {
        CPUselectRandomOption();
      }, 1500);
  
      return;
    }
    displayingPlayerOneMainGiff();

    let playerOneLifeDirty = lifeBarsArray[0].style.width; // cojo el valor
    let playerOneLifeClean = playerOneLifeDirty.match(regexOptionForOnlyNumbers); // currentLifeClean = ["100"]
    let currentPlayerOneLifeCleanAndTypeNumber = parseInt(playerOneLifeClean);
    let modifiedLifeTypeNumber = currentPlayerOneLifeCleanAndTypeNumber + pizzaHealing; // cambio el valor
    let modifiedFormattedLife = modifiedLifeTypeNumber.toString();
    let readyToApplyLife = modifiedFormattedLife + "%";    
    lifeBarsArray[0].style.width = readyToApplyLife;

    if ( sessionStorage.getItem("isPlayerOnespell") === "true" ) {
      sessionStorage.setItem("isPlayerOnespell", "false");
      printAtLogPannel("Player 1 eats a slice of pizza 🍕 ! Recovers 15 life points and is not under the spell anymore !");
    } else {
      printAtLogPannel("Player 1 eats a slice of pizza 🍕 ! Recovers 15 life points . .");
    }
    setTimeout( () => {
      CPUselectRandomOption();
    }, 3000);

    return;
  }

  let currentCPUlifeDirty = lifeBarsArray[1].style.width; // cojo el valor
  let currentCPUlifeClean = currentCPUlifeDirty.match(regexOptionForOnlyNumbers); // currentLifeClean = ["100"]
  let currentCPUlifeCleanAndTypeNumber = parseInt(currentCPUlifeClean);

  const isPlayerOneunderSpell = sessionStorage.getItem("isPlayerOnespell");
  if (isPlayerOneunderSpell) {
    untilWhatTurnIsPlayerOnespell = sessionStorage.getItem("CPUSpellPlayerOneuntilTurn");
  }
  if ( typeOfAttackParam === "attack" ) {
    if ( isPlayerOneunderSpell === "true" && turnCounterPlayerOne <= untilWhatTurnIsPlayerOnespell ) {
      pointsToModifyParam = 15;
    } else {
      pointsToModifyParam = 30;
    }
  } else if ( typeOfAttackParam === "spell" ) {
    pointsToModifyParam = 20;
  } else {
    console.error("Can't read the type of attack in order to modify lifebar !");
  }

  let modifiedLifeTypeNumber = currentCPUlifeCleanAndTypeNumber - pointsToModifyParam; // cambio el valor
  
  let modifiedFormattedLife = modifiedLifeTypeNumber.toString();
  let readyToApplyLife = modifiedFormattedLife + "%";

  if ( (lifeBarsArray[1].style.width = readyToApplyLife) <= "0%" ) {
    lifeBarsArray[1].style.width = "0%";

    setTimeout( cpuTurnDecision = () => {
      printAtLogPannel("Player 1 Wins ! 🎉🎉🎉");
      reStartGameButton.classList.remove("remove-from-screen");
      mainDiv[0].classList.add("remove-from-screen");
      finalGiffSection[1].classList.remove("remove-from-screen");
      grab_dataForEndFightGiff("winner");
    }, 1500);

  } else {
    if ( typeOfAttackParam === "spell" ) {
      displayingCpuRandomGiff();
      grab_dataForCPUgiff("dog funny");
      printAtLogPannel("Player 1 Spells✨ on rival giff for 2 more turns ! And takes 20 life points . . . .");
    } else if ( typeOfAttackParam === "attack" ) {
      printAtLogPannel(`Player 1 Attacks 🗡🗡🗡 and takes ${attackDamage} life points . . . .`);
    }

    lifeBarsArray[1].style.width = readyToApplyLife;

    setTimeout( () => {
      CPUselectRandomOption();
    }, 3000);
  }
}

const printAtLogPannel = (stringToPrintParam) => {
  return logPannel.innerText = stringToPrintParam;
}

const displayingPlayerOneButtons = () => {
  const playerOneButtonsArray = Object.values(buttonsArray).filter( button => {
    return button.parentElement.className === "row gap-2 d-md-block battlefield__player1-buttons";
  })
  playerOneButtonsArray.forEach( button => {
    button.classList.remove("remove-from-screen");
  })
}

const removingPlayerOneButtons = () => {
  const playerOneButtonsArray = Object.values(buttonsArray).filter( button => {
    return button.parentElement.className === "row gap-2 d-md-block battlefield__player1-buttons";
  })
  playerOneButtonsArray.forEach( button => {
    button.classList.add("remove-from-screen");
  })
}

const resettingLifesToHundredPoints = () => {
  lifeBarsArray[0].style.width = "100%";
  lifeBarsArray[1].style.width = "100%";

  return;
}

const removingSessionStorageSpellItems = () => {
  sessionStorage.removeItem("isPlayerOnespell");
  sessionStorage.removeItem("playerOneSpellCPUuntilTurn");
  sessionStorage.removeItem("isCPUspell");
  sessionStorage.removeItem("CPUSpellPlayerOneuntilTurn");

  return;
}

const displayingPlayerOneRandomGiff = () => {
  const playerOneMainGiff = document.querySelector("#playerOneMainGiff");
  playerOneMainGiff.classList.add("remove-from-screen");
  const playerOneRandomGiff = document.getElementById("playerOneRandomGiff");
  playerOneRandomGiff.classList.remove("remove-from-screen");

  return;
}

const displayingCpuRandomGiff = () => {
  const cpuMainGiff = document.querySelector("#cpuMainGiff");
  cpuMainGiff.classList.add("remove-from-screen");
  const cpuRandomGiff = document.getElementById("cpuRandomGiff");
  cpuRandomGiff.classList.remove("remove-from-screen");

  return;
}

const displayingCpuMainGiff = () => {
  const cpuMainGiff = document.querySelector("#cpuMainGiff");
  cpuMainGiff.classList.remove("remove-from-screen");
  const cpuRandomGiff = document.getElementById("cpuRandomGiff");
  cpuRandomGiff.classList.add("remove-from-screen");

  return;
}

const displayingPlayerOneMainGiff = () => {
  const playerOneMainGiff = document.querySelector("#playerOneMainGiff");
  playerOneMainGiff.classList.remove("remove-from-screen");
  const playerOneRandomGiff = document.getElementById("playerOneRandomGiff");
  playerOneRandomGiff.classList.add("remove-from-screen");

  return;
}

const reStartGame = () => {
  finalGiffSection[1].classList.add("remove-from-screen");
  buttonsArray[0].classList.remove("remove-from-screen");
  buttonsArray[1].classList.add("remove-from-screen");
  buttonsArray[2].classList.add("remove-from-screen");
  printAtLogPannel("Another Round ?");
  displayingCpuMainGiff();
  displayingPlayerOneMainGiff();

  return;
};

const startGame = () => {
  removingSessionStorageSpellItems();
  resettingLifesToHundredPoints();

  startGameButton.classList.add("remove-from-screen");
  printAtLogPannel("Fight ! ");
  mainDiv[0].classList.remove("remove-from-screen");
  const whoStarts = sessionStorage.getItem("whoStartTheGame");

  if ( whoStarts === "cpu" ) {
    removingPlayerOneButtons();
    setTimeout( () => {
      // After waiting for 3 seconds, call the function below.
      CPUselectRandomOption();
    }, 2000);

    setTimeout( () => {
      displayingPlayerOneButtons();
    }, 2500);
  }
}

const CPUselectRandomOption = () => {  
  const randomNumber = Math.floor(Math.random() * 8);
  if ( randomNumber <= 2 ) {
    CPUattackPlayerOne();
  } else if ( randomNumber > 2 && randomNumber <= 5 ) {
    CPUspellPlayerOne();
  } else if ( randomNumber > 5 ) {
    CPUeatPizza();
  }
}

const playerOneAttackCPU = () => {
  turnCounterPlayerOne++;
  modifyLifebarPointsOfCpu("attack", 30);

  return;
}

const playerOneSpellCPU = () => {
  turnCounterPlayerOne++;
  let playerOneSpellCPUuntilTurn = turnCounterPlayerOne + 2;
  sessionStorage.setItem("playerOneSpellCPUuntilTurn", playerOneSpellCPUuntilTurn);
  sessionStorage.setItem("isCPUspell", "true");

  modifyLifebarPointsOfCpu("spell", 20);

  return;
}

const playerOneEatPizza = () => {
  turnCounterPlayerOne++;
  modifyLifebarPointsOfCpu("pizza");

  return;
}

const CPUattackPlayerOne = () => {
  turnCounterCPU++;
  modifyLifebarPointsOfPlayerOne("attack", 30);
 
  return;
}

const CPUspellPlayerOne = () => {
  turnCounterCPU++;

  let CPUSpellPlayerOneuntilTurn = turnCounterCPU + 2;
  sessionStorage.setItem("CPUSpellPlayerOneuntilTurn", CPUSpellPlayerOneuntilTurn);
  sessionStorage.setItem("isPlayerOnespell", "true");  

  modifyLifebarPointsOfPlayerOne("spell", 20);

  return;
}

const CPUeatPizza = () => {
  turnCounterCPU++; 

  modifyLifebarPointsOfPlayerOne("pizza");

  return;
}

buttonsArray.forEach( button => {

  button.addEventListener( "click", event => {
    if ( event.target.name === "ChoosePlayerToStart" ) {
      const randomNumber = Math.floor(Math.random() * 10);
      if ( randomNumber <= 5 ) {
        sessionStorage.setItem("whoStartTheGame", "player1");
        printAtLogPannel("Player 1 Starts !");
        event.target.classList.add("remove-from-screen");
        startGameButton.classList.remove("remove-from-screen");
      } else {
        sessionStorage.setItem("whoStartTheGame", "cpu");
        printAtLogPannel("CPU Starts !");
        event.target.classList.add("remove-from-screen");
        startGameButton.classList.remove("remove-from-screen");
      }
    }
    else if ( event.target.name === "attack" ) {
      playerOneAttackCPU();
    }
    else if ( event.target.name === "spell" ) {
      playerOneSpellCPU();
    }
    else if ( event.target.name === "pizza" ) {
      playerOneEatPizza();      
    }
  })
});