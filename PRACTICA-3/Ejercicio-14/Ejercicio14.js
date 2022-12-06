"use strict"
class EditorCSV {
    constructor() {
        this.elementos = new Array();
        this.colores = ["(255, 0, 0, 0.8)", "(0, 255, 0, 0.8)", "(0, 0, 255, 0.8)", "(211, 211, 83, 1)", "(0, 255, 255, 0.8)"];
        this.csvIniciado = false;
    }

    leerArchivoCSV(archivo) {
        if(archivo.length > 0) {
            this.file = archivo[0];        
            
            $("h3").remove();

            if(!this.file.name.includes(".csv")) {
                $("h2").after("<h3>No se ha introducido un archivo csv</h3>");
                this.csvIniciado = false;
            } else {
                this.csvIniciado = true;
                var lector = new FileReader();
                lector.onload = function (evento) {            
                    var contenido = lector.result;
                    csvEd.procesarCSV(contenido.trim().split("\n"));
                }      
                lector.readAsText(this.file);
            }
        }
    }

    getGrafico() {
        var c = document.getElementsByTagName('canvas')[0]
        c.width = 2000;
        c.height = 600;

        var canvas = c.getContext('2d');

        canvas.clearRect(0, 0, 2000, 600);

        canvas.beginPath();
		canvas.strokeStyle = "rgba(0, 0, 0, 1)";
		canvas.moveTo(15, 500);
		canvas.lineTo(1990, 500);
		canvas.closePath();
		canvas.stroke();

        canvas.font = '1em sans-serif';
        canvas.strokeStyle = "rgba(0, 0, 0, 1)";
        canvas.strokeText("0", 5, 500);
        canvas.strokeText("5", 5, 450);
        canvas.strokeText("10", 5, 400);
        canvas.strokeText("15", 5, 350);
        canvas.strokeText("20", 5, 300);
        canvas.strokeText("25", 5, 250);
        canvas.strokeText("30", 5, 200);
        canvas.strokeText("35", 5, 150);
        canvas.strokeText("40", 5, 100);
        canvas.strokeText("45", 5, 50);

        if(this.csvIniciado == true) {
                        
            for(var i = 0; i< this.elementos.length; i++) {
                canvas.font = '1.5em sans-serif';
                canvas.strokeStyle = "rgba" + this.colores[i%this.colores.length];
                canvas.strokeText(this.elementos[i][0], 50 + i*150, 550);
            }

            
            var cols = this.elementos.length;
            var espacioPorColumna = (1990-15)/(this.elementos[0].length*2);
            var espacioElementos = (espacioPorColumna/cols);

            for(var i = 0; i< this.elementos.length; i++) {
                var start = espacioPorColumna;
                canvas.fillStyle = "rgba" + this.colores[i%this.colores.length];
                for(var j = 1; j<this.elementos[i].length; j++) {
                    canvas.fillRect(start+i*espacioElementos,500,espacioElementos, -10*this.elementos[i][j]);
                    start += espacioPorColumna*2
                }
            }
        }
    }

    procesarCSV(contenidos) {
        this.elementos.length = 0;
        contenidos[0].split(";").forEach((titulo) => {
            var arr = new Array();
            arr.push(titulo.trim());
            csvEd.elementos.push(arr);
        });

        for (var index = 1; index < contenidos.length; index++) {
            var element = contenidos[index].split(";");
            for(var j = 0; j < element.length; j++) {
                csvEd.elementos[j][index] = Number(element[j]);
            }
        }
    }

    procesaDrag(files) {
        $("h3").remove();
     
        if(files.length > 1) {
            $("h2").after("<h3>Por favor, introduzca un único archivo</h3>");
        } else {
            document.getElementsByTagName("input")[0].files = files;
            this.leerArchivoCSV(files);
        }
    }

}

let csvEd = new EditorCSV();

document.addEventListener('dragover', (evento) => {
    evento.preventDefault();
});

document.addEventListener('drop', (evento) => {
    evento.preventDefault();
    csvEd.procesaDrag(evento.dataTransfer.files);
});