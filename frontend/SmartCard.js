//DOM APIs
const Qcard = document.querySelector("#questionCard");
const Acard = document.querySelector("#answerCard");
const Qinput = document.querySelector("#inputQ");
const Ainput = document.querySelector("#inputA");
const submit = document.querySelector("#addQuestion");
const preButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const deleteButton = document.querySelector("#delete");
const editButton = document.querySelector("#edit");

// edit state for styling
let edit = false

const toggleEdit = () =>{
  edit = !edit;
  if(edit){
    Qcard.classList.add("editCard");
    Acard.classList.add("editCard");
  } else{
    Qcard.classList.remove("editCard");
    Acard.classList.remove("editCard");
    Ainput.value = "";
    Qinput.value = "";
    Ainput.blur();
    Qinput.blur();
  }
};




//EventListeners
// "enter" key in input boxes
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
// submit button
submit.addEventListener("click", submitForm);
// previous button state change
preButton.addEventListener("click", () =>{
  if(state.currentindex===0){
    state.currentindex = state.cards.length-1;
  }
  else{
    state.currentindex = state.currentindex-1;
  }
  render();
});
// delete button state change
deleteButton.addEventListener("click", ()=>{
  state.cards.splice(state.currentindex, 1);
  if(state.currentindex >= state.cards.length){
    state.currentindex = 0
    // if deleted item is the last item, loop around to index 0; otherwise, the next item falls back into index of the first and currentindex can stay the same.
  }
	render();
});

nextButton.addEventListener("click", () => {
  //built this if/else all by myself! whoop!whoop!
  //if the array length is greater than the currentindex, increase by 1; if it is smaller or equal, loop back to zero so couter is not falling off the end of the array.
  state.currentindex = (state.currentindex + 1) % state.cards.length;
  // if (state.cards.length-1 > state.currentindex){
  //   state.currentindex++
  // }
  // else{
  //   state.currentindex = 0;
  // }
	render();
});

// EDIT BUTTON
//* On click this should toggle edit state,
// place QA item in input boxes,
// move cursor to input boxes,
// replace current index item with edited item,
// render.*//
editButton.addEventListener("click", () =>{
  toggleEdit();
   if(edit){
    Qinput.value = state.cards[state.currentindex].Q;
    Ainput.value = state.cards[state.currentindex].A;
    Qinput.focus();
    } return;
    
  //   Qinput.value = "";
  //   Ainput.value = "";
  //   Qinput.blur();
  //   Ainput.blur();
  // }
});

//STATE OBJECT
const state = {
	cards: [],
	currentindex: 0,
}

//RENDER FUNCTION occurs after "submit form"
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
  Ainput.blur();
  Qinput.blur();
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
  if(edit){
    state.cards[state.currentindex] = obj;
    toggleEdit();
  }else{
  state.cards.push(obj);
  state.currentindex = state.cards.length-1;
  }
}
//validation and alert
//validation
const validate = x => x !== "";
  // if(x===""){
  //   return false;
  // }
  // else{
  //   return true;
  // }

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


