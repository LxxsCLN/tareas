const crearTarea = document.querySelector(".crear-tarea");
const formDiv = document.querySelector(".form-div");
const form = document.querySelector("#form");
const tareaText = document.querySelector("#tarea-texto");
const prioridad = document.querySelector("#prioridad");
const cancelarTarea = document.querySelector("#cancelar-tarea");
const aceptarTarea = document.querySelector("#aceptar-tarea");
const divTareas = document.querySelector(".div-tareas")


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
    constructor(texto, prioridad){
        this.texto = texto;
        this.prioridad = prioridad;
        this.estado = false;
    }

    
}

function crearTarea1(tarea){
    let divTarea = document.createElement("div");
    divTarea.classList.add("tarea");

    let textoTarea = document.createElement("p");
    textoTarea.innerText = tarea.texto;

    let prioridadTarea = document.createElement("p");
    prioridadTarea.innerText = tarea.prioridad;

    let editarTarea = document.createElement("a");
    let editarTareaIcono = document.createElement("i")
    editarTareaIcono.className = "fa-solid fa-pen-to-square editar-tarea fa-2xl" 
    editarTarea.append(editarTareaIcono)

    let estadoTarea = document.createElement("input");
    estadoTarea.setAttribute("type", "checkbox")
    estadoTarea.setAttribute("name", "estado-tarea")
    estadoTarea.setAttribute("id", "estado-tarea")
    estadoTarea.setAttribute("value", "false")

    let eliminarTarea = document.createElement("button")
    eliminarTarea.innerText = "Eliminar"
    eliminarTarea.classList.add("eliminar-tarea")
           

    divTarea.append(textoTarea, prioridadTarea, editarTarea, estadoTarea, eliminarTarea)

    return divTarea;

}

function cargarTareas(){
    if (localStorage.getItem("listaDeTareas") !== null){
        listaDeTareas = JSON.parse(localStorage.getItem("listaDeTareas"));
        
        listaDeTareas.forEach(tarea => {
            divTareas.append(crearTarea1(tarea))
        });    
        console.log(listaDeTareas)
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
    let index = listaDeTareas.findIndex(x => x.texto === e.target.parentElement.firstChild.innerText);
    listaDeTareas.splice(index, 1);
    console.log(listaDeTareas)
    e.target.parentElement.remove()
}

function editarTareaF(e){
    listaDeTareas[currentTask] = new Tarea(tareaTextEdit.value, prioridadEdit.value)
    console.log(listaDeTareas)
    editToggleForm()    
    divTareas.insertBefore(crearTarea1(listaDeTareas[currentTask]), currentTaskDiv)
    currentTaskDiv.remove();
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
        currentTask = listaDeTareas.findIndex(x => x.texto === e.target.parentElement.parentElement.firstChild.innerText);
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


/* //localstorage
if (localStorage.getItem("listaDeTareas") !== null){
    listaDeTareas = JSON.parse(localStorage.getItem("listaDeTareas"));
    
    listaDeTareas.forEach(tarea => {
        divTareas.firstChild.append(tarea.crearTarea1())
    }); 
    /* for (let i in listaDeTareas){
        i.crearTarea()
    } 
} */



cargarTareas()