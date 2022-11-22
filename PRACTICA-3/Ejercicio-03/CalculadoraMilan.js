"use strict";
class Calculadora {
    
    constructor() {
        this.panel = document.getElementsByTagName("textarea")[0];
        this.ultimoValor = "";
        this.valorActual = "";
        this.ultimaOperacion = "Undefined";
        this.operacionActual = "Undefined";
        this.decimal = false;
        this.mostrarResultado = true;
        this.valorM = "notInicializado";
        this.mc = false;
        this.mr = false;
    }

    mMenos() {
        if(this.valorM == "notInicializado") {
            this.valorM = new Number(0);
        }

        this.igual();

        if(this.operacionActual == "=") {
            this.valorM -= new Number(this.ultimoValor);
        } else {
            this.valorM -= new Number(this.valorActual);
        }
    }

    mMas() {
        if(this.valorM == "notInicializado") {
            this.valorM = new Number(0);
        }
        
        this.igual();

        if(this.operacionActual == "=") {
            this.valorM += new Number(this.ultimoValor);
        } else {
            this.valorM += new Number(this.valorActual);
        }        
    }

    mrc() {
        if(this.valorM != "notInicializado") {
            if (this.mr == true) {
                this.valorM = "notInicializado";
                this.mr = false;
            } else {
                if(this.operacionActual == "=") {
                    this.ultimoValor = new Number(this.valorM);
                    this.panel.textContent = this.ultimoValor;
                } else {
                    this.valorActual = new Number(this.valorM);
                    this.panel.textContent = this.valorActual;
                }
                this.mr = true;
                this.mc = true;
            }
        }
    }

    raiz() {
        if(this.operacionActual == "=") {
            this.ultimoValor = Math.sqrt(new Number(this.ultimoValor));
            this.panel.textContent = this.ultimoValor;
        } else {
            this.valorActual = Math.sqrt(new Number(this.valorActual));
            this.panel.textContent = this.valorActual;
        }
        this.mr = false;
    }

    porcentaje() {
        if("+-1*/".includes(this.operacionActual)) {
            if(this.operacionActual == "*") {
                this.valorActual = new Number(this.valorActual) / 100;
            } else if(this.operacionActual == "/") {
                this.valorActual = new Number(this.valorActual) / 100;
            } else {
                if(this.valorActual == "") {
                    this.valorActual = new Number(this.ultimoValor) * new Number(this.ultimoValor) / 100;
                } else {
                    this.valorActual = new Number(this.ultimoValor) * new Number(this.valorActual) / 100;
                }                
            }
            this.panel.textContent = this.valorActual.toString();
        }

        if (this.operacionActual == "=") {
            this.ultimoValor = new Number(this.ultimoValor) * new Number(this.ultimoValor) / 100;

            this.panel.textContent = this.ultimoValor;
        }
        this.mr = false;
    }

    suma() {
        if("+-1*/".includes(this.operacionActual)) {            
            this.igual();
            this.mostrarResultado = false;
        }

        this.ultimaOperacion = this.operacionActual;

        if(this.ultimaOperacion != "=") {
            this.ultimoValor = this.valorActual;
            if(this.ultimaOperacion == "Undefined") {
                this.ultimaOperacion = "+";
            }
        }
            
        this.operacionActual = "+";

        this.valorActual = "";
        this.decimal = false;

        if(this.mostrarResultado == true) {
            this.panel.textContent = this.valorActual;
        }

        this.mostrarResultado = true;
        this.mr = false;
    }

    resta() {
        if("+-1*/".includes(this.operacionActual)) {            
            this.igual();
            this.mostrarResultado = false;
        }

        this.ultimaOperacion = this.operacionActual;

        if(this.ultimaOperacion != "=") {
            this.ultimoValor = this.valorActual;
            if(this.ultimaOperacion == "Undefined") {
                this.ultimaOperacion = "-1*";
            }
        }
            
        this.operacionActual = "-1*";

        this.valorActual = "";
        this.decimal = false;
       
        if(this.mostrarResultado == true) {
            this.panel.textContent = this.valorActual;
        }

        this.mostrarResultado = true;
        this.mr = false;
    }

    division() {
        if("+-1*/".includes(this.operacionActual)) {            
            this.igual();
            this.mostrarResultado = false;
        }

        this.ultimaOperacion = this.operacionActual;

        if(this.ultimaOperacion != "=") {
            this.ultimoValor = this.valorActual;
            if(this.ultimaOperacion == "Undefined") {
                this.ultimaOperacion = "/";
            }
        }
            
        this.operacionActual = "/";

        this.valorActual = "";
        this.decimal = false;
        
        if(this.mostrarResultado == true) {
            this.panel.textContent = this.valorActual;
        }

        this.mostrarResultado = true;
        this.mr = false;
    }

    multiplicacion() {
        if("+-1*/".includes(this.operacionActual)) {            
            this.igual();
            this.mostrarResultado = false;
        }

        this.ultimaOperacion = this.operacionActual;

        if(this.ultimaOperacion != "=") {
            this.ultimoValor = this.valorActual;
            if(this.ultimaOperacion == "Undefined") {
                this.ultimaOperacion = "*";
            }
        }
            
        this.operacionActual = "*";

        this.valorActual = "";
        this.decimal = false;
        
        if(this.mostrarResultado == true) {
            this.panel.textContent = this.valorActual;
        }

        this.mostrarResultado = true;
        this.mr = false;
    }

    igual(){
        if(this.operacionActual != "=") {
            this.ultimaOperacion = this.operacionActual;
        }
        this.operacionActual = "=";

        if(this.ultimaOperacion == "Undefined") {
            this.ultimoValor = new Number(this.valorActual);
        } else {
            if(this.valorActual == "") {
                this.valorActual = this.ultimoValor;
                if(this.ultimaOperacion == "/")
                    this.ultimoValor = 1;
            }
            
            this.ultimoValor = new Number(eval(new Number(this.ultimoValor) + this.ultimaOperacion + new Number(this.valorActual)));
        }

        this.panel.textContent = this.ultimoValor;
        this.decimal = false;
        this.mr = false;
    }

    reset() {
        this.ultimoValor = "";
        this.ultimaOperacion = "Undefined";
        this.operacionActual = "Undefined";
        this.valorActual = "";
        this.panel.textContent = new Number(this.valorActual);
        this.decimal = false;
        this.mr = false;
    }

    borrar() {
        if(this.operacionActual == "=") {
            this.ultimoValor = "";
        } else {
            this.valorActual = "";
        }

        this.panel.textContent = new Number(0);

        this.decimal = false;
        this.mr = false;
    }

    digito(numero) {
        if(this.mc == true) {
            this.mc = false;
            this.valorActual = "";
        }
        
        if(this.operacionActual == "=") {
            this.valorActual = "";
            this.operacionActual = "Undefined"
        }           

        this.valorActual = this.valorActual.toString() + numero;
        //console.log(this.valorActual);
        this.panel.textContent = this.valorActual;
        this.mr = false;
    }

    punto() {
        if(this.decimal == false) {
            this.valorActual = this.valorActual.toString() + ".";
            this.panel.textContent = this.valorActual;
            this.decimal = true;
        }
        this.mr = false;
    }
    
    cambioSigno() {
        if(this.operacionActual == "=") {
            this.ultimoValor = new Number(eval("-1*" + new Number(this.ultimoValor)));

            this.panel.textContent = this.ultimoValor;

        } else {
            if(this.valorActual == "") {
                this.valorActual = this.ultimoValor;
            }

            this.valorActual = new Number(eval("-1*" + new Number(this.valorActual)));

            this.panel.textContent = this.valorActual;
        }  
        this.mr = false;      
    }

    realizarAccion(tecla) {
        switch(tecla) {
            case '0': this.digito(0); break;
            case '1': this.digito(1); break;
            case '2': this.digito(2); break;
            case '3': this.digito(3); break;
            case '4': this.digito(4); break;
            case '5': this.digito(5); break;
            case '6': this.digito(6); break;
            case '7': this.digito(7); break;
            case '8': this.digito(8); break;
            case '9': this.digito(9); break;
            case '+': this.suma(); break;
            case '-': this.resta(); break;
            case '/': this.division(); break;
            case 'x': this.multiplicacion(); break;
            case '=': this.igual(); break;
            case '.': this.punto(); break;
            case 'c': this.reset(); break;
            case 'Backspace': this.borrar(); break;
            case '%': this.porcentaje(); break;
            case 'ç': this.cambioSigno(); break;
            case 's': this.raiz(); break;
            case 'm': this.mrc(); break;
            case 'n': this.mMenos(); break;
            case 'M': this.mMas(); break;
        }
    }
}

const calc = new Calculadora();

document.addEventListener('keydown', (event) => {
    calc.realizarAccion(event.key);
    //console.log(event.key)
});