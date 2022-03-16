"use strict";
exports.__esModule = true;
var todoList = document.querySelector("ul");
var itemLeft = document.getElementById("item-left");
var clearAll = document.getElementById("clear-completed");
var checkAll = document.getElementById("label-check-all");
var listToDos = [];
var dataInLocalStorage;
todoList.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove")) {
        event.target.parentElement.remove();
        setCount();
    }
    if (event.target.classList.contains("check")) {
        setCount();
    }
});
todoList.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
    }
});
function setCount() {
    var checkNumber = document.querySelectorAll('div input[type="checkbox"]:checked').length;
    var allCheckBox = document.getElementsByClassName("check").length;
    itemLeft.innerHTML = (allCheckBox - checkNumber).toString();
    if (checkNumber != 0) {
        clearAll.classList.remove("hidden");
    }
    else {
        clearAll.classList.add("hidden");
    }
    checkItemLeft();
}
function checkItemLeft() {
    var element = document.getElementById("footer");
    var checkNumber = document.querySelectorAll('div input[type="checkbox"]:checked').length;
    var itemLeftText = document.getElementById("item-left").innerHTML;
    if (itemLeftText !== "0") {
        element.classList.remove("hidden");
        checkAll.classList.remove("hidden");
    }
    if (itemLeftText === "0" && checkNumber === 0) {
        element.classList.add("hidden");
        checkAll.classList.add("hidden");
    }
}
function addItem(event) {
    var valueInput = document.getElementById("input").value;
    console.log(valueInput);
    var todoList = document.querySelector("ul");
    var letterNumber = /^[ ]+$/;
    if (event.keyCode == 13 &&
        valueInput.match(letterNumber) == null &&
        valueInput.length != 0) {
        var newItem = "<div class=\"view\">\n        <input class=\"check\" type=\"checkbox\" id=\"btnCheck\">\n        <label  id=\"text-label\" contenteditable=\"true\">".concat(valueInput, "</label>\n        <button class=\"remove\"></button>\n        </div>\n        <input id=\"edit\" type=\"text\" class=\"edit hidden\" value=''>");
        var element = document.createElement("li");
        element.innerHTML = newItem;
        document.querySelector("input").value = "";
        todoList.appendChild(element);
        setCount();
    }
}
function removeItem(element) {
    element.remove();
    setCount();
}
document
    .querySelector(".clear-completed")
    .addEventListener("click", function () {
    document
        .querySelectorAll('div input[type="checkbox"]:checked')
        .forEach(function (item) {
        removeItem(item.closest("li"));
    });
    checkItemLeft();
});
function findAll() {
    var allItems = todoList.querySelectorAll("li");
    allItems.forEach(function (item) {
        item.classList.remove("hidden");
    });
    changeSelectFilter("find-all");
}
function findActive() {
    var allItems = todoList.querySelectorAll("li");
    allItems.forEach(function (item) {
        item.querySelector(":checked")
            ? item.classList.add("hidden")
            : item.classList.remove("hidden");
    });
    changeSelectFilter("find-active");
}
function findComplete() {
    var allItems = todoList.querySelectorAll("li");
    allItems.forEach(function (item) {
        item.querySelector(":checked")
            ? item.classList.remove("hidden")
            : item.classList.add("hidden");
    });
    changeSelectFilter("find-complete");
}
function changeSelectFilter(choose) {
    var active = document.getElementById("find-active");
    var complete = document.getElementById("find-complete");
    var all = document.getElementById("find-all");
    if (choose == "find-active") {
        active.classList.add("selected");
        complete.classList.remove("selected");
        all.classList.remove("selected");
    }
    if (choose == "find-all") {
        active.classList.remove("selected");
        complete.classList.remove("selected");
        all.classList.add("selected");
    }
    if (choose == "find-complete") {
        active.classList.remove("selected");
        complete.classList.add("selected");
        all.classList.remove("selected");
    }
}
document
    .getElementById("label-check-all")
    .addEventListener("click", function () {
    var allCheckbox = document.querySelectorAll("input[type=checkbox]");
    allCheckbox.forEach(function (element) {
        element.checked = true;
    });
    setCount();
});
var todo_js_1 = require("./todo.js");
function saveToDos(item, isComplete) {
    var todo = new todo_js_1["default"](item, isComplete);
    listToDos.push(todo);
    window.localStorage.setItem("toDos", JSON.stringify(listToDos));
}
function changeState(position, state) {
    var count = 0;
    console.log(listToDos.indexOf(position));
}
function getLocalStorage() {
    return window.localStorage.getItem("toDos");
}
// window.onload = function () {
//   var list = JSON.parse(window.localStorage.getItem("toDos"));
//   console.log(getLocalStorage());
//   dataInLocalStorage = getLocalStorage();
//   if (list != null) {
//     list.forEach((ele) => {
//       var element: HTMLLIElement = document.createElement("li");
//       var divView: HTMLDivElement = document.createElement("div");
//       var inputCheck: HTMLInputElement = document.createElement("input");
//       var lbText: HTMLLabelElement = document.createElement("label");
//       var btRemove: HTMLButtonElement = document.createElement("button");
//       divView.classList.add("view");
//       inputCheck.classList.add("check");
//       inputCheck.setAttribute("type", "checkbox");
//       inputCheck.setAttribute("id", "btnCheck");
//       inputCheck.setAttribute("onclick", "checkIsComplete()");
//       if (ele.isComplete == "true") {
//         inputCheck.checked = true;
//       }
//       lbText.setAttribute("id", "text-label");
//       lbText.setAttribute("contenteditable", "true");
//       lbText.textContent = ele.item;
//       btRemove.classList.add("remove");
//       divView.appendChild(inputCheck);
//       divView.appendChild(lbText);
//       divView.appendChild(btRemove);
//       element.appendChild(divView);
//       todoList.appendChild(element);
//     });
//     setCount();
//   }
// };
// window.onbeforeunload = function () {
//   var listData;
//   if (dataInLocalStorage == null) {
//     listData = window.localStorage.getItem("toDos");
//   } else {
//     listData = dataInLocalStorage.concat(
//       JSON.stringify(window.localStorage.getItem("toDos"))
//     );
//   }
//   window.localStorage.setItem("toDos", listData);
// };
