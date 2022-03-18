import { toDo } from "./toDo.js";

export class ToDos {
    private listToDos = [];
    
    public getDataInLocalStorage(): string {
        JSON.parse(localStorage.getItem("toDos")).forEach(element => {
            this.listToDos.push(element);
        });
        return JSON.stringify(this.listToDos)
    }

    public saveDataInLocalStorage() {
        localStorage.setItem("toDos", JSON.stringify(this.listToDos))
    }

    public addNewToDo(item) {
        this.listToDos.push(item);
        this.saveDataInLocalStorage()
    }

}
