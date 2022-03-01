const todoList = document.querySelector("ul");
const itemLeft = document.getElementById("item-left");

todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove")) {
    event.target.parentElement.remove();
    setCount();
  }
  if (event.target.classList.contains("check")) {
    setCount();
  }
});

function setCount() {
  var checkNumber = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  ).length;
  var allCheckBox = document.getElementsByClassName("check").length;
  itemLeft.innerHTML = allCheckBox - checkNumber;
  if (checkNumber != 0) {
    document.getElementById("clear-completed").classList.remove("hidden");
  } else {
    document.getElementById("clear-completed").classList.add("hidden");
  }
  checkItemLeft();
}

function checkItemLeft() {
  var element = document.getElementById("footer");
  var checkNumber = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  ).length;
  var itemLeftText = document.getElementById("item-left").innerHTML;
  if (itemLeftText !== "0") {
    element.classList.remove("hidden");
    document.getElementById("label-check-all").classList.remove("hidden");
  }
  if (itemLeftText === "0" && checkNumber === 0) {
    element.classList.add("hidden");
    document.getElementById("label-check-all").classList.add("hidden");
  }
}

function addItem(event) {
  var todoList = document.querySelector("ul");
  if (event.keyCode == 13) {
    var valueInput = document.getElementById("input").value;
    var element = document.createElement("li");
    element.innerHTML = `<div class="view">
        <input class="check" type="checkbox" id="btnCheck">
        <label>${valueInput}</label>
        <button class="remove" onclick="removeTodoItem()"></button>
        </div>`;
    document.querySelector("input").value = "";
    todoList.appendChild(element);
    setCount();
  }
}

function removeItem(element) {
  element.remove();
  setCount();
}

document.querySelector(".clear-completed").addEventListener("click", () => {
  document
    .querySelectorAll('input[type="checkbox"]:checked')
    .forEach((item) => {
      removeItem(item.closest("li"));
    });
});

function findAll() {
  var allItems = todoList.querySelectorAll("li");
  allItems.forEach((item) => {
    item.classList.remove("hidden");
  });
}

function findActive() {
  var allItems = todoList.querySelectorAll("li");
  allItems.forEach((item) => {
    item.querySelector(":checked")
      ? item.classList.add("hidden")
      : item.classList.remove("hidden");
  });
}

function findComplete() {
  var allItems = todoList.querySelectorAll("li");
  allItems.forEach((item) => {
    item.querySelector(":checked")
      ? item.classList.remove("hidden")
      : item.classList.add("hidden");
  });
}

document.getElementById("label-check-all").addEventListener("click", () => {
  var allCheckbox = document.querySelectorAll("input[type=checkbox]");
  allCheckbox.forEach((element) => {
    element.checked = true;
  });
});
