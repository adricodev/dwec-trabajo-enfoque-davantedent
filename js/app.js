class Cita {
    constructor(nombre, apellido, dni, telefono, fechaNacimiento, fechaCita, observaciones) {
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

const validarForm = (event) => {
    // Capturamos los valores del formulario eliminando espacios sobrantes con trim()
    const nombreValor = document.getElementById("nombre").value.trim();
    const apellidosValor = document.getElementById("apellidos").value.trim();
    const dniValor = document.getElementById("dni").value.trim();
    const tlfValor = document.getElementById("telefono").value.trim();
    const fechaNacimientoValor = document.getElementById("fechaNacimiento").value.trim();
    const fechaCitaValor = document.getElementById("fechaCita").value.trim();
    const obsValor = document.getElementById("observaciones").value.trim();

    // Definición de las expresiones regulares (RegEx) para validación en cliente
    const regexTexto = /^[A-Za-zÁ-Úá-ú\s]{2,40}$/;
    const regexDni = /^[0-9]{8}[A-Za-z]$/;
    const regexTlf = /^[0-9]{9}$/;

    // 1. Validación del nombre
    if (!regexTexto.test(nombreValor)) {
        alert("El nombre es incorrecto. No puede contener números y debe tener entre 2 y 40 caracteres.");
        event.preventDefault();
        return false;
    }

    // 2. Validación del apellido
    if (!regexTexto.test(apellidosValor)) {
        alert("Los apellidos son incorrectos. No pueden contener números y deben tener entre 2 y 40 caracteres.");
        event.preventDefault();
        return false;
    }

    // 3. Validación del DNI
    if (!regexDni.test(dniValor)) {
        alert("El DNI es incorrecto. Debe contener 8 números y una letra.");
        event.preventDefault();
        return false;
    }

    // 4. Validación del teléfono
    if (!regexTlf.test(tlfValor)) {
        alert("El número de teléfono no puede contener letras y debe tener 9 dígitos.");
        event.preventDefault();
        return false;
    }

    // Si todas las validaciones son correctas, instanciamos el objeto Cita
    const nuevaCita = new Cita(
        nombreValor,
        apellidosValor,
        dniValor,
        tlfValor,
        fechaNacimientoValor,
        fechaCitaValor,
        obsValor
    );

    console.log("Cita creada correctamente:", nuevaCita);

    //Añadir aqui el local Storage para guardar la cita.

    
    return true;
};

// Vinculamos la función al evento submit del formulario de forma segura
const formCita = document.getElementById("formCita");
if (formCita) {
    formCita.addEventListener("submit", validarForm);
}