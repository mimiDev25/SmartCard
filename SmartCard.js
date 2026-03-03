//DOM APIs
const Qcard = document.querySelector("#questionCard");
const Acard = document.querySelector("#answerCard");
const nextButton = document.querySelector("#next");
const deleteButton = document.querySelector("#delete");
const Qinput = document.querySelector("#inputQ");
const Ainput = document.querySelector("#inputA");
const submit = document.querySelector("#addQuestion");
const preButton = document.querySelector("#previous");

//EventListeners
submit.addEventListener("click", () =>{
  const check1 = read(Ainput);
  const check2 = read(Qinput);
  if(!check1 || !check2) return;
  pushCard(check2, check1);
  
  displayQuestion(currentindex);
  displayAnswer(currentindex);
  
  Ainput.value="";
  Qinput.value="";
});

preButton.addEventListener("click", () =>{
  if (cards.length === 0) return;
  if(currentindex===0){
    currentindex = cards.length-1;
  }
  else{
    currentindex = currentindex-1;
  }
  displayQuestion(currentindex);
  displayAnswer(currentindex);
});

deleteButton.addEventListener("click", ()=>{
  cards.splice(currentindex, 1);
  if(cards.length-1 < currentindex){
    currentindex = 0
  }
  if(cards.length===0){
    Qcard.textContent = "";
    Acard.textContent = "";
  }
  displayQuestion(currentindex);
  displayAnswer(currentindex);
});

nextButton.addEventListener("click", () => {
  //built this if/else all by myself! whoop!whoop!
  if (cards.length-1 > currentindex){
    currentindex++
  }
  else{
    currentindex = 0;
  }
  displayQuestion(currentindex);
  displayAnswer(currentindex);
});
//main array and array methods
//main array for Q.&A.
let cards = [
]
//addNewCard to Array
function pushCard(x,y){
  let obj = {Q: x, A: y};
  cards.push(obj);
  currentindex = cards.length-1;
}
//validation and alert
//validation
function validate(x){
  if(x===""){
    return false;
  }
  else{
    return true;
  }
};
//alert function
const alertF = () => alert("Please enter a question and an answer.")

//counterstate!!
let currentindex = 0

//DOM interactions
//read input
const read = (input) => {
  const text = input.value.trim();
  const proceed = validate(text);
  if (proceed){
    return text
  }
  else{
    alertF();
  }
};
//display Question
function displayQuestion(i){
  if(cards.length === 0){
    Qcard.textContent = "";
    return;
  }
  Qcard.textContent = cards[i].Q
}
//display Answer
function displayAnswer(i){
  if(cards.length === 0){
    Acard.textContent = "";
    return;
  }
  Acard.textContent = cards[i].A
}



