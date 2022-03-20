import { toDo } from './class/toDo.js';

class toDoApp {
  private listToDo = [];

  constructor() {
    this.dataInit();
  }

  dataInit(): void {
    this.renderForm();
    this.renderData();
  }

  renderData(): void {
    const data = JSON.parse(localStorage.getItem('toDos'));
    if (data != null) {
      data.forEach((element) => {
        this.createNewItem(element.item, element.isComplete);
      });
      this.setCount();
      this.checkItemLeft();
    }
  }

  renderForm(): void {
    var data = JSON.parse(localStorage.getItem('toDos'));
    if (data != null) {
      data.forEach((element) => {
        this.listToDo.push(element);
      });
    } else {
      this.listToDo = [];
    }
    const input: HTMLElement = document.getElementById('input');
    input.addEventListener('keypress', (event: KeyboardEvent): void => {
      var valueInput: string = (<HTMLInputElement>input).value;
      console.log(valueInput);
      var letterNumber = /^[ ]+$/;
      if (event.keyCode == 13 && valueInput.match(letterNumber) == null && valueInput.length != 0) {
        this.createNewItem(valueInput, false);
        document.querySelector('input').value = '';
        this.addNewToDo(valueInput, false);
        this.setCount();
      }
    });

    this.findCompleteToDo();
    this.findAllToDo();
    this.findActiveToDo();
    this.clearAllComplete();
    this.checkAllToDo();
  }

  createNewItem(item: string, isComplete: boolean): void {
    var todoListView: HTMLElement = document.querySelector('ul');
    var card = document.createElement('li');
    var divView = document.createElement('div');
    var inputCheck = document.createElement('input');
    var lbText = document.createElement('label');
    var btnRemove = document.createElement('button');

    divView.classList.add('view');
    inputCheck.classList.add('check');
    btnRemove.classList.add('remove');
    btnRemove.addEventListener('click', (event: MouseEvent): void => {
      this.removeToDo((event.target as HTMLTextAreaElement).closest('li'));
      (event.target as HTMLTextAreaElement).closest('li').remove();
      this.setCount();
    });

    inputCheck.setAttribute('type', 'checkbox');
    inputCheck.setAttribute('id', 'btnCheck');
    inputCheck.addEventListener('click', (): void => {
      this.changeStateToDo((event.target as HTMLTextAreaElement).closest('li'));
      this.setCount();
    });
    lbText.setAttribute('id', 'text-label');
    lbText.setAttribute('contenteditable', 'true');
    lbText.textContent = item;
    if (isComplete) {
      inputCheck.setAttribute('checked', 'checked');
    }

    lbText.addEventListener('keypress', (event: KeyboardEvent): void => {
      if (event.keyCode === 13) {
        lbText.contentEditable = 'false';
        this.changeItemToDo((event.target as HTMLTextAreaElement).closest('li'));
        lbText.contentEditable = 'true';
      }
    });

    divView.appendChild(inputCheck);
    divView.appendChild(lbText);
    divView.appendChild(btnRemove);
    card.appendChild(divView);

    todoListView.appendChild(card);
  }

  //get index of element li in ul
  getIndexOfToDo(ele: HTMLElement): number {
    var nodes = Array.from(ele.closest('ul').children);
    var index = nodes.indexOf(ele);
    return index;
  }

  //get state of element li in ul (is complete or not)
  getStateOfToDo(ele: HTMLElement): boolean {
    return (<HTMLInputElement>ele.querySelector("input[type='checkbox']")).checked;
  }

  removeToDo(ele: HTMLElement) {
    for (let i: number = 0; i < this.listToDo.length; i++) {
      this.listToDo.splice(this.getIndexOfToDo(ele), 1);
      break;
    }
    this.saveToDo();
  }

  addNewToDo(item: string, state: boolean): void {
    const newtoDo = new toDo(item, state);
    this.listToDo.push(newtoDo);
    this.saveToDo();
  }

  changeStateToDo(ele: HTMLElement) {
    var state: boolean = this.getStateOfToDo(ele);
    var index: number = this.getIndexOfToDo(ele);
    this.listToDo[index].isComplete = state;
    this.saveToDo();
  }

  changeAllStateToDo(state: boolean) {
    this.listToDo.forEach((element) => {
      element.isComplete = state;
    });
    this.saveToDo();
  }

  changeItemToDo(ele: HTMLElement) {
    var valueChange = ele.querySelector('label').innerHTML;
    var index: number = this.getIndexOfToDo(ele);
    this.listToDo[index].item = valueChange;
    this.saveToDo();
  }

  saveToDo(): void {
    localStorage.setItem('toDos', JSON.stringify(this.listToDo));
  }

  checkItemLeft(): void {
    var checkAll: HTMLElement = document.getElementById('label-check-all');
    var element: HTMLElement = document.getElementById('footer');
    var checkNumber: number = document.querySelectorAll('ul[id="todo-list"] li').length;
    var itemLeftText: String = document.getElementById('item-left').innerHTML;
    if (itemLeftText !== '0' || checkNumber !== 0) {
      element.classList.remove('hidden');
      checkAll.classList.remove('hidden');
    }
    if (itemLeftText === '0' && checkNumber === 0) {
      element.classList.add('hidden');
      checkAll.classList.add('hidden');
    }
  }

  setCount(): void {
    var itemLeft: HTMLElement = document.getElementById('item-left');
    var clearAll: HTMLElement = document.getElementById('clear-completed');
    var allItemView = document.querySelectorAll("div[class='view']");
    var listLabel = [];
    allItemView.forEach((element) => {
      listLabel.push(element.textContent);
    });
    var checkNumber: number = document.querySelectorAll(
      'div input[type="checkbox"]:checked'
    ).length;
    var allCheckBox: number = document.getElementsByClassName('check').length;
    itemLeft.innerHTML = (allCheckBox - checkNumber).toString();
    if (checkNumber != 0) {
      clearAll.classList.remove('hidden');
    } else {
      clearAll.classList.add('hidden');
    }
    this.checkItemLeft();
  }
  //change UI when find todo active or complete or find all
  changeSelectFilter(choose: String): void {
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

  findAllToDo(): void {
    const findAll: HTMLElement = document.getElementById('find-all');
    findAll.addEventListener('click', () => {
      var allItems: NodeListOf<HTMLLIElement> = document.querySelectorAll('ul[id="todo-list"] li');
      allItems.forEach((item) => {
        item.classList.remove('hidden');
      });
      this.changeSelectFilter('find-all');
    });
  }

  findActiveToDo(): void {
    const findActive: HTMLElement = document.getElementById('find-active');
    findActive.addEventListener('click', (): void => {
      var allItems: NodeListOf<HTMLLIElement> = document.querySelectorAll('ul[id="todo-list"] li');
      console.log(allItems);
      allItems.forEach((item) => {
        item.querySelector(':checked')
          ? item.classList.add('hidden')
          : item.classList.remove('hidden');
      });
      this.changeSelectFilter('find-active');
    });
  }

  findCompleteToDo(): void {
    var allComplete = document.getElementById('find-complete');
    allComplete.addEventListener('click', (): void => {
      var allItems: NodeListOf<HTMLLIElement> = document.querySelectorAll('ul[id="todo-list"] li');
      allItems.forEach((item) => {
        item.querySelector(':checked')
          ? item.classList.remove('hidden')
          : item.classList.add('hidden');
      });
      this.changeSelectFilter('find-complete');
    });
  }

  checkAllToDo(): void {
    var checkAllItem = document.getElementById('label-check-all');
    checkAllItem.addEventListener('click', (): void => {
      var allCheckbox: NodeListOf<Element> = document.querySelectorAll('input[type=checkbox]');
      if (this.checkIfToDoIsComplete()) {
        allCheckbox.forEach((element) => {
          (element as HTMLInputElement).checked = false;
          this.changeAllStateToDo(false);
        });
      } else {
        allCheckbox.forEach((element) => {
          (element as HTMLInputElement).checked = true;
          this.changeAllStateToDo(true);
        });
      }
      this.setCount();
    });
  }

  //If have any todo isn't complete => return false
  checkIfToDoIsComplete(): boolean {
    var allCheckbox: NodeListOf<Element> = document.querySelectorAll('div input[type=checkbox]');
    for (let element of allCheckbox) {
      if ((element as HTMLInputElement).checked == false) {
        return false;
      }
    }
    return true;
  }

  clearAllComplete(): void {
    var clearAllComplete = document.getElementById('clear-completed');
    clearAllComplete.addEventListener('click', (): void => {
      document.querySelectorAll('div input[type="checkbox"]:checked').forEach((item) => {
        this.removeToDo(item.closest('li'));
        item.closest('li').remove();
      });
      this.setCount();
      this.checkItemLeft();
    });
  }
}

const todos = new toDoApp();
export {};
