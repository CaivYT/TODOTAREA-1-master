document.addEventListener("DOMContentLoaded", cargarCitas);

function agregarCita() {
    const nombreCita = document.getElementById("nombreCita").value.trim();
    const fechaCita = document.getElementById("fechaCita").value;
    const horaCita = document.getElementById("horaCita").value;

    if (nombreCita === "" || fechaCita === "" || horaCita === "") {
        alert("Por favor completa todos los campos");
        return;
    }

    const listadoCitas = document.getElementById("listadoCitas");

    const li = document.createElement("li");
    li.innerHTML = `<span><strong>${nombreCita}</strong> - ${fechaCita} a las ${horaCita}</span>
                    <button class="borrar-btn btn-small pink waves-effect waves-light" onClick="borrarCita(this)">Eliminar</button>`;

    listadoCitas.appendChild(li);

    guardarCitasEnLocalStorage();
}

function borrarCita(elementoCita) {
    elementoCita.parentElement.remove();
    guardarCitasEnLocalStorage();
}

function guardarCitasEnLocalStorage() {
    const citas = [];
    document.querySelectorAll("#listadoCitas li").forEach(cita => {
        citas.push({
            Nombre_Cita: cita.querySelector("span").innerText.split(" - ")[0], // Extrae el nombre
            Fecha_Cita: cita.querySelector("span").innerText.split(" - ")[1].split(" a las ")[0], // Extrae la fecha
            Hora_Cita: cita.querySelector("span").innerText.split(" a las ")[1] // Extrae la hora
        });
    });

    localStorage.setItem("CitasGuardadas", JSON.stringify(citas));
}

function cargarCitas() {
    const citas = JSON.parse(localStorage.getItem("CitasGuardadas")) || [];
    const listadoCitas = document.getElementById("listadoCitas");
    listadoCitas.innerHTML = ""; // Limpiar antes de cargar

    citas.forEach(cita => {
        const li = document.createElement("li");
        li.innerHTML = `<span><strong>${cita.Nombre_Cita}</strong> - ${cita.Fecha_Cita} a las ${cita.Hora_Cita}</span>
                        <button class="borrar-btn" onClick="borrarCita(this)">Eliminar</button>`;

        listadoCitas.appendChild(li);
    });
}

const inputNombreCita = document.getElementById("nombreCita");
inputNombreCita.addEventListener("keypress", function (tecla) {
    if (tecla.key === "Enter") {
        agregarCita();
    }
});
