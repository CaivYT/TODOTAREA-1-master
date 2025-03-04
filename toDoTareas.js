document.addEventListener("DOMContentLoaded", cargarCitas);

function agregarCita() {
    const nombreCita = document.getElementById("nombreCita").value.trim();
    const fechaCita = document.getElementById("fechaCita").value;
    const horaCita = document.getElementById("horaCita").value;
    const mensajeError = document.getElementById("mensajeError");
    const listadoCitas = document.getElementById("listadoCitas");

    if (nombreCita === "" || fechaCita === "" || horaCita === "") {
        mensajeError.textContent = "Por favor llena los campos requeridos.";
        mensajeError.style.display = "block";
        return;
    }

    // Verificar si ya existe una cita en esa fecha y hora
    let citaDuplicada = false;
    document.querySelectorAll("#listadoCitas li span").forEach(cita => {
        const citaTexto = cita.textContent;
        if (citaTexto.includes(`${fechaCita} a las ${horaCita}`)) {
            citaDuplicada = true;
        }
    });

    if (citaDuplicada) {
        mensajeError.textContent = "Ya existe una cita en esta fecha y hora.";
        mensajeError.style.display = "block";
        return;
    }

    mensajeError.style.display = "none"; // Ocultar el mensaje de error

    // Crear la nueva cita
    const li = document.createElement("li");
    li.innerHTML = `<span><strong>${nombreCita}</strong> - ${fechaCita} a las ${horaCita}</span>
                    <button class="borrar-btn btn-small pink waves-effect waves-light" onClick="borrarCita(this)">Eliminar</button>`;

    listadoCitas.appendChild(li);

    guardarCitasEnLocalStorage();

    // Limpiar los campos después de agregar la cita
    document.getElementById("nombreCita").value = "";
    document.getElementById("fechaCita").value = "";
    document.getElementById("horaCita").value = "";
}

function borrarCita(elementoCita) {
    elementoCita.parentElement.remove();
    guardarCitasEnLocalStorage();
}

function guardarCitasEnLocalStorage() {
    const citas = [];
    document.querySelectorAll("#listadoCitas li").forEach(cita => {
        citas.push({
            Nombre_Cita: cita.querySelector("span").innerText.split(" - ")[0],
            Fecha_Cita: cita.querySelector("span").innerText.split(" - ")[1].split(" a las ")[0],
            Hora_Cita: cita.querySelector("span").innerText.split(" a las ")[1]
        });
    });

    localStorage.setItem("CitasGuardadas", JSON.stringify(citas));
}

function cargarCitas() {
    const citas = JSON.parse(localStorage.getItem("CitasGuardadas")) || [];
    const listadoCitas = document.getElementById("listadoCitas");
    listadoCitas.innerHTML = "";

    citas.forEach(cita => {
        const li = document.createElement("li");
        li.innerHTML = `<span><strong>${cita.Nombre_Cita}</strong> - ${cita.Fecha_Cita} a las ${cita.Hora_Cita}</span>
                        <button class="borrar-btn btn-small pink waves-effect waves-light" onClick="borrarCita(this)">Eliminar</button>`;

        listadoCitas.appendChild(li);
    });
}

// Nueva función para alternar la visibilidad de la lista de reservas
function toggleReservas() {
    const listadoCitas = document.getElementById("listadoCitas");
    const botonReservas = document.getElementById("btnReservas");

    if (listadoCitas.style.display === "none" || listadoCitas.style.display === "") {
        listadoCitas.style.display = "block";
        botonReservas.textContent = "Esconder reservas";
    } else {
        listadoCitas.style.display = "none";
        botonReservas.textContent = "Ver reservas";
    }
}

// Evento para detectar 'Enter' en el campo de nombre y agregar cita
const inputNombreCita = document.getElementById("nombreCita");
inputNombreCita.addEventListener("keypress", function (tecla) {
    if (tecla.key === "Enter") {
        agregarCita();
    }
});
