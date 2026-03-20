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
Qinput.addEventListener("keydown", (e)=>{
  if(e.key==="Enter"){
    e.preventDefault();
    Ainput.focus();
  }
});
Ainput.addEventListener("keydown", (e)=>{
  if(e.key==="Enter"){
    e.preventDefault();
    submitForm();
  }
  });
submit.addEventListener("click", submitForm);

preButton.addEventListener("click", () =>{
  if(state.currentindex===0){
    state.currentindex = state.cards.length-1;
  }
  else{
    state.currentindex = state.currentindex-1;
  }
  render();
});

deleteButton.addEventListener("click", ()=>{
  state.cards.splice(state.currentindex, 1);
  if(state.cards.length-1 < state.currentindex){
    state.currentindex = 0
  }
	render();
});

nextButton.addEventListener("click", () => {
  //built this if/else all by myself! whoop!whoop!
  if (state.cards.length-1 > state.currentindex){
    state.currentindex++
  }
  else{
    state.currentindex = 0;
  }
	render();
});
//STATE OBJECT
const state = {
	cards: [],
	currentindex: 0,
}
//RENDER FUNCTION
function render(){
	const card = state.cards[state.currentindex];
	if(!card){
		Qcard.textContent = "";
		Acard.textContent = "";
		return;
	}
	Qcard.textContent = card.Q;
	Acard.textContent = card.A;
	Ainput.value = "";
	Qinput.value = "";
}
//submit form
function submitForm(){
	const check1 = read(Ainput);
	const check2 = read(Qinput);
	if(!check1 || !check2){
		alertF();
		return;
	}
  pushCard(check2, check1);
  render();
}
//addNewCard to Array
function pushCard(x,y){
  let obj = {Q: x, A: y};
  state.cards.push(obj);
  state.currentindex = state.cards.length-1;
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
//DOM interactions
//read input
const read = (input) => {
  const text = input.value.trim();
  const proceed = validate(text);
  if (proceed){
    return text
  }
  else{
    return false;
  }
};


