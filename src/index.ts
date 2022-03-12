const todoList = document.querySelector("ul");
const itemLeft = document.getElementById("item-left");
const clearAll = document.getElementById("clear-completed");
const checkAll = document.getElementById("label-check-all");
todoList.addEventListener("click", (event) => {
    if ((event.target as HTMLTextAreaElement).classList.contains("remove")) {
        (event.target as HTMLTextAreaElement).parentElement.remove();
        setCount();
    }
    if ((event.target as HTMLTextAreaElement).classList.contains("check")) {
        setCount();
    }
});
todoList.addEventListener("keypress", (event) => {
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
    var valueInput = (<HTMLInputElement>document.getElementById("input")).value;
    var todoList = document.querySelector("ul");
    var letterNumber = /^[ ]+$/;
    if (event.keyCode == 13 &&
        valueInput.match(letterNumber) == null &&
        valueInput.length != 0) {
        var element = document.createElement("li");
        element.innerHTML = `<div class="view">
        <input class="check" type="checkbox" id="btnCheck">
        <label  id="text-label" contenteditable="true">${valueInput}</label>
        <button class="remove"></button>
        </div>
        <input id="edit" type="text" class="edit hidden" value=''>`;
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
        .querySelectorAll('div input[type="checkbox"]:checked')
        .forEach((item) => {
        removeItem(item.closest("li"));
    });
    checkItemLeft();
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
        (element as HTMLInputElement).checked = true;
    });
    setCount();
});