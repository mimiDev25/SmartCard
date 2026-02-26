const Qcard = document.querySelector("#questionCard");
const Acard = document.querySelector("#answerCard");
const nextButton = document.querySelector("#next");
const deleteButton = document.querySelector("#delete");
const Qinput = document.querySelector("#inputQ");
const Ainput = document.querySelector("#inputA");
const submit = document.querySelector("#addQuestion");
//validation
function validate(x){
  if(x===""){
    return false;
  }
  else{
    return true;
  }
};
//read Ainput
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
function pushCard(x,y){
  let obj = {Q: x, A: y};
  cards.push(obj);
  currentindex = cards.length-1;
}

//alert function
const alertF = () => alert("Please enter a question and an answer.")
//counterstate
let currentindex = 0
//nextCard
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
//deletCard
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
})

//main array for Q.&A.
let cards = [
]
//addNewCard to Array
function addCard(question, answer){
  cards.push({Q: question, A: answer});
}
//display Question
function displayQuestion(i){
  Qcard.textContent = cards[i].Q
}
displayQuestion(currentindex)
//display Answer
function displayAnswer(i){
  Acard.textContent = cards[i].A
}
displayAnswer(currentindex)
