"use strict";
class Gasolina {
    constructor(){
        this.url = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvincia/33";
    }

    cargarDatos(){
        var datosInsertados = 0;
        $.ajax({
            dataType: "Json",
            url: this.url,
            method: 'GET',
            success: function(datos){
                    
                    $("h2:contains('Fecha: ')").append(datos.Fecha);

                    var lista = datos.ListaEESSPrecio;
                    var localidad = $("input[type='text']").get(0).value.trim().toUpperCase();
                    // console.log(lista)

                    for(var i = 0; i < lista.length; i++) {
                        if(lista[i].Localidad == localidad) {
                            var gasolinas = new Map();

                            for (var elemento in lista[i]){
                                if(elemento.includes("95")){
                                    if(lista[i][elemento] != ""){
                                        gasolinas.set(elemento, lista[i][elemento] + " €/L")
                                    }
                                }
                            }

                            if(gasolinas.size > 0) {
                                var stringDatos = "<h2>" + lista[i].Dirección + "</h2>";
                                    stringDatos += "<ul><li>Horario: " + lista[i].Horario + "</li>";
                                    // stringDatos += "<li>Horario: " + lista[i].Horario + "</li>";
                                    for(var [k ,v] of gasolinas){
                                        stringDatos += "<li>" + k +": " + v + "</li>";
                                    }
                                    stringDatos += "</ul>";

                                gas.crearElemento("section",stringDatos,"main");
                                datosInsertados++;
                            }
                        }
                    }

                    if(datosInsertados == 0) {
                        var str = "<section><h3>No se han encontrado gasolineras para esta ubicación</h3>";
                            str += "<p>Prueba con:</p> <ul> <li>Oviedo</li> <li>Gijon</li> <li>Aviles</li> <li>Cangas del Narcea</li> <li>Pola de Siero</li> <li>Langreo</li> <li>Pola de  Lena</li> </ul></section>"
                        $("main").append(str);
                    }

                },
            error:function(){
                $("h2").remove(); 
                $("h1").after(document.createElement("h2"));
                $("h2").html("¡Tenemos problemas! No se pudieron obtener los datos"); 
                $("main").remove();
                }
        });
    }

    crearElemento(tipoElemento, texto, insertar){
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertar).append(elemento);
    }

    verDatos(){
        $("main").remove();
        $("footer").before(document.createElement("main"));
        $("main").hide();

        $("h2").remove();
        var elemento = document.createElement("h2"); 
        elemento.innerHTML = "Fecha: ";
        $("main").before(elemento);

        this.cargarDatos();
        $("main").show();            
    }
}

let gas = new Gasolina();