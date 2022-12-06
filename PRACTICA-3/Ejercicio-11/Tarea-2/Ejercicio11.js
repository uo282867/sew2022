"use strict";
class GeoLocalizacion {
    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }
    getPosicion(posicion){
        this.mensaje = "Se ha realizado correctamente la petición de geolocalización";
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }

    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "Error: El usuario no permite la petición de geolocalización"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Error: Información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "Error: La petición de geolocalización ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Error: Se ha producido un error desconocido"
            break;
        }
    }

    mostrarDatos(){
        var datos='<section><h3>Datos</h3>'; 
            datos+='<p>'+this.mensaje +'</p>'; 
            if(!this.mensaje.includes("Error")) {
                datos+='<p>Longitud: '+this.longitud +' grados</p>'; 
                datos+='<p>Latitud: '+this.latitud +' grados</p>';
                datos+='<p>Precisión de la latitud y longitud: '+ this.precision +' metros</p>';
                datos+='<p>Altitud: '+ this.altitude +' metros</p>';
                datos+='<p>Precisión de la altitud: '+ this.precisionAltitud +' metros</p>';
            }
            datos+='</section>'; 
        $("main").html(datos);
    }
}
let geo = new GeoLocalizacion();