let captionsList = document.querySelectorAll(".caption-item");
let unitsList = document.querySelectorAll(".unit");

captionsList.forEach(function (item, index) {
  item.addEventListener("mouseover", function () {
    unitsList[index].classList.add("hovered");
  });

  item.addEventListener("mouseout", function () {
    unitsList[index].classList.remove("hovered");
  });
});

// добавление и удаление

const addBtn = document.querySelector("#addBtn");
const taskInput = document.querySelector("#taskInput");
const list = document.querySelector("#list");
let tasks = [];

if (localStorage.getItem("tasksLS")) {
  tasks = JSON.parse(localStorage.getItem("tasksLS"));
}

tasks.forEach((task) => {
  const cssClass = task.complete ? "item done" : "item";
  // list.insertAdjacentHTML(
  //   "beforeend",
  //   `<li class="${cssClass}" id="${task.id}">
  //       ${task.Text}
  //       <div class="btns">
  //         <i class="fa-regular fa-square-plus" data-action="complete"></i>
  //         <i class="fa-sharp fa-solid fa-trash" data-action="delete"></i>
  //       </div>
  //     </li>`
  // );
});

// list.addEventListener("click", function (event) {
//   target = event.target;
//   if (target.dataset.action == "complete") {
//     completeBtn(target);
//   }
//   if (target.dataset.action == "delete") {
//     removeTask(target);
//   }
//   WriteLS();
// });

addBtn.addEventListener("click", function () {
  const newItem = document.createElement("li");
  addTask(newItem);
  // list.append(newItem);
  taskInput.value = "";
  WriteLS();
});

function addTask(newItem) {
  newItem.classList.add("item");
  newItem.textContent = taskInput.value;
  const itemBtns = document.createElement("div");
  newItem.append(itemBtns);
  itemBtns.className = "item_btns";

  const doneBtn = document.createElement("i");
  doneBtn.className = "fa-regular fa-square-plus";
  itemBtns.append(doneBtn);
  doneBtn.setAttribute("data-action", "complete");

  const deleteButton = document.createElement("i");
  deleteButton.className = "fa-sharp fa-solid fa-trash";
  itemBtns.append(deleteButton);
  deleteButton.setAttribute("data-action", "delete");

  let newTask = {
    id: Date.now(),
    Text: taskInput.value,
    complete: false,
  };

  tasks.push(newTask);
  newItem.setAttribute("id", newTask.id);
}

function completeBtn(target) {
  target.closest("li").classList.toggle("done");
  let currentID = target.closest("li").id;

  const index = tasks.findIndex(function (task) {
    return task.id == currentID;
  });

  if (tasks[index].complete == false) {
    tasks[index].complete = true;
  } else {
    tasks[index].complete = false;
  }
}

function removeTask(target) {
  target.closest("li").remove();
  taskInput.value = "";

  const index = tasks.findIndex((tasks) => {
    return tasks.id == target.closest("li").id;
  });

  tasks.splice(index, 1);
}

function WriteLS() {
  localStorage.setItem("tasksLS", JSON.stringify(tasks));
}
