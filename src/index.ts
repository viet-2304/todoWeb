const todoList: any = document.querySelector("ul");
const itemLeft: any = document.getElementById("item-left");
const clearAll: any = document.getElementById("clear-completed");
const checkAll: any = document.getElementById("label-check-all");
todoList.addEventListener("click", (event: MouseEvent) : void => {
    if ((event.target as HTMLTextAreaElement).classList.contains("remove")) {
        (event.target as HTMLTextAreaElement).parentElement.remove();
        setCount();
    }
    if ((event.target as HTMLTextAreaElement).classList.contains("check")) {
        setCount();
    }
});
todoList.addEventListener("keypress", (event: KeyboardEvent) : void => {
    if (event.keyCode === 13) {
        event.preventDefault();
    }
});
function setCount() : void {
    var checkNumber: any = document.querySelectorAll('div input[type="checkbox"]:checked').length;
    var allCheckBox: any = document.getElementsByClassName("check").length;
    itemLeft.innerHTML = (allCheckBox - checkNumber).toString();
    if (checkNumber != 0) {
        clearAll.classList.remove("hidden");
    }
    else {
        clearAll.classList.add("hidden");
    }
    checkItemLeft();
}
function checkItemLeft() : void{
    var element: any = document.getElementById("footer");
    var checkNumber: any = document.querySelectorAll('div input[type="checkbox"]:checked').length;
    var itemLeftText: any = document.getElementById("item-left").innerHTML;
    if (itemLeftText !== "0") {
        element.classList.remove("hidden");
        checkAll.classList.remove("hidden");
    }
    if (itemLeftText === "0" && checkNumber === 0) {
        element.classList.add("hidden");
        checkAll.classList.add("hidden");
    }
}
function addItem(event: KeyboardEvent) : void {
    var valueInput: String = (<HTMLInputElement>document.getElementById("input")).value;
    var todoList: any = document.querySelector("ul");
    var letterNumber = /^[ ]+$/;
    if (event.keyCode == 13 &&
        valueInput.match(letterNumber) == null &&
        valueInput.length != 0) {
        var element: any = document.createElement("li");
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
function removeItem(element: Element) : void {
    element.remove();
    setCount();
}
document.querySelector(".clear-completed").addEventListener("click", () : void => {
    document
        .querySelectorAll('div input[type="checkbox"]:checked')
        .forEach((item) => {
        removeItem(item.closest("li"));
    });
    checkItemLeft();
});
function findAll() : void{
    var allItems = todoList.querySelectorAll("li");
    allItems.forEach((item) => {
        item.classList.remove("hidden");
    });
}
function findActive() : void {
    var allItems: any = todoList.querySelectorAll("li");
    allItems.forEach((item) => {
        item.querySelector(":checked")
            ? item.classList.add("hidden")
            : item.classList.remove("hidden");
    });
}
function findComplete() : void {
    var allItems: any = todoList.querySelectorAll("li");
    allItems.forEach((item) => {
        item.querySelector(":checked")
            ? item.classList.remove("hidden")
            : item.classList.add("hidden");
    });
}
document.getElementById("label-check-all").addEventListener("click", () : void => {
    var allCheckbox: any = document.querySelectorAll("input[type=checkbox]");
    allCheckbox.forEach((element) => {
        (element as HTMLInputElement).checked = true;
    });
    setCount();
});