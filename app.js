document.addEventListener('DOMContentLoaded', function() {

// Select all Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//declare the class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-o";
const LINE_THROUGH = "listThrought";

//variables 
let LIST = [] 
, id = 0;


// get item from Local Storage
let data = localStorage.getItem("TODO");
//check if data is not emplty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one in the list
    loadList(LIST); // load the list to user interface
}else{
    //if data isn't emplty
    LIST = [];
    id = 0;
}
//load items to user interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash)
    });
}

//clear the localstorage 
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//today's date
const options = {weekday: "long", year: "numeric", month: "long", day: "numeric" };
const today = new Date()
dateElement.innerHTML = today.toLocaleString("ro-RO", options)

//to do function
function addToDo(toDo, id, done, trash) {

    if(trash){return};

    const DONE = done ? CHECK : UNCHECK;

    const LINE = done ? LINE_THROUGH : "";

    const item = ` <li class="item">
                        <i class=" fa ${DONE}" job="complete" id="${id}"></i>
                        <p class="text ${LINE}"> ${toDo}</p>
                        <i class="fa fa-trash-o" job="delete" id="${id}"></i>
                    </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
};

//add item 
document.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        const toDo = input.value;

        //if empty
        if(toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id : id,
                done : false,
                trash : false,
            });

            // add item to localstorage ( any places we update the LIST)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++; //increment the id
        }
        input.value = ""; //clear the input
    }
});

//complate to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function deleteToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; //return the clicked element inside list
    const elementJob = element.attributes.job.value; //delete or complete
    if(elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete"){
        deleteToDo(element);
    }
    // add item to localstorage ( any places we update the LIST)
    localStorage.setItem("TODO", JSON.stringify(LIST));

});

});