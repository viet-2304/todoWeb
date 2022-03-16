const todoList: HTMLElement = document.querySelector("ul");
const itemLeft: HTMLElement = document.getElementById("item-left");
const clearAll: HTMLElement = document.getElementById("clear-completed");
const checkAll: HTMLElement = document.getElementById("label-check-all");
const listToDos = [];
var dataInLocalStorage: string;
todoList.addEventListener("click", (event: MouseEvent): void => {
  if ((event.target as HTMLTextAreaElement).classList.contains("remove")) {
    (event.target as HTMLTextAreaElement).parentElement.remove();
    setCount();
  }
  if ((event.target as HTMLTextAreaElement).classList.contains("check")) {
    setCount();
  }
});
todoList.addEventListener("keypress", (event: KeyboardEvent): void => {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
});
function setCount(): void {
  var checkNumber: number = document.querySelectorAll(
    'div input[type="checkbox"]:checked'
  ).length;
  var allCheckBox: number = document.getElementsByClassName("check").length;
  itemLeft.innerHTML = (allCheckBox - checkNumber).toString();
  if (checkNumber != 0) {
    clearAll.classList.remove("hidden");
  } else {
    clearAll.classList.add("hidden");
  }
  checkItemLeft();
}
function checkItemLeft(): void {
  var element: HTMLElement = document.getElementById("footer");
  var checkNumber: number = document.querySelectorAll(
    'div input[type="checkbox"]:checked'
  ).length;
  var itemLeftText: String = document.getElementById("item-left").innerHTML;
  if (itemLeftText !== "0") {
    element.classList.remove("hidden");
    checkAll.classList.remove("hidden");
  }
  if (itemLeftText === "0" && checkNumber === 0) {
    element.classList.add("hidden");
    checkAll.classList.add("hidden");
  }
}
function addItem(event: KeyboardEvent): void {
  var valueInput: String = (<HTMLInputElement>document.getElementById("input"))
    .value;
  var todoList: HTMLElement = document.querySelector("ul");
  var letterNumber = /^[ ]+$/;
  if (
    event.keyCode == 13 &&
    valueInput.match(letterNumber) == null &&
    valueInput.length != 0
  ) {
    var newItem: string = `<div class="view">
        <input class="check" type="checkbox" id="btnCheck">
        <label  id="text-label" contenteditable="true">${valueInput}</label>
        <button class="remove"></button>
        </div>
        <input id="edit" type="text" class="edit hidden" value=''>`;
    var element: any = document.createElement("li");
    element.innerHTML = newItem;
    document.querySelector("input").value = "";
    todoList.appendChild(element);
    saveToDos({ item: valueInput, isComplete: "false" });
    setCount();
  }
}
function removeItem(element: Element): void {
  element.remove();
  setCount();
}
document
  .querySelector(".clear-completed")
  .addEventListener("click", (): void => {
    document
      .querySelectorAll('div input[type="checkbox"]:checked')
      .forEach((item) => {
        removeItem(item.closest("li"));
      });
    checkItemLeft();
  });
function findAll(): void {
  var allItems: NodeListOf<HTMLLIElement> = todoList.querySelectorAll("li");
  allItems.forEach((item) => {
    item.classList.remove("hidden");
  });
  changeSelectFilter("find-all");
}
function findActive(): void {
  var allItems: NodeListOf<HTMLLIElement> = todoList.querySelectorAll("li");
  allItems.forEach((item) => {
    item.querySelector(":checked")
      ? item.classList.add("hidden")
      : item.classList.remove("hidden");
  });
  changeSelectFilter("find-active");
}
function findComplete(): void {
  var allItems: NodeListOf<HTMLLIElement> = todoList.querySelectorAll("li");
  allItems.forEach((item) => {
    item.querySelector(":checked")
      ? item.classList.remove("hidden")
      : item.classList.add("hidden");
  });
  changeSelectFilter("find-complete");
}
function changeSelectFilter(choose: String): void {
  var active: HTMLElement = document.getElementById("find-active");
  var complete: HTMLElement = document.getElementById("find-complete");
  var all: HTMLElement = document.getElementById("find-all");
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
  .addEventListener("click", (): void => {
    var allCheckbox: NodeListOf<Element> = document.querySelectorAll(
      "input[type=checkbox]"
    );
    allCheckbox.forEach((element) => {
      (element as HTMLInputElement).checked = true;
    });
    setCount();
  });

const toDos: object = [
  {
    name: "",
    isComplete: "",
  },
];

function saveToDos(toDos: object): void {
  listToDos.push(toDos);
  window.localStorage.setItem("toDos", JSON.stringify(listToDos));
}

function changeState(position: number, state: boolean): void {
  var count: number = 0;
  console.log(listToDos.indexOf(position));
}

function getLocalStorage(): string {
  return window.localStorage.getItem("toDos");
}

window.onload = function () {
  var list = JSON.parse(window.localStorage.getItem("toDos"));
  console.log(getLocalStorage());
  dataInLocalStorage = getLocalStorage();
  if (list != null) {
    list.forEach((ele) => {
      var element: HTMLLIElement = document.createElement("li");
      var divView: HTMLDivElement = document.createElement("div");
      var inputCheck: HTMLInputElement = document.createElement("input");
      var lbText: HTMLLabelElement = document.createElement("label");
      var btRemove: HTMLButtonElement = document.createElement("button");

      divView.classList.add("view");
      inputCheck.classList.add("check");
      inputCheck.setAttribute("type", "checkbox");
      inputCheck.setAttribute("id", "btnCheck");
      inputCheck.setAttribute("onclick", "checkIsComplete()");
      if (ele.isComplete == "true") {
        inputCheck.checked = true;
      }
      lbText.setAttribute("id", "text-label");
      lbText.setAttribute("contenteditable", "true");
      lbText.textContent = ele.item;
      btRemove.classList.add("remove");

      divView.appendChild(inputCheck);
      divView.appendChild(lbText);
      divView.appendChild(btRemove);
      element.appendChild(divView);

      todoList.appendChild(element);
    });
    setCount();
  }
};

window.onbeforeunload = function () {
  var listData;
  if (dataInLocalStorage == null) {
    listData = window.localStorage.getItem("toDos");
  } else {
    listData = dataInLocalStorage.concat(
      JSON.stringify(window.localStorage.getItem("toDos"))
    );
  }
  window.localStorage.setItem("toDos", listData);
};
