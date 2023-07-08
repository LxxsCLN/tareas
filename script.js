const crearTarea = document.querySelector(".crear-tarea");
const formDiv = document.querySelector(".form-div");
const form = document.querySelector("#form");
const tareaText = document.querySelector("#tarea-texto");
const prioridad = document.querySelector("#prioridad");
const cancelarTarea = document.querySelector(".cancelar-tarea");
const aceptarTarea = document.querySelector(".aceptar-tarea");
const divTareas = document.querySelector(".div-tareas")

const listaDeTareas = [];



class Tarea {
    constructor(texto, prioridad){
        this.texto = texto;
        this.prioridad = prioridad;
        this.estado = false;
    }

    crearTarea(){
        let divTarea = document.createElement("div");
        divTarea.classList.add("tarea");

        let textoTarea = document.createElement("p");
        textoTarea.innerText = this.texto;

        let prioridadTarea = document.createElement("p");
        prioridadTarea.innerText = this.prioridad;

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

}

const test = new Tarea("texto texto", "Alta")
divTareas.append(test.crearTarea())
