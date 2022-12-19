"use strict";
class CalculadoraRPN {

    constructor() {
        this.pila = new Array();
        this.textoMostrar = "";
        this.decimal = false;
    }

    reset() {
        this.pila = new Array();
        this.textoMostrar = "";
        this.decimal = false;
        this.mostrarDatos();
        this.escribe();
    }

    enter() {
        this.pila.push(new Number(this.textoMostrar));
        this.textoMostrar = "";
        this.mostrarDatos();
        this.escribe();
    }    
    
    mostrarDatos() {
        var texto = "";
        for (var i in this.pila) {
            texto += "Posicion " + i + ": Valor " + this.pila[i] + "\n";
        }

        document.getElementsByTagName("textarea")[0].textContent = texto;

        this.decimal = false;
    }

    suma() {
        if (this.pila.length >= 2) {
            var elemento1 = this.pila.pop();
            var elemento2 = this.pila.pop();
            this.pila.push(new Number(elemento1 + elemento2))
            this.mostrarDatos()
        }
    }

    resta() {
        if (this.pila.length >= 2) {
            var elemento1 = this.pila.pop();
            var elemento2 = this.pila.pop();
            this.pila.push(new Number(elemento2 - elemento1))
            this.mostrarDatos()
        }
    }

    multiplicacion() {
        if (this.pila.length >= 2) {
            var elemento1 = this.pila.pop();
            var elemento2 = this.pila.pop();
            this.pila.push(new Number(elemento1 * elemento2))
            this.mostrarDatos()
        }
    }

    division() {
        if (this.pila.length >= 2) {
            var elemento1 = this.pila.pop();
            var elemento2 = this.pila.pop();
            this.pila.push(new Number(elemento2 / elemento1))
            this.mostrarDatos()
        }
    }

    sqrt() {
        if (this.pila.length >= 1) {
            var elemento1 = this.pila.pop();
            this.pila.push(new Number(Math.sqrt(elemento1)));
            this.mostrarDatos();
        }
    }

    sin() {
        if (this.pila.length >= 1) {
            var elemento1 = this.pila.pop();
            this.pila.push(new Number(Math.sin(elemento1)));
            this.mostrarDatos();
        }
    }

    cos() {
        if (this.pila.length >= 1) {
            var elemento1 = this.pila.pop();
            this.pila.push(new Number(Math.cos(elemento1)));
            this.mostrarDatos();
        }
    }

    tan() {
        if (this.pila.length >= 1) {
            var elemento1 = this.pila.pop();
            this.pila.push(new Number(Math.tan(elemento1)));
            this.mostrarDatos();
        }
    }

    asin() {
        if (this.pila.length >= 1) {
            var elemento1 = this.pila.pop();
            if(elemento1 <= 1 && elemento1 >= -1) {
                this.pila.push(new Number(Math.asin(elemento1)));
                this.mostrarDatos();
            }            
        }
    }

    acos() {
        if (this.pila.length >= 1) {
            var elemento1 = this.pila.pop();
            if(elemento1 <= 1 && elemento1 >= -1) {
                this.pila.push(new Number(Math.acos(elemento1)));
                this.mostrarDatos();
            }
        }
    }

    atan() {
        if (this.pila.length >= 1) {
            var elemento1 = this.pila.pop();
            if(elemento1 <= 1 && elemento1 >= -1) {
                this.pila.push(new Number(Math.atan(elemento1)));
                this.mostrarDatos();
            }
        }
    }

    numero(n) {
        this.textoMostrar = this.textoMostrar.toString() + n;
        this.escribe();
    }

    punto() {
        if(this.decimal == false) {
            this.decimal = true;
            this.textoMostrar = new Number(this.textoMostrar) + ".";
        }
        this.escribe();
    }

    borrar() {
        if(this.textoMostrar.length > 0)
            if(this.textoMostrar.charAt(this.textoMostrar.length - 1) == '.')
                this.decimal = false;
            this.textoMostrar = this.textoMostrar.substring(0, this.textoMostrar.length - 1);
        this.escribe();
    }

    escribe() {
        document.getElementsByTagName("input")[0].value = this.textoMostrar;
    }

    realizarAccion(tecla) {
        switch(tecla) {
            case '0': this.numero(0); break;
            case '1': this.numero(1); break;
            case '2': this.numero(2); break;
            case '3': this.numero(3); break;
            case '4': this.numero(4); break;
            case '5': this.numero(5); break;
            case '6': this.numero(6); break;
            case '7': this.numero(7); break;
            case '8': this.numero(8); break;
            case '9': this.numero(9); break;
            case '+': this.suma(); break;
            case '-': this.resta(); break;
            case '/': this.division(); break;
            case 'x': this.multiplicacion(); break;
            case 'Enter': this.enter(); break;
            case '.': this.punto(); break;
            case 'Backspace': this.borrar(); break;
            case 'c': this.reset(); break;
            case 's': this.sin(); break;
            case 'o': this.cos(); break;
            case 't': this.tan(); break;
            case 'S': this.asin(); break;
            case 'O': this.acos(); break;
            case 'T': this.atan(); break;
        }
    }

}

let calc = new CalculadoraRPN();

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    calc.realizarAccion(event.key);
    //console.log(event.key)
});