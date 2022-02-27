
function setCount() {
    var number =  document.getElementsByClassName("count");
   number.innerHTML = document.getElementsByClassName('check').length;
    console.log(document.getElementsByClassName("count").innerHTML);

}

function addItem(event) {
    var todoList = document.querySelector("ul")
    if (event.keyCode == 13) {
        var valueInput = document.getElementById("input").value
        var element = document.createElement('li')
        element.innerHTML = `<div class="view">
        <input class="check" type="checkbox">
        <label>${valueInput}</label>
        <button class="remove"></button>
        </div>`
        document.querySelector("input").value =''
        todoList.appendChild(element)
        setCount();
    }
}

