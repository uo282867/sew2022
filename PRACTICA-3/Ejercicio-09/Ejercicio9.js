"use strict";
class Meteo {
    constructor(){
        this.apikey = "543cd0a58d0403d4559c3994fc8cd100";
        this.ciudad = "Oviedo";
        this.codigoPais = "ES";
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.correcto = "¡Todo correcto! XML recibido de <a href='https://openweathermap.org'>OpenWeatherMap</a>"
    }

    updateData(ciudad) {
        this.ciudad = ciudad;
        this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
        // console.log(this.url)
    }

    cargarDatos(){
        $.ajax({
            dataType: "xml",
            async: false,
            url: this.url,
            method: 'GET',
            success: function(datos){
                    //Presentación de los datos contenidos en XML

                    var ciudad = $('city',datos).attr("name");

                    var amanecer              = $('sun',datos).attr("rise");
                    var minutosZonaHoraria    = new Date().getTimezoneOffset();
                    var amanecerMiliSeg1970   = Date.parse(amanecer);
                        amanecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                    var amanecerHora          = (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES");
                    var oscurecer             = $('sun',datos).attr("set");          
                    var oscurecerMiliSeg1970  = Date.parse(oscurecer);
                        oscurecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                    var oscurecerHora         = (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES");

                    var horaMedida            = $('lastupdate',datos).attr("value");
                    var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
                        horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                    var horaMedidaLocal       = (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES");
                    var fechaMedidaLocal      = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");

                    var stringDatos = "<ul><li>Elementos XML: " + $('*',datos).length + "</li>";
                        stringDatos += "<li>Ciudad: " + ciudad + "</li>";
                        stringDatos += "<li>País: " + $('country',datos).text() + "</li>";
                        stringDatos += "<li>Latitud: " + $('coord',datos).attr("lat") + " grados</li>";
                        stringDatos += "<li>Longitud: " + $('coord',datos).attr("lon") + " grados</li>";
                        stringDatos += "<li>Temperatura: " + $('temperature',datos).attr("value") + "</li>";
                        stringDatos += "<li>Temperatura máxima: " + $('temperature',datos).attr("max") + "</li>";
                        stringDatos += "<li>Temperatura mínima: " + $('temperature',datos).attr("min") + "</li>";
                        stringDatos += "<li>Temperatura (unidades): " + $('temperature',datos).attr("unit") + "</li>";
                        stringDatos += "<li>Presión: " + $('pressure',datos).attr("value") + " " + $('pressure',datos).attr("unit") + "</li>";
                        stringDatos += "<li>Humedad: " + $('humidity',datos).attr("value") + " " + $('humidity',datos).attr("unit") + "</li>";
                        stringDatos += "<li>Precipitación modo: " + $('precipitation',datos).attr("mode") + "</li>";
                        stringDatos += "<li>Amanece a las: " + amanecerHora + "</li>";
                        stringDatos += "<li>Oscurece a las: " + oscurecerHora + "</li>";
                        stringDatos += "<li>Dirección del viento: " + $('direction',datos).attr("value") + " grados</li>";
                        stringDatos += "<li>Velocidad del viento: " + $('speed',datos).attr("value") + " metros/segundo</li>";
                        stringDatos += "<li>Nombre del viento: " + $('speed',datos).attr("name") + "</li>";
                        stringDatos += "<li>Código del viento: " + $('direction',datos).attr("code") + "</li>";
                        stringDatos += "<li>Nombre direccón del viento: " + $('direction',datos).attr("name") + "</li>";
                        stringDatos += "<li>Hora de la medida: " + horaMedidaLocal + "</li>";
                        stringDatos += "<li>Fecha de la medida: " + fechaMedidaLocal + "</li>";
                        stringDatos += "<li>Descripción: " + $('weather',datos).attr("value") + "</li>";
                        stringDatos += "<li>Visibilidad: " + $('visibility',datos).attr("value") + " metros</li>";
                        stringDatos += "<li>Nombre nubosidad: " + $('clouds',datos).attr("name") + "</li>";
                        stringDatos += "<li>Nubosidad: " + $('clouds',datos).attr("value") + " %</li></ul>";
                        stringDatos += "<p>Situación del tiempo:</p> <img src='https://openweathermap.org/img/w/"+ $('weather',datos).attr("icon") +".png' alt= 'Imagen " + $('weather',datos).attr("value") + "' />";

                    $("section:last").append(stringDatos);
                },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener XML de <a href='https://openweathermap.org'>OpenWeatherMap</a>"); 
                $("p").remove();
                }
        });
    }

    crearElemento(tipoElemento, texto, insertar){
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertar).append(elemento);
    }
    verXML(){
        //Muestra el archivo XML recibido
        this.crearElemento("h2","Ciudad: " + this.ciudad ,"section:last");    
        this.crearElemento("h3","Datos","section:last"); // Crea un elemento con DOM 
        //this.crearElemento("p",this.ciudad,"section:last"); // Crea un elemento con DOM para los datos obtenidos con XML
        this.cargarDatos();              
    }

    verXMLCiudades(){
        $("main").remove();
        $("footer").before(document.createElement("main"));

        this.updateData("Oviedo");
        $("main").append(document.createElement("section"));
        this.verXML();

        this.updateData("Gijón");
        $("main").append(document.createElement("section"));
        this.verXML();

        this.updateData("Berrón");
        $("main").append(document.createElement("section"));
        this.verXML();

        this.updateData("Madrid");
        $("main").append(document.createElement("section"));
        this.verXML();

        this.updateData("Leon");
        $("main").append(document.createElement("section"));
        this.verXML();    
    }

}
var meteo = new Meteo();