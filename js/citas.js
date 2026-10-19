class Cita{
    constructor(dia,mes,año,hora,minuto,observaciones){
        this.id = Date.now(); //Identificador unico para que se registre el isntante que se ha grabado la cita.
        this.dia = dia;
        this.mes = mes;
        this.año = año;
        this.hora = hora;
        this.minuto = minuto;
        this.observaciones = observaciones;
    }
}