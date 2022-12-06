"use strict"
class JQuerryIntroduction {
    constructor(){
        this.filasTabla = 3;
        this.colsTabla = 3;
        this.recorrido = false;
        this.parrafosActivos = true;
    }

    ocultarPF() {
        $("p:first").hide();
    }

    ocultarPL() {
        $("p:last").hide();
    }

    ocultarP() {
        $("p").hide();
    }

    mostrarPF() {
        $("p:first").show();
    }

    mostrarPL() {
        $("p:last").show();
    }

    mostrarP() {
        $("p").show();
    }

    // insertFT() {
    //     var col = "Columna0"
    //     var fila = 'Fila' + (this.filasTabla);
    //     var nuevaFila = '<tr><th scope="row" id="' + fila + '" headers="Numeros">' + fila + '</th>';
    //     for(var i = 1; i<this.colsTabla; i++) {
    //         col = col.replace(i-1, i);
    //         nuevaFila += '\n<td headers="' + fila + " " + col +'">' + Math.floor(Math.random()*100) + "</td>";
    //     }
    //     nuevaFila += "\n</tr>"
    //     this.filasTabla++;

    //     $("table").append(nuevaFila);
    // }

    // insertCT() {
    //     var col = "Columan" + (this.colsTabla);
    //     var fila = 'Fila0';
    //     var nuevaCol = '<th scope="col" id="' + col + '" >' + col + '</th>';
    //     $("tr:first-child").append(nuevaCol);

    //     for(var i = 1; i<this.filasTabla; i++) {
    //         fila = fila.replace(i-1, i);
    //         nuevaCol = '<td headers="' + fila + " " + col +'">' + Math.floor(Math.random()*100) + "</td>\n";
    //         $("tr:nth-child("+(i+1)+")").append(nuevaCol);
    //     }

    //     this.colsTabla++;        
    // }

    // insertAllT() {
    //     this.insertCT();
    //     this.insertFT();
    // }

    elimParr() {  
        if(this.parrafosActivos == true) {
            $("p").remove();
            this.parrafosActivos = false;
        }
    }

    añadirParr() {  
        var parrafos = '<p>Párrafo de ejemplo</p>';
        $("h3").before(parrafos);
        this.parrafosActivos = true;

    }

    sumarFilasCol() {
        var suma = 0;
        
        $("tr").text().trim().split("\n").forEach(element => {
            var x = element.replace("Etiqueta padre : <TR> elemento : <TD> valor:", "");
            if(!isNaN(x)) {
                suma += new Number(x);
            }
        });
        // console.log(suma);
        // for(var i = 1; i<this.filasTabla; i++) {
        //     var array = $("tr:nth-child("+(i+1)+")").text().trim().split("\n");            
        //     for(var j = 1; j<this.colsTabla; j++) {
        //         console.log(array[j]);
        //         if(!isNaN(array[j])) {
        //             suma += new Number(array[j]);
        //         }
        //     }
        // }
        
        alert("Suma de filas y columnas:" + suma);
    }

    recorrerElementos() {
        var texto = "";
        $("*", document.body).each(function() {
            var etiquetaPadre = $(this).parent().get(0).tagName;
            var etiquetaActual = $(this).get(0).tagName;
            if(!$(this).text().includes("Etiqueta padre : <")) {
                texto += "Etiqueta padre : <"  + etiquetaPadre + "> elemento : <" + etiquetaActual + ">\n";
            }
        });
        
        var recorrido = document.createElement("pre");
        $(recorrido).text(texto);
        var section = document.createElement("section");
        var h2 = document.createElement("h2");
        $(h2).text("Recorrido del arbol DOM")
        section.append(h2);
        section.append(recorrido);
        $("main").append(section);        
    }

}

let q = new JQuerryIntroduction();