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
        var datos='<section>'; 
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


    getMapaEstaticoGoogle(){
        if(!this.mensaje.includes("Error")) {
            var apiKey = "&key=AIzaSyDbqZKwqp-RRg6AWHorXwOjauILE8jvTa8";
            var url = "https://maps.googleapis.com/maps/api/staticmap?";
            var centro = "center=" + this.latitud + "," + this.longitud;
            var zoom ="&zoom=15";
            var tamaño= "&size=800x600";
            var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
            var sensor = "&sensor=false"; 
            
            this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
            $("main").html("<img src='"+this.imagenMapa+"' alt='mapa estático google' />");
        } else {
            $("main").html('<p>'+this.mensaje +'</p>');
        }
    }

    getMapaDinamicoGoogle(){
        if(!this.mensaje.includes("Error")) {
            this.initMap();
        } else {
            $("main").html('<p>'+this.mensaje +'</p>');
        }
    }

    initMap(){        
        var oviedo = {lat: 43.3672702, lng: -5.8502461};
        this.mapaOviedo = new google.maps.Map(document.getElementsByTagName('main')[0],{zoom: 8,center:oviedo});
        var marcador = new google.maps.Marker({position:oviedo,map:this.mapaOviedo});      
    }

}
let geo = new GeoLocalizacion();