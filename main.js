alert("Hello")const lifeBarsArray = document.getElementsByClassName("progress-bar");
console.log(lifeBarsArray);

const buttonsArray = document.querySelectorAll("button");
console.log(buttonsArray);

buttonsArray.forEach(button => {

  button.addEventListener("click", event => {
    console.log(event);
    console.log(typeof event.target.name);
    /* if attack button is pressed */
    if ( event.target.name === "attack" ) {
      const regexOption = /\d+/g; //only numbers
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
      } 
    }
    
  })
});

