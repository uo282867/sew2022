class MapaJSON {
    constructor() {
        this.mapaInicializado = false;
        this.lugares = new Map();
    }

    leerArchivo(archivo) {
        if(archivo.length > 0) {
            this.file = archivo[0];
            $("h3").remove();
        
            var contenido;
            if(!this.file.name.includes(".GeoJSON")) {
                $("h2").before("<h3>No se ha introducido un archivo GeoJSON</h3>");
            } else {
                var lector = new FileReader();
                lector.onload = function (evento) {            
                    contenido = lector.result;
                    mpJSON.procesarGeoJSON(contenido);
                }      
                lector.readAsText(this.file);
            }
        }
    }

    procesarGeoJSON(contenido) {
        var geojson = JSON.parse(contenido);
        var placemarks = geojson.features;
        var dict = new Map();
        for (let i = 0; i < placemarks.length; i++) {
            var element = placemarks[i];
            var pos = {lat: Number(element.geometry.coordinates[1]), lng: Number(element.geometry.coordinates[0])};
            dict.set(element.properties.Name, pos);
        }
        
        this.lugares = dict;
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

        for (var [k,pos] of this.lugares) {            
            var infoWindow = new google.maps.InfoWindow;
            infoWindow.setPosition(pos);
            infoWindow.setContent(k);
            infoWindow.open(this.mapaGeoposicionado);
            this.mapaGeoposicionado.setCenter(pos);
        }

    }

}

let mpJSON = new MapaJSON();