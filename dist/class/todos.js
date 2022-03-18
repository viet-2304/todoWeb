export class ToDos {
    constructor() {
        this.listToDos = [];
    }
    getDataInLocalstorage() {
        JSON.parse(localStorage.getItem("toDos")).forEach(element => {
            this.listToDos.push(element);
        });
        return JSON.stringify(this.listToDos);
    }
    saveDataInLocalstorage() {
        localStorage.setItem("toDos", JSON.stringify(this.listToDos));
    }
    addNewToDo(item) {
        this.listToDos.push(item);
        this.saveDataInLocalstorage();
    }
}
