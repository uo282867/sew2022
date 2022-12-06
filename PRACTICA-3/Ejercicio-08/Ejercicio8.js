"use strict";
class Meteo {
    constructor(){
        this.apikey = "543cd0a58d0403d4559c3994fc8cd100";
        this.ciudad = "Oviedo";
        this.codigoPais = "ES";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.correcto = "¡Todo correcto! JSON recibido de <a href='https://openweathermap.org'>OpenWeatherMap</a>"
    }

    updateData(ciudad) {
        this.ciudad = ciudad;
        this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
    }

    cargarDatos(){
        $.ajax({
            dataType: "json",
            url: this.url,
            async: false,
            method: 'GET',
            success: function(datos){
                    // $("pre:empty:first").text(JSON.stringify(datos, null, 2)); //muestra el json en un elemento pre
                
                    //Presentación de los datos contenidos en JSON

                    var stringDatos = "<ul><li>Ciudad: " + datos.name + "</li>";
                        stringDatos += "<li>País: " + datos.sys.country + "</li>";
                        stringDatos += "<li>Latitud: " + datos.coord.lat + " grados</li>";
                        stringDatos += "<li>Longitud: " + datos.coord.lon + " grados</li>";
                        stringDatos += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>";
                        stringDatos += "<li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius</li>";
                        stringDatos += "<li>Temperatura mínima: " + datos.main.temp_min + " grados Celsius</li>";
                        stringDatos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                        stringDatos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                        stringDatos += "<li>Amanece a las: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</li>";
                        stringDatos += "<li>Oscurece a las: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</li>";
                        stringDatos += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
                        stringDatos += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                        stringDatos += "<li>Hora de la medida: " + new Date(datos.dt *1000).toLocaleTimeString() + "</li>";
                        stringDatos += "<li>Fecha de la medida: " + new Date(datos.dt *1000).toLocaleDateString() + "</li>";
                        stringDatos += "<li>Descripción: " + datos.weather[0].description + "</li>";
                        stringDatos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                        stringDatos += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul>";
                        stringDatos += "<p>Situación del tiempo: </p> <img src='https://openweathermap.org/img/w/"+ datos.weather[0].icon +".png' alt= 'Imagen " + datos.weather[0].description + "' />";

                    $("section:last").append(stringDatos);
                },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='https://openweathermap.org'>OpenWeatherMap</a>"); 
                $("p").remove();
                }
        });
    }

    crearElemento(tipoElemento, texto, insertar){
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertar).append(elemento);
    }
    verJSON(){
        this.crearElemento("h2","Ciudad: " + this.ciudad ,"section:last"); 
        this.crearElemento("h3","Datos","section:last"); // Crea un elemento con DOM 
        //this.crearElemento("p",this.ciudad,"section:last"); // Crea un elemento con DOM para los datos obtenidos con JSON
        this.cargarDatos();              
    }

    verJSONCiudades(){
        $("main").remove();
        $("footer").before(document.createElement("main"));

        this.updateData("Oviedo");
        $("main").append(document.createElement("section"));
        this.verJSON();

        this.updateData("Gijón");
        $("main").append(document.createElement("section"));
        this.verJSON();

        this.updateData("Berrón");
        $("main").append(document.createElement("section"));
        this.verJSON();

        this.updateData("Madrid");
        $("main").append(document.createElement("section"));
        this.verJSON();

        this.updateData("Leon");
        $("main").append(document.createElement("section"));
        this.verJSON();      
    }

}
var meteo = new Meteo();