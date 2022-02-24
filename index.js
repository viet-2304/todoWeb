
function addItem(event) {
    if (event.keyCode == 13) {
        var  newMenu = document.getElementById("myMenu")
       var valueInput = document.getElementById("input").value
        var val = document.createElement('menuitem')
        newMenu.appendChild(val)
        console.log(newMenu)
    }
}