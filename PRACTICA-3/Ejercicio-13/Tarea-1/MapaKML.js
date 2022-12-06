class MapaKML {
    constructor() {
        this.mapaInicializado = false;
        this.nacimientos = new Map();
    }

    leerArchivo(archivo) {
        if(archivo.length > 0) {
            this.file = archivo[0];        
            var contenido;
            $("h3").remove();

            if(!this.file.name.includes(".kml")) {
                $("h2").before("<h3>No se ha introducido un archivo kml</h3>");
            } else {
                var lector = new FileReader();
                lector.onload = function (evento) {            
                    contenido = lector.result;
                    mpkml.procesarKml(contenido);
                }      
                lector.readAsText(this.file);
            }
        }
    }

    procesarKml(contenido) {
        var xml = new DOMParser().parseFromString(contenido, "text/xml");
        var placemarks = $('Document',xml).children();
        var dict = new Map();
        for (let i = 0; i < placemarks.length; i++) {
            var element = placemarks[i];
            //Para residencia cambiar por "residencia"
            if($('name', element).text().includes("nacimiento")) {
                var splitedPos = $('coordinates', element).text().split(",");
                var pos = {lat: Number(splitedPos[1]), lng: Number(splitedPos[0])};
                dict.set($('name', element).text(), pos);
            }
            
        }
        
        this.nacimientos = dict;
    }

    initMap(){  
        var centro = {lat: 43.3672702, lng: -5.8502461};
        this.mapaGeoposicionado = new google.maps.Map(document.getElementsByTagName('main')[0],{
            zoom: 7,
            center:centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    }

    getMapa() {
        if (this.mapaInicializado == false) {
            this.initMap();
            this.mapaInicializado = true;
        }

        for (var [k,pos] of this.nacimientos) {            
            var infoWindow = new google.maps.InfoWindow;
            infoWindow.setPosition(pos);
            infoWindow.setContent(k);
            infoWindow.open(this.mapaGeoposicionado);
            this.mapaGeoposicionado.setCenter(pos);
        }

    }

}

let mpkml = new MapaKML();