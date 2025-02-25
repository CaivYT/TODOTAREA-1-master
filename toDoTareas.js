document-addEventListener("DOMContentLoaded", cargarTareas);


function agregarTarea(){

    //capturamos la tarea a listar
    const nuevaTarea = document.getElementById("nuevaTarea");
    const textoTarea = nuevaTarea.value.trim();

    //validar si es un vacío
    if(textoTarea === ""){
        alert("Agregue una tarea");
        return;
    }

    //capturamos el listado de tareas
    const listadoTarea = document.getElementById("listadoTareas");

    const li = document.createElement("li"); //se crea un elemento <li></li>
    li.innerHTML = `<span>${textoTarea}</span> 
                        <button class="borrar-btn completado" onClick="borrarTarea(this)">Eliminar</button>`;

    li.querySelector("span").addEvenListener("click", function() {
        this.parentElement.classlist.toggle("completado")
    });

    listadoTarea.appendChild(li);

    nuevaTarea.value = "";
    guardarTareasEnlocalstorage();

}

function borrarTarea(elementoTarea){
    elementoTarea.parentElement.remove();

}

function guardarTareasEnlocalstorage() {
    const tareas= [];
    document.querySelectorAll("li"),forEach(tarea => {
        tareas.push({
            Nombre_Tarea: tarea.querySelector("sapn").innerText,

            Estado_Tarea: tarea.classlist.contains("completado")
        });
    });

    localStorage.setItem("TareasGuardadas", JSON.stringify(tareas));
}
function cargarTareas() {
    const tareas = JSON.parse(localStorage.getItem("TareasGuardadas"))|| [];
    const listadoTareas = document.getElementById ("listadoTareas");
    tareas.forEach(tarea =>{
        const li = document.createElement("li"); /* se construyo un li*/
        li.innerHTML = `
        <span>${tarea.Nombre_Tarea}</span>
        <button class="borrar-btn" onclick onClick="borrarTarea(this)">Eliminar</button>`; 
        if(tarea-Estado_Tarea == true){
            li.classList.add("completado");
        }
        listadoTareas.appendChild(li);




    });


}




/* GUARDAR DOANDOLE ENTER */
const  inputnuevaTarea = document.getElementById("nuevaTarea");

inputNuevaTarea.addEvenListener("keypress", function(tecla){
    if(tecla.key == "Enter") {
        agregarTarea();
    }
});