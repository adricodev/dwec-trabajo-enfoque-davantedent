class Cita {
    constructor(nombre, apellidos, dni, telefono, fechaNacimiento, fechaCita, observaciones) {
        this.id = Date.now(); // Identificador único basado en el instante de creación
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.dni = dni;
        this.telefono = telefono;
        this.fechaNacimiento = fechaNacimiento;
        this.fechaCita = fechaCita;
        this.observaciones = observaciones;
    }
}

const cargarCitasDesdeLocalStorage = () => {
    const citasGuardadas = localStorage.getItem("citasDavanteDent");
    if (citasGuardadas) {
        return JSON.parse(citasGuardadas);
    }
    return [];
};

const cargarCitas=() => {
    const cuerpoTabla = document.getElementById("cuerpoTabla");

    if (!cuerpoTabla) {
        return;
    }

    //Limpiamos la tabla antes de cargar los datos para evitar duplicados
    cuerpoTabla.innerHTML = "";

    //obtenemos las citas con la funcion cargarCitas
    const citas = cargarCitasDesdeLocalStorage();

    //si no hay citas mostamo datos vacio
    if (citas.length === 0) {
        cuerpoTabla.innerHTML = "<tr><td colspan='7'>No hay citas registradas.</td></tr>";
        return; // Salimos de la función si no hay citas
    }

    //si existen citas recorremos y renderizamos
    citas.forEach((cita, indice) => {
        const fila = document.createElement("tr");

        [
            indice + 1,
            cita.fechaCita,
            `${cita.nombre} ${cita.apellidos}`,
            cita.dni,
            cita.telefono,
            cita.observaciones
        ].forEach((valor) => {
            const celda = document.createElement("td");
            celda.textContent = valor ?? "";
            fila.appendChild(celda);
        });

        const celdaAcciones = document.createElement("td");
        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.className = "btn-action btn-corporate";
        botonEliminar.textContent = "Eliminar cita";
        botonEliminar.setAttribute(
            "aria-label",
            `Eliminar cita de ${cita.nombre} ${cita.apellidos}`
        );
        botonEliminar.addEventListener("click", () => eliminarCita(indice));
        celdaAcciones.appendChild(botonEliminar);
        fila.appendChild(celdaAcciones);
        cuerpoTabla.appendChild(fila);
    });
};

const eliminarCita = (indice) => {
    const citas = cargarCitasDesdeLocalStorage();
    const cita = citas[indice];

    if (!cita) {
        return;
    }

    const descripcion = `${cita.nombre} ${cita.apellidos} — ${cita.fechaCita} — DNI ${cita.dni}`;
    if (!confirm(`¿Quieres eliminar esta cita?\n${descripcion}`)) {
        return;
    }

    citas.splice(indice, 1);
    if (citas.length === 0) {
        localStorage.removeItem("citasDavanteDent");
    } else {
        localStorage.setItem("citasDavanteDent", JSON.stringify(citas));
    }
    cargarCitas();
};

const vaciarTabla = () => {
    const citas = cargarCitasDesdeLocalStorage();
    if (citas.length === 0 || !confirm("¿Seguro que quieres eliminar todas las citas?")) {
        return;
    }

    localStorage.removeItem("citasDavanteDent");
    document.getElementById("formCita").reset();
    document.getElementById("btnGuardar").textContent = "Guardar Cita";
    cargarCitas();
};

const validarForm = (event) => {
    event.preventDefault();

    // Capturamos los valores del formulario eliminando espacios sobrantes con trim()
    const nombreValor = document.getElementById("nombre").value.trim();
    const apellidosValor = document.getElementById("apellidos").value.trim();
    const dniValor = document.getElementById("dni").value.trim();
    const tlfValor = document.getElementById("telefono").value.trim();
    const fechaNacimientoValor = document.getElementById("fechaNacimiento").value.trim();
    const fechaCitaValor = document.getElementById("fechaCita").value.trim();
    const obsValor = document.getElementById("observaciones").value.trim();

    /* //Alternativa de validación global comentada, ya que no es la mejor práctica para validar formularios
    //evaluamos una comprobación global en caso de que el form esté totalmente vacío
    if(nombreValor == "" && apellidosValor == "" && dniValor == "" && tlfValor == "" && fechaNacimientoValor == "" && fechaCitaValor == "" && obsValor == ""){
        alert("El formulario está vacío. Rellene los campos");
    }
     */
    // Definición de las expresiones regulares (RegEx) para validación en cliente
    const regexTexto = /^[A-Za-zÁ-Úá-úÑñ\s]{2,40}$/;
    const regexDni = /^[0-9]{8}[A-Za-z]$/;
    const regexTlf = /^[0-9]{9}$/;

    // 1. Validación del nombre
    if(nombreValor == ""){
        alert("El nombre no puede estar vacío.");
        event.preventDefault();
        document.getElementById("nombre").focus();
        return false;
    }
    if (!regexTexto.test(nombreValor)) {
        alert("El nombre es incorrecto. No puede contener números.");
        event.preventDefault();
        return false;
    }

    // 2. Validación del apellido
    if(apellidosValor == ""){
        alert("Los apellidos no pueden estar vacíos.");
        event.preventDefault();
        document.getElementById("apellidos").focus();
        return false;
    }
    if (!regexTexto.test(apellidosValor)) {
        alert("Los apellidos son incorrectos. No pueden contener números.");
        event.preventDefault();
        document.getElementById("apellidos").focus();
        return false;
    }

    // 3. Validación del DNI
    if(dniValor == ""){
        alert("El DNI no puede estar vacío.");
        event.preventDefault();
        document.getElementById("dni").focus();
        return false;
    }
    if (!regexDni.test(dniValor)) {
        alert("El DNI es incorrecto. Debe contener 8 números y una letra.");
        event.preventDefault();
        document.getElementById("dni").focus();
        return false;
    }

    // 4. Validación del teléfono
    if(tlfValor == ""){
        alert("El número de teléfono no puede estar vacío.");
        event.preventDefault();
        document.getElementById("telefono").focus();
        return false;
    }
    if (!regexTlf.test(tlfValor)) {
        alert("El número de teléfono no puede contener letras y debe tener 9 dígitos.");
        event.preventDefault();
        document.getElementById("telefono").focus();
        return false;
    }

    const nuevaCita = new Cita(
        nombreValor,
        apellidosValor,
        dniValor,
        tlfValor,
        fechaNacimientoValor,
        fechaCitaValor,
        obsValor
    );
    const citas = cargarCitasDesdeLocalStorage();
    citas.push(nuevaCita);
    localStorage.setItem("citasDavanteDent", JSON.stringify(citas));

    cargarCitas();
    event.target.reset();

    return true;
};

// Vinculamos la función al evento submit del formulario de forma segura
const formCita = document.getElementById("formCita");
if (formCita) {
    formCita.addEventListener("submit", validarForm);
}

document.getElementById("btnVaciarTabla")?.addEventListener("click", vaciarTabla);

cargarCitas();