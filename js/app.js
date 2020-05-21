const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
var total = document.getElementById("total");
var completed = document.getElementById("completed");

// Classes Names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables

let LIST = [];
let id = 0;


//Getting Date 

const option = { weekday: "long", day: "numeric", month: "short" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("US-en", option);

//Function Add to Do

function addToDo(toDo, id, done, trash) {

 if (trash) { return; }

 const DONE = done ? CHECK : UNCHECK;
 const LINE = done ? LINE_THROUGH : "";
 const item = `  <li class="item">
                 <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                 <p class="text ${LINE}">${toDo}</p>
                 <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                 </li>
              `;
 const position = "beforeend";
 list.insertAdjacentHTML(position, item);

 // Adding one more to do in total count
 total.textContent = +total.textContent + 1;
}

document.addEventListener("keyup", function (even) {
 if (event.keyCode == 13) {
  const toDo = input.value;

  if (toDo) {
   addToDo(toDo, id, false, false);
   LIST.push({
    name: toDo,
    id: id,
    done: false,
    trash: false
   });
   id++;

  }

  input.value = "";
 }
});

//Function for Check and Uncheck the List item

function completeToDo(element) {
 element.classList.toggle(CHECK);
 element.classList.toggle(UNCHECK);
 element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
 LIST[element.id].done = LIST[element.id].done ? true : false;
}

//Remove the Entry

function removeToDo(element) {
 element.parentNode.parentNode.removeChild(element.parentNode);
 LIST[element.id].trash = true;
}

//On Event Call

list.addEventListener("click", function (event) {
 const element = event.target;
 const elementJob = element.attributes.job.value;
 if (elementJob == "complete") {
  completeToDo(element);
  var statusHistory = element.classList.contains(CHECK);
  if (statusHistory == true) {
   completed.textContent = +completed.textContent + 1;
  }
  else {
   completed.textContent = +completed.textContent - 1;
  }

 } else if (elementJob == "delete") {
  removeToDo(element);
  //Removing when deleting the item
  total.textContent = +total.textContent - 1;
  completed.textContent = +completed.textContent - 1;
  if (completed.textContent < 0) {
   completed.textContent = 0;
  }
 }


});


