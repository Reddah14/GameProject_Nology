alert("Hello")const lifeBarsArray = document.getElementsByClassName("progress-bar");
console.log(lifeBarsArray);

const buttonsArray = document.querySelectorAll("button");
console.log(buttonsArray);

buttonsArray.forEach(button => {

  button.addEventListener("click", event => {
    console.log(event);
  })
})

