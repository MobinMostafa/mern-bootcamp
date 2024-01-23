let h2 = document.querySelector("h2")
// let button = document.querySelector("button")

let counter = 0;

const inc = () => {
  counter++
  h2.innerText = counter
}

const dec = () => {
   if(counter > 0){
    counter--
    h2.innerText = counter
   }
  }


