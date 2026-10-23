class Cita{
    constructor(dia,mes,año,hora,minuto,observaciones){
        this.id = Date.now(); //Identificador unico para que se registre el isntante que se ha grabado la cita.
        this.dia = dia;
        this.mes = mes;
        this.año = año;
        this.hora = hora;
        this.minuto = minuto;
        this.observaciones = observaciones;

        
const nombreValor = document.getElementById("nombre");
const apellidoValor = document.getElementById("apellido");
const dniValor = document.getElementById("dni");
const tlfValor = document.getElementById("telefono");
const fechaNacimientoValor = document.getElementById("fechaNacimiento");
const fechaCitaValor = document.getElementById("fechaCita");
const obsValor = document.getElementById("observaciones");
    }
}