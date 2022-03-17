import { toDos } from './todo.js';

const inputText: HTMLElement = document.getElementById('input');
const todoListView: HTMLElement = document.querySelector('ul');
const itemLeft: HTMLElement = document.getElementById('item-left');
const clearAll: HTMLElement = document.getElementById('clear-completed');
const checkAll: HTMLElement = document.getElementById('label-check-all');
const findAll: HTMLElement = document.getElementById('find-all');
const findActive: HTMLElement = document.getElementById('find-active');
const findComplete: HTMLElement = document.getElementById('find-complete');

var listToDos = [];

//function remove item and check todo
todoListView.addEventListener('click', (event: MouseEvent): void => {
  if ((event.target as HTMLTextAreaElement).classList.contains('remove')) {
    (event.target as HTMLTextAreaElement).parentElement.remove();
    setCount();
  }
  if ((event.target as HTMLTextAreaElement).classList.contains('check')) {
    setCount();
  }
});

todoListView.addEventListener('keypress', (event: KeyboardEvent): void => {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
});

function setCount(): void {
  var allItemView = document.querySelectorAll("div[class='view']");
  var listLabel = [];
  allItemView.forEach((element) => {
    listLabel.push(element.textContent);
  });
  var checkNumber: number = document.querySelectorAll('div input[type="checkbox"]:checked').length;
  var allCheckBox: number = document.getElementsByClassName('check').length;
  itemLeft.innerHTML = (allCheckBox - checkNumber).toString();
  if (checkNumber != 0) {
    clearAll.classList.remove('hidden');
  } else {
    clearAll.classList.add('hidden');
  }
  checkItemLeft();
}

function checkItemLeft(): void {
  var element: HTMLElement = document.getElementById('footer');
  var checkNumber: number = document.querySelectorAll('div input[type="checkbox"]:checked').length;
  var itemLeftText: String = document.getElementById('item-left').innerHTML;
  if (itemLeftText !== '0') {
    element.classList.remove('hidden');
    checkAll.classList.remove('hidden');
  }
  if (itemLeftText === '0' && checkNumber === 0) {
    element.classList.add('hidden');
    checkAll.classList.add('hidden');
  }
}

inputText.addEventListener('keypress', (event: KeyboardEvent): void => {
  addItem(event);
});

function addItem(event: KeyboardEvent): void {
  var valueInput: string = (<HTMLInputElement>document.getElementById('input')).value;
  var letterNumber = /^[ ]+$/;
  if (event.keyCode == 13 && valueInput.match(letterNumber) == null && valueInput.length != 0) {
    var newItem: string = `<div class="view">
        <input class="check" type="checkbox" id="btnCheck">
        <label  id="text-label" contenteditable="true">${valueInput}</label>
        <button class="remove"></button>
        </div>`;
    var element: any = document.createElement('li');
    element.innerHTML = newItem;
    document.querySelector('input').value = '';
    todoListView.appendChild(element);
    setCount();
  }
}

function removeItem(element: Element): void {
  element.remove();
  setCount();
}

document.querySelector('.clear-completed').addEventListener('click', (): void => {
  document.querySelectorAll('div input[type="checkbox"]:checked').forEach((item) => {
    removeItem(item.closest('li'));
  });
  checkItemLeft();
});

findAll.addEventListener('click', (event: MouseEvent): void => {
  var allItems: NodeListOf<HTMLLIElement> = todoListView.querySelectorAll('li');
  allItems.forEach((item) => {
    item.classList.remove('hidden');
  });
  changeSelectFilter('find-all');
});

findActive.addEventListener('click', (event: MouseEvent): void => {
  var allItems: NodeListOf<HTMLLIElement> = todoListView.querySelectorAll('li');
  allItems.forEach((item) => {
    item.querySelector(':checked') ? item.classList.add('hidden') : item.classList.remove('hidden');
  });
  changeSelectFilter('find-active');
});

findComplete.addEventListener('click', (event: MouseEvent): void => {
  var allItems: NodeListOf<HTMLLIElement> = todoListView.querySelectorAll('li');
  allItems.forEach((item) => {
    item.querySelector(':checked') ? item.classList.remove('hidden') : item.classList.add('hidden');
  });
  changeSelectFilter('find-complete');
});

function changeSelectFilter(choose: String): void {
  var active: HTMLElement = document.getElementById('find-active');
  var complete: HTMLElement = document.getElementById('find-complete');
  var all: HTMLElement = document.getElementById('find-all');
  if (choose == 'find-active') {
    active.classList.add('selected');
    complete.classList.remove('selected');
    all.classList.remove('selected');
  }
  if (choose == 'find-all') {
    active.classList.remove('selected');
    complete.classList.remove('selected');
    all.classList.add('selected');
  }
  if (choose == 'find-complete') {
    active.classList.remove('selected');
    complete.classList.add('selected');
    all.classList.remove('selected');
  }
}

document.getElementById('label-check-all').addEventListener('click', (): void => {
  var allCheckbox: NodeListOf<Element> = document.querySelectorAll('input[type=checkbox]');
  allCheckbox.forEach((element) => {
    (element as HTMLInputElement).checked = true;
  });
  setCount();
});

window.onload = (event) => {
  var toDosInLocalStorage = window.localStorage.getItem('toDos');

  if (toDosInLocalStorage == null) {
  } else {
    JSON.parse(toDosInLocalStorage).forEach((element) => {
      listToDos.push(element);
    });

    listToDos.forEach((element) => {
      var card = document.createElement('li');
      var divView = document.createElement('div');
      var inputCheck = document.createElement('input');
      var lbText = document.createElement('label');
      var btnRemove = document.createElement('button');

      divView.classList.add('view');
      inputCheck.classList.add('check');
      btnRemove.classList.add('remove');

      inputCheck.setAttribute('type', 'checkbox');
      inputCheck.setAttribute('id', 'btnCheck');
      lbText.setAttribute('id', 'text-label');
      lbText.setAttribute('contenteditable', 'true');

      lbText.textContent = element.item;
      if (element.isComplete) {
        inputCheck.setAttribute('checked', 'checked');
      }

      divView.appendChild(inputCheck);
      divView.appendChild(lbText);
      divView.appendChild(btnRemove);
      card.appendChild(divView);

      todoListView.appendChild(card);
    });
    setCount();
  }
};

window.onbeforeunload = (event) => {
  var allItemView = document.querySelectorAll("div[class='view']");
  listToDos = [];
  if (allItemView.length == 0) {
    localStorage.clear();
  }
  allItemView.forEach((element) => {
    var isComplete: boolean = false;
    if (element.querySelector(':checked')) {
      isComplete = true;
    }
    var todo = new toDos(element.textContent, isComplete);
    listToDos.push(todo);
    localStorage.setItem('toDos', JSON.stringify(listToDos));
  });
};
