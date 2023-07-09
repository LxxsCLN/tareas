const crearTarea = document.querySelector(".crear-tarea");
const formDiv = document.querySelector(".form-div");
const form = document.querySelector("#form");
const tareaText = document.querySelector("#tarea-texto");
const prioridad = document.querySelector("#prioridad");
const cancelarTarea = document.querySelector("#cancelar-tarea");
const aceptarTarea = document.querySelector("#aceptar-tarea");
const divTareas = document.querySelector(".div-tareas")
const searchInput = document.querySelector("#searchbox")
const ordenar = document.querySelector("#ordenar")
const filtrar = document.querySelector("#filtrar")

const formDivEdit = document.querySelector(".edit-form-div");
const formEdit = document.querySelector("#form-edit");
const tareaTextEdit = document.querySelector("#tarea-texto-edit");
const prioridadEdit = document.querySelector("#prioridad-edit");
const cancelarTareaEdit = document.querySelector("#cancelar-tarea-edit");
const aceptarTareaEdit = document.querySelector("#aceptar-tarea-edit");

let listaDeTareas = [];
let currentTask = undefined;
let currentTaskDiv = undefined;

class Tarea {

    fechaTest = new Date();
    fechaMs = this.fechaTest.getTime()

    constructor(texto, prioridad){
        this.texto = texto;
        this.prioridad = prioridad;
        this.estado = false;
        this.id = Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36)
        this.fecha = this.fechaMs;
    }    
}

function crearTarea1(tarea){
    console.log(tarea.fecha)
    let prior = tarea.prioridad === "1" ? "Baja" : tarea.prioridad === "2" ? "Media" : "Alta";
    let isChecked = tarea.estado ? "checked" : "unchecked";

    let divTarea = document.createElement("div");
    divTarea.classList.add("tarea");
    divTarea.setAttribute("data-id", `${tarea.id}`)

    let textoTarea = document.createElement("p");
    textoTarea.innerText = tarea.texto;

    let prioridadTarea = document.createElement("p");
    prioridadTarea.innerText = prior;

    let editarTarea = document.createElement("a");
    let editarTareaIcono = document.createElement("i")
    editarTareaIcono.className = "fa-solid fa-pen-to-square editar-tarea fa-2xl" 
    editarTarea.append(editarTareaIcono)

    let estadoTarea = document.createElement("input");
    estadoTarea.setAttribute("type", "checkbox")
    estadoTarea.setAttribute("name", "estado-tarea")
    estadoTarea.setAttribute("id", "estado-tarea")
    estadoTarea.setAttribute(`${isChecked}`, "")

    let eliminarTarea = document.createElement("button")
    eliminarTarea.innerText = "Eliminar"
    eliminarTarea.classList.add("eliminar-tarea")           

    divTarea.append(textoTarea, prioridadTarea, editarTarea, estadoTarea, eliminarTarea)
    return divTarea;
}

function cargarTareas(){
    if (localStorage.getItem("listaDeTareas") !== null){

        listaDeTareas = JSON.parse(localStorage.getItem("listaDeTareas"));
        listaDeTareas.sort(function(a,b){return (a.fecha) - (b.fecha)});
        listaDeTareas.forEach(tarea => {
            divTareas.append(crearTarea1(tarea))
        });
    }
}

function crearTareaF(){
    if (tareaText.value === "" || prioridad.value === ""){
        return
    }
    const nuevaTarea = new Tarea(tareaText.value, prioridad.value)
    listaDeTareas.push(nuevaTarea);
    divTareas.append(crearTarea1(nuevaTarea))
    localStorage.setItem("listaDeTareas", JSON.stringify(listaDeTareas))
    toggleForm();
    console.log(listaDeTareas)
}

function eliminarTareaF(e, olde){    
    let index = listaDeTareas.findIndex(x => x.id === e.target.parentElement.dataset.id);
    listaDeTareas.splice(index, 1);
    localStorage.setItem("listaDeTareas", JSON.stringify(listaDeTareas))
    e.target.parentElement.remove()
}

function editarTareaF(e){
    console.log(prioridadEdit.value)
    listaDeTareas[currentTask] = new Tarea(tareaTextEdit.value, prioridadEdit.value)
    localStorage.setItem("listaDeTareas", JSON.stringify(listaDeTareas))
    editToggleForm()    
    divTareas.insertBefore(crearTarea1(listaDeTareas[currentTask]), currentTaskDiv)
    currentTaskDiv.remove();
    console.log(listaDeTareas[currentTask].fecha)
}

function toggleForm(){
    form.reset()
    if (formDiv.classList.contains("hidden")){
        formDiv.className = "form-div visible"
    } else {
        formDiv.className = "form-div hidden"
    }
}

function editToggleForm(){
    if (formDivEdit.classList.contains("hidden")){
        formDivEdit.className = "form-div visible"
    } else {
        formDivEdit.className = "form-div hidden"
    }
    
}

function editarEstado(e){
    let index = listaDeTareas.findIndex(x => x.id === e.target.parentElement.dataset.id);
    listaDeTareas[index].estado = !listaDeTareas[index].estado; 
    localStorage.setItem("listaDeTareas", JSON.stringify(listaDeTareas))
}

crearTarea.addEventListener("click", (e)=> {
    e.preventDefault()
    toggleForm()
})


document.addEventListener("click", e => {
    if (e.target.matches("#cancelar-tarea")) {
        e.stopImmediatePropagation();  
        toggleForm()
    }
})

document.addEventListener("click", e => {
    if (e.target.matches("#aceptar-tarea")) {
        e.stopImmediatePropagation();  
        e.preventDefault()
        crearTareaF()
    }
})

document.addEventListener("click", e => {
    if (e.target.matches(".eliminar-tarea")) {
        e.stopImmediatePropagation();  
        eliminarTareaF(e,this)
    }
})

document.addEventListener("click", e => {
    if (e.target.matches(".editar-tarea")) {
        e.stopImmediatePropagation();  
        currentTask = listaDeTareas.findIndex(x => x.id === e.target.parentElement.parentElement.dataset.id);
        currentTaskDiv = e.target.parentElement.parentElement;
        editToggleForm(e)
    }
})

document.addEventListener("click", e => {
    if (e.target.matches("#cancelar-tarea-edit")) {
        e.stopImmediatePropagation();  
        editToggleForm(e)
    }
})

document.addEventListener("click", e => {
    if (e.target.matches("#aceptar-tarea-edit")) {
        e.stopImmediatePropagation();  
        e.preventDefault()
        editarTareaF()
    }
})

document.addEventListener("change", e => {
    if (e.target.matches("#estado-tarea")) {
        editarEstado(e)
    }
})

ordenar.addEventListener("change", () => {
    
    ordenarF()
})

filtrar.addEventListener("change", () => {
    
    filtrarF()
})

searchInput.addEventListener("keyup", () => {
    buscar()
});

let innerT = `<div class="div-tareas-labels">
<p>Tarea</p>
<p>Prioridad</p>
<p>Editar</p>
<p>Estado</p>
<p></p>
</div>`

function ordenarF(){

    let tareas = document.querySelectorAll(".tarea");
    let ordenarPor = document.getElementById("ordenar").value;
    switch(ordenarPor){
        case "sin": 
            listaDeTareas.sort(function(a,b){return (a.fecha) - (b.fecha)});
            console.log(listaDeTareas)
            localStorage.setItem("listaDeTareas", JSON.stringify(listaDeTareas))
            divTareas.innerHTML = innerT;
            listaDeTareas.forEach(tarea => {
                divTareas.append(crearTarea1(tarea))
            });
            break;
        case "desc":
            listaDeTareas.sort(function(a, b){return parseInt(b.prioridad, 10) - parseInt(a.prioridad, 10)});
            localStorage.setItem("listaDeTareas", JSON.stringify(listaDeTareas))
            divTareas.innerHTML = innerT;
            listaDeTareas.forEach(tarea => {
                divTareas.append(crearTarea1(tarea))
            });
            break;
        case "asc":
            listaDeTareas.sort(function(a, b){return parseInt(a.prioridad, 10) - parseInt(b.prioridad, 10)});
            localStorage.setItem("listaDeTareas", JSON.stringify(listaDeTareas))
            divTareas.innerHTML = innerT;
            listaDeTareas.forEach(tarea => {
                divTareas.append(crearTarea1(tarea))
            });
            break;
        default:
            console.log("default");
    }
}

function filtrarF(){

    let tareas = document.querySelectorAll(".tarea");
    let filtrarPor = document.getElementById("filtrar").value;
    switch(filtrarPor){
        case "sinf":           
        tareas.forEach(tar => {
            tar.classList.remove("hidden")
        })            
            break;
        case "comp":
            tareas.forEach(tar => {
                tar.classList.remove("hidden")
            })
            for (let i = 0; i < listaDeTareas.length; i++) {
                if (!listaDeTareas[i].estado){
                    tareas[i].classList.add("hidden")
                }
            }
            break;
        case "sinc":
            tareas.forEach(tar => {
                tar.classList.remove("hidden")
            })
            for (let i = 0; i < listaDeTareas.length; i++) {
                if (listaDeTareas[i].estado){
                    tareas[i].classList.add("hidden")
                }
            }
            break;
        default:
            console.log("default");
    }
}

function buscar() {    
    let tareas = document.querySelectorAll(".tarea")
    
    let searchQuery = document.getElementById("searchbox").value;

    for (let i = 0; i < listaDeTareas.length; i++) {
      if(listaDeTareas[i].texto.toLowerCase().includes(searchQuery.toLowerCase())) {
          tareas[i].classList.remove("hidden")
      } else {
        tareas[i].classList.add("hidden")
      }
    }
}

cargarTareas();