var input = document.querySelector(".inpput").querySelector("textarea")
var output = document.querySelector(".outnpput").querySelectorAll("textarea")
var outputBloc = document.querySelector(".outnpput")
var mousedowN = false
var alementmove
var xStart
var id

input.addEventListener('keydown', (event) => { 
    if (event.code == 'Enter' && event.target.value != " ")
     { createNewItem(event); event.preventDefault(); } })
input.onchange = (event) => { createNewItem(event) }
input.oninput = (event) => {
    event.target.style.height = "auto"
    event.target.style.height = `${event.target.scrollHeight}px`
}
function createNewItem(event) {
    outputBloc.append(createNewTextarea(id, event.target.value));
    localStorage.setItem(id, event.target.value);
    event.target.value = "";
    id++
}

function createNewTextarea(id, text) {
    let textarea = document.createElement('textarea');
    textarea.id = id;
    textarea.rows = 1;
    textarea.innerHTML = text;
    textarea.addEventListener('mousedown', mousedown)
    textarea.onchange=()=>localStorage.setItem(id, textarea.value);
    textarea.oninput = (event) => { 
        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`
    }
    setTimeout(() => { textarea.oninput(textarea)},10)
    return textarea
}
//////////////////////////////////////////////////
readLocalStorage();
function readLocalStorage() {
    let len=0;
    for (let i = 0; i < localStorage.length; i++) { 
        let a = parseInt(localStorage.key(i.toString()))
        if (len < a) { len = a;}
    }
    for (let i = 0; i <= len; i++) {
        if (localStorage.getItem(i) == null) continue;
        outputBloc.append(createNewTextarea(i,localStorage.getItem(i)));
    }
    id = len + 1;
}

//////////////////////////////////////////////////////////////////////////////////////////
outputBloc.querySelectorAll("textarea").forEach((el) => el.addEventListener('mousedown', mousedown))
document.addEventListener('mouseup', mouseup)
document.addEventListener('mousemove', mousemove)
function mousedown(e) {
    mousedowN = true;
    xStart = e.screenX;
    alementmove = e.target;   
}
function mouseup() {
       mousedowN = false;
    if (alementmove == undefined) { return; }
    if (parseInt(alementmove.style.left) > 170) {
        localStorage.removeItem(alementmove.id);
        alementmove.classList.add("hide")
    } else {
        console.log("mouseup");
        alementmove.animate(
            [
                { left: alementmove.style.left },
                { left: "0" }
            ], { duration: 250 }
        ); 
    }
    alementmove.style.left = null
    alementmove = undefined;
}
function mousemove(e) {
    if (mousedowN) {alementmove.style.left = `${e.screenX - xStart}px`}
}





