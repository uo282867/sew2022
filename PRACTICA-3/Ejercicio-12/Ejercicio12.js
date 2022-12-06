"use strict"
class LectorFicheros {
    constructor() {
        this.archivosMostrar = new Array();
    }

    leerArchivoTexto(archivos) {
        this.archivosMostrar.length = 0;
        this.files = archivos;
        var mostrarDatos = "<section> <h2>Archivos seleccionados:</h2>"
        if(this.files.length > 0) {
                mostrarDatos += "<ul>"
            for(var i = 0; i < this.files.length; i++) {
                var tipo = this.files[i].type;
                mostrarDatos += "<li>" + "Nombre del archivo: " + this.files[i].name + "<ul>";
                mostrarDatos += "<li>Tipo: " + tipo + "</li>";
                mostrarDatos += "<li>Tamaño: " + this.files[i].size + " bytes</li>";
                mostrarDatos += "<li>Fecha de la última modificación: " + this.files[i].lastModifiedDate + " bytes</li>";
                mostrarDatos += "</ul></li>";                
                if(tipo.includes("text/plain") || tipo.includes("xml") || tipo.includes("json")) {
                    this.archivosMostrar.push(this.files[i]);
                }
            }
                mostrarDatos += "</ul>"
        } else {
            mostrarDatos += "<p>No se ha seleccionado ningún archivo</p>"
        }

        $("main").remove();
        $("footer").before(document.createElement("main"));
        this.insertarSection(mostrarDatos);

        this.mostrarArchivos();
    }

    insertarSection(sect) {
        $("main").append(sect);
    }

    mostrarArchivos() {
        this.archivosMostrar.forEach(element => {
            var xml = false;
            if(element.type.includes("xml")) {
                xml = true;
            }

            var texto = "<section><h2>" + element.name + "</h2>"
            var lector = new FileReader();
            lector.onload = function (evento) {
                if(xml == true) {
                    texto += "<pre>"
                    texto += lector.result.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    texto += "</pre></section>"
                }else {
                    texto += "<pre>"
                    texto += lector.result;
                    texto += "</pre></section>"
                }
                file.insertarSection(texto);
            }      
            lector.readAsText(element);            
        });
    }

}

let file = new LectorFicheros();