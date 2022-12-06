"use strict";
class GeoLocalizacion {
    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
        this.mapaInicializado = false;
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
  
    getMapaGasolineras() {
        if(!this.mensaje.includes("Error")) {
            if (this.mapaInicializado == false) {
                this.initMap();
                this.mapaInicializado = true;
            }

            this.gasolineras = new Map();
            this.cargarGasolineras();

            for (var [k,pos] of this.gasolineras) {
                // var marcador = new google.maps.Marker({position:pos, map:this.mapaGeoposicionado});
            
                var infoWindow = new google.maps.InfoWindow;
                infoWindow.setPosition(pos);
                infoWindow.setContent(k);
                infoWindow.open(this.mapaGeoposicionado);
                this.mapaGeoposicionado.setCenter(pos);
            }
        } else {
            $("main").html('<p>'+this.mensaje +'</p>');
        }
    }

    cargarGasolineras(){
        $.ajax({
            dataType: "Json",
            async: false,
            url: "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvincia/33",
            method: 'GET',
            success: function(datos){
                    var lista = datos.ListaEESSPrecio;
                    var localidad = $("input[type='text']").get(0).value.trim().toUpperCase();

                    for(var i = 0; i < lista.length; i++) {
                        if(lista[i].Localidad == localidad) {

                            for (var elemento in lista[i]){
                                if(elemento.includes("Longitud")){
                                    var pos = {lat: Number(lista[i].Latitud.replace(",",".")), lng: Number(lista[i][elemento].replace(",","."))};
                                }
                            }                     
                            
                            geo.gasolineras.set(lista[i].Dirección, pos);
                        }
                    }
                },
            error:function(){
                $("h3").remove(); 
                $("h2").after(document.createElement("h3"));
                $("h3").html("¡Tenemos problemas! No se pudieron obtener los datos"); 
                $("main").remove();
                }
        });
    }

    initMap(){  
        var centro = {lat: 43.3672702, lng: -5.8502461};
        this.mapaGeoposicionado = new google.maps.Map(document.getElementsByTagName('main')[0],{
            zoom: 8,
            center:centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    }

}

let geo = new GeoLocalizacion();