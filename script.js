// define UI variables
// gdget
const form = document.querySelector("#form"),
  taskList = document.querySelector(".collection"),
  clearBtn = document.querySelector(".clear-tasks"),
  filter = document.querySelector("#filter"),
  taskInput = document.querySelector("#task"),
  sdate = document.querySelector("#date"),
  stime = document.querySelector("#time");

let myDate = new Date(sdate.value);
let myTime = stime.value;
console.log(myTime);
formatedDate =
  myDate.getDate() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getFullYear();

// console.log(formatedDate);

// Load all event listeners

loadEventListeners();

// function loadEventListeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);

  // Add task event listener
  form.addEventListener("submit", addTask);

  // Remove task event
  taskList.addEventListener("click", removeTask);

  // Done Task
  taskList.addEventListener("click", doneTask);

  // Clear Task even

  clearBtn.addEventListener("click", clearTasks);

  // FIlter through task event
  filter.addEventListener("keyup", filterTask);
}

// Get tasks from ls
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    taskList.innerHTML = task;
  });
}

// function add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("add a task");
  } else {
    // create a span element for date
    const span = document.createElement("span");
    span.className = " dt-2";
    span.innerHTML = formatedDate;
    // console.log(span);

    // create another span
    const tspan = document.createElement("span");
    tspan.className = "dt-2";
    tspan.innerHTML = myTime;

    // create li element
    const li = document.createElement("li");

    // add class to li
    li.className = "collection-item";

    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    li.appendChild(span);
    li.appendChild(tspan);

    // create a new link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content top";
    // add icon
    link.innerHTML = '<i class="ri-close-circle-line"></i>  ';

    // append link to li
    li.appendChild(link);

    // create a new link element
    const link2 = document.createElement("a");
    link2.className = "done-item secondary-content down";
    // add icon
    link2.innerHTML = '<i class="ri-check-line"></i>  ';

    li.appendChild(link2);

    // Append li to ul
    taskList.appendChild(li);

    // let getTask = taskInput.value.concat(" ", formatedDate, " ", myTime);
    // console.log(getTask);

    // Store in Local storage
    storeTaskInLocalStorage(taskList.innerHTML);

    taskInput.value = "";
    // sdate.value = "";
    // stime.value = "";
  }

  e.preventDefault();
}

// store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// remove task

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    // console.log(e.target.parentElement.parentElement.parentElement.innerHTML);
    if (confirm("Are You Sure?")) {
      // remove from ls
      removeTaskFromLocalStorage(
        e.target.parentElement.parentElement.parentElement.innerHTML
      );
      e.target.parentElement.parentElement.remove();
    }
  }
}

// remove task from ls
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear tasks
function clearTasks(e) {
  if (confirm("Do you Really Want to clear this list?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }

  // Clear from LS
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Done Task
function doneTask(e) {
  if (e.target.parentElement.classList.contains("done-item")) {
    e.target.parentElement.parentElement.classList.add("strike");

    // console.log(e.target.parentElement.parentElements.innerHTML);

    storeTaskInLocalStorage(
      e.target.parentElement.parentElement.parentElement.innerHTML
    );
  }
}

function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    console.log(item);
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
  e.preventDefault;
}

// USE TASKLIST.INNERHTML TO SEE
