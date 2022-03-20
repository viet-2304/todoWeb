import { toDo } from './class/toDo.js';
class toDoApp {
    constructor() {
        this.listToDo = [];
        this.dataInit();
    }
    dataInit() {
        this.renderForm();
        this.renderData();
    }
    renderData() {
        const data = JSON.parse(localStorage.getItem('toDos'));
        if (data != null) {
            this.listToDo = data;
            console.log(typeof (this.listToDo));
            data.forEach((element) => {
                this.createNewItem(element.item, element.isComplete);
            });
            this.setCount();
            this.checkItemLeft();
        }
    }
    renderForm() {
        const input = document.getElementById('input');
        input.addEventListener('keypress', (event) => {
            var valueInput = input.value;
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
    createNewItem(item, isComplete) {
        var toDoListView = document.querySelector('ul');
        var card = document.createElement('li');
        var divView = document.createElement('div');
        var inputCheck = document.createElement('input');
        var lbText = document.createElement('label');
        var btnRemove = document.createElement('button');
        divView.classList.add('view');
        inputCheck.classList.add('check');
        btnRemove.classList.add('remove');
        btnRemove.addEventListener('click', (event) => {
            this.removeToDo(event.target.closest('li'));
            event.target.closest('li').remove();
            this.setCount();
        });
        inputCheck.setAttribute('type', 'checkbox');
        inputCheck.setAttribute('id', 'btnCheck');
        inputCheck.addEventListener('click', () => {
            this.changeStateToDo(event.target.closest('li'));
            this.setCount();
        });
        lbText.setAttribute('id', 'text-label');
        lbText.setAttribute('contenteditable', 'true');
        lbText.textContent = item;
        if (isComplete) {
            inputCheck.setAttribute('checked', 'checked');
        }
        lbText.addEventListener('keypress', (event) => {
            if (event.keyCode === 13) {
                lbText.contentEditable = 'false';
                this.changeItemToDo(event.target.closest('li'));
                lbText.contentEditable = 'true';
            }
        });
        divView.appendChild(inputCheck);
        divView.appendChild(lbText);
        divView.appendChild(btnRemove);
        card.appendChild(divView);
        toDoListView.appendChild(card);
    }
    getIndexOfToDo(ele) {
        var nodes = Array.from(ele.closest('ul').children);
        var index = nodes.indexOf(ele);
        return index;
    }
    getStateOfToDo(ele) {
        return ele.querySelector("input[type='checkbox']").checked;
    }
    removeToDo(ele) {
        for (let i = 0; i < this.listToDo.length; i++) {
            this.listToDo.splice(this.getIndexOfToDo(ele), 1);
            break;
        }
        this.saveToDo();
    }
    addNewToDo(item, state) {
        const newToDo = new toDo(item, state);
        this.listToDo.push(newToDo);
        this.saveToDo();
    }
    changeStateToDo(ele) {
        var state = this.getStateOfToDo(ele);
        var index = this.getIndexOfToDo(ele);
        var todoChange = this.listToDo[index];
        // this.listToDo[index].isComplete =state;
        this.listToDo[index].getItem();
        console.log(this.listToDo[index].getItem());
        this.saveToDo();
    }
    changeAllStateToDo(state) {
        this.listToDo.forEach((element) => {
            element.setState(state);
        });
        this.saveToDo();
    }
    changeItemToDo(ele) {
        var valueChange = ele.querySelector('label').innerHTML;
        var index = this.getIndexOfToDo(ele);
        this.listToDo[index].setItem(valueChange);
        this.saveToDo();
    }
    saveToDo() {
        localStorage.setItem('toDos', JSON.stringify(this.listToDo));
    }
    checkItemLeft() {
        var checkAll = document.getElementById('label-check-all');
        var element = document.getElementById('footer');
        var checkNumber = document.querySelectorAll('ul[id="todo-list"] li').length;
        var itemLeftText = document.getElementById('item-left').innerHTML;
        if (itemLeftText !== '0' || checkNumber !== 0) {
            element.classList.remove('hidden');
            checkAll.classList.remove('hidden');
        }
        if (itemLeftText === '0' && checkNumber === 0) {
            element.classList.add('hidden');
            checkAll.classList.add('hidden');
        }
    }
    setCount() {
        var itemLeft = document.getElementById('item-left');
        var clearAll = document.getElementById('clear-completed');
        var allItemView = document.querySelectorAll("div[class='view']");
        var listLabel = [];
        allItemView.forEach((element) => {
            listLabel.push(element.textContent);
        });
        var checkNumber = document.querySelectorAll('div input[type="checkbox"]:checked').length;
        var allCheckBox = document.getElementsByClassName('check').length;
        itemLeft.innerHTML = (allCheckBox - checkNumber).toString();
        if (checkNumber != 0) {
            clearAll.classList.remove('hidden');
        }
        else {
            clearAll.classList.add('hidden');
        }
        this.checkItemLeft();
    }
    //change UI when find todo active or complete or find all
    changeSelectFilter(choose) {
        var active = document.getElementById('find-active');
        var complete = document.getElementById('find-complete');
        var all = document.getElementById('find-all');
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
    findAllToDo() {
        const findAll = document.getElementById('find-all');
        findAll.addEventListener('click', () => {
            var allItems = document.querySelectorAll('ul[id="todo-list"] li');
            allItems.forEach((item) => {
                item.classList.remove('hidden');
            });
            this.changeSelectFilter('find-all');
        });
    }
    findActiveToDo() {
        const findActive = document.getElementById('find-active');
        findActive.addEventListener('click', () => {
            var allItems = document.querySelectorAll('ul[id="todo-list"] li');
            allItems.forEach((item) => {
                item.querySelector(':checked')
                    ? item.classList.add('hidden')
                    : item.classList.remove('hidden');
            });
            this.changeSelectFilter('find-active');
        });
    }
    findCompleteToDo() {
        var allComplete = document.getElementById('find-complete');
        allComplete.addEventListener('click', () => {
            var allItems = document.querySelectorAll('ul[id="todo-list"] li');
            allItems.forEach((item) => {
                item.querySelector(':checked')
                    ? item.classList.remove('hidden')
                    : item.classList.add('hidden');
            });
            this.changeSelectFilter('find-complete');
        });
    }
    checkAllToDo() {
        var checkAllItem = document.getElementById('label-check-all');
        checkAllItem.addEventListener('click', () => {
            var allCheckbox = document.querySelectorAll('input[type=checkbox]');
            if (this.checkIfToDoIsComplete()) {
                allCheckbox.forEach((element) => {
                    element.checked = false;
                    this.changeAllStateToDo(false);
                });
            }
            else {
                allCheckbox.forEach((element) => {
                    element.checked = true;
                    this.changeAllStateToDo(true);
                });
            }
            this.setCount();
        });
    }
    checkIfToDoIsComplete() {
        var allCheckbox = document.querySelectorAll('div input[type=checkbox]');
        for (let element of allCheckbox) {
            if (element.checked == false) {
                return false;
            }
        }
        return true;
    }
    clearAllComplete() {
        var clearAllComplete = document.getElementById('clear-completed');
        clearAllComplete.addEventListener('click', () => {
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
