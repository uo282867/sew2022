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

class CalculadoraCientifica extends Calculadora {
    constructor() {
        super();
        this.listaOp = new Array();
        this.shiftFlag = false;
        this.hypFlag = false;
        this.operadoresBasicos = "+-**/%";
        this.piFlag = false;
        this.eliminable = true;
        this.numParentesis = 0;
        this.parentesisCerrado = false;
        this.unidadAngularActual = "RAD";
    }

    notacionCient() {
        if(this.valorActual != "") {
            this.valorActual = Number.parseFloat(new Number(this.valorActual)).toExponential();
        }
        
        this.actualizarPanel();
    }

    unidadAngular() {
        switch(this.unidadAngularActual) {
            case "RAD": this.unidadAngularActual = "GRAD"; break;
            case "GRAD": this.unidadAngularActual = "DEG"; break;
            case "DEG": this.unidadAngularActual = "RAD"; break;

            default: this.unidadAngularActual = "RAD";
        }

        document.getElementsByTagName("input")[0].value = this.unidadAngularActual;
    }

    addNumeros(){
         if(this.valorActual != "") {
            this.listaOp.push(new Number(this.valorActual));
        } else if (this.listaOp.length == 0) {
            this.listaOp.push(new Number(0));
        }

        this.valorActual = ""
        this.decimal = false;
    }

    digito(n) {
        if(this.piFlag) {
            this.listaOp.pop();
        }
        if(this.eliminable) {
            this.valorActual = "";
            this.parentesisCerrado = false;
        }
        if(this.parentesisCerrado == true) {
            this.listaOp.push("*");
        }

        this.valorActual += n;
        this.actualizarPanel();
    }

    operadorBasico(op) {
        this.addNumeros();

        var ultimoValor =  this.listaOp[this.listaOp.length-1];
        if(this.operadoresBasicos.includes(ultimoValor)) {
            this.listaOp.pop();
        }
        if(ultimoValor.toString().includes("(")) {
            this.listaOp.push(0);
        }

        this.listaOp.push(op);

        this.actualizarPanel();
        
    }


    sin() {
        this.abrirParInicializar();

        if(this.shiftFlag == true && this.hypFlag == true) {
            this.asinh();
        } else if(this.shiftFlag == true && this.hypFlag == false) {
            this.asin();
        } else if(this.shiftFlag == false && this.hypFlag == true) {
            this.sinh();
        } else {
            if(this.piFlag == true) {
                this.listaOp.pop();
                this.listaOp.push("Math.sin(");
                this.piFlag = false;
                this.pi();
            } else {            
                this.listaOp.push("Math.sin(");
                this.actualizarPanel();
            }
        }   
    }

    cos() {
        this.abrirParInicializar();

        if(this.shiftFlag == true && this.hypFlag == true) {
            this.acosh();
        } else if(this.shiftFlag == true && this.hypFlag == false) {
            this.acos();
        } else if(this.shiftFlag == false && this.hypFlag == true) {
            this.cosh();
        } else {
            if(this.piFlag == true) {
                this.listaOp.pop();
                this.listaOp.push("Math.cos(");
                this.piFlag = false;
                this.pi();
            } else {            
                this.listaOp.push("Math.cos(");
                this.actualizarPanel();
            }
        }
    }

    tan() {
        this.abrirParInicializar();

        if(this.shiftFlag == true && this.hypFlag == true) {
            this.atanh();
        } else if(this.shiftFlag == true && this.hypFlag == false) {
            this.atan();
        } else if(this.shiftFlag == false && this.hypFlag == true) {
            this.tanh();
        } else { 
            if(this.piFlag == true) {
                this.listaOp.pop();
                this.listaOp.push("Math.tan(");
                this.piFlag = false;
                this.pi();
            } else {            
                this.listaOp.push("Math.tan(");
                this.actualizarPanel();
            }
        }
    }

    logaritmo() {
        this.abrirParInicializar();

        if(this.piFlag == true) {
            this.listaOp.pop();
            this.listaOp.push("Math.log10(");
            this.piFlag = false;
            this.pi();
        } else {            
            this.listaOp.push("Math.log10(");
            this.actualizarPanel();
        }
    }

    diezElevado() {
        this.abrirParInicializar();

        if(this.piFlag == true) {
            this.listaOp.pop();
            this.listaOp.push("10**(");
            this.piFlag = false;
            this.pi();
        } else {            
            this.listaOp.push("10**(");
            this.actualizarPanel();
        }
    }

    ponerCeros() {
        this.operadorBasico("*");
        this.diezElevado();
    }

    factorial() {
        this.abrirParInicializar();

        if(this.piFlag == true) {
            this.listaOp.pop();
            this.listaOp.push("this.fact(");
            this.piFlag = false;
            this.pi();
        } else {            
            this.listaOp.push("this.fact(");
            this.actualizarPanel();
        }
    }

    fact(num) {
        var element = new Number(num);
        var result = 1;

        while (element >= 1 ) {
            result *= element;
            element--;
        }

        return new Number(result);
    }

    raiz() {
        this.abrirParInicializar();

        if(this.piFlag == true) {
            this.listaOp.pop();
            this.listaOp.push("Math.sqrt(");
            this.piFlag = false;
            this.pi();
        } else {            
            this.listaOp.push("Math.sqrt(");
            this.actualizarPanel();
        }
    }


    punto() {
        if(this.decimal == false) {
            this.decimal = true;
            if(this.piFlag == true) {
                this.listaOp.pop();
            }
            if(this.valorActual == "") {
                this.valorActual = "0";
            }
            this.valorActual += ".";
            
            this.actualizarPanel();
        }
    }

    actualizarPanel() {
        this.panel.textContent = this.toUserView();
        this.piFlag = false;
        this.eliminable = false;
        this.parentesisCerrado = false;
    }

    pi() {
        if (this.piFlag == false) {
            if(this.parentesisCerrado == true) {
                this.listaOp.push("*")
                this.parentesisCerrado = false;
            }

            if(this.valorActual != "") {
                this.valorActual = "";
                this.decimal = false;
            }

            this.listaOp.push(Math.PI)

            this.actualizarPanel();
            this.piFlag = true;
        }
    }

    igual() {
        this.piFlag = false;

        if(this.valorActual == "" && this.parentesisCerrado == false) {
            this.valorActual = "0";
        }
        this.addNumeros();

        this.valorActual = new Number(eval(this.toEval())).toString();

        this.showResults();
    }

    mRestar() {
        if(this.valorM == "notInicializado") {
            this.valorM = new Number(0);
        }

        this.valorM -= new Number(this.valorActual);
        
    }

    mAdd() {
        if(this.valorM == "notInicializado") {
            this.valorM = new Number(0);
        }

        this.valorM += new Number(this.valorActual);

    }

    mcero() {
        this.valorM = "notInicializado";
    }

    msubstitute() {
        this.valorM = new Number(this.valorActual);
    }

    mrecover() {
        if(this.valorM != "notInicializado") {
            this.valorActual = this.valorM.toString();
        }

        this.actualizarPanel();
    }


    eliminarCaracter() {
        if(this.valorActual != "") {
            this.valorActual = this.valorActual.substring(0, this.valorActual.length - 1)
        } else if (this.listaOp.length > 0) {
            var elemento = this.listaOp.pop();
            if(elemento != Math.PI && !isNaN(elemento)) {
                this.valorActual = elemento.toString();
                this.valorActual = this.valorActual.substring(0, this.valorActual.length - 1)
            }
            if(elemento.toString().includes("(")) {
                this.numParentesis--; 
            }
            if(elemento == ")") {
                this.numParentesis++; 
            }
            if(this.operadoresBasicos.includes(elemento)){
                this.valorActual = this.listaOp.pop().toString();
                if(this.valorActual == ")") {
                    this.numParentesis++;
                    this.valorActual = "";
                }
            }
        }

        if(this.valorActual.includes(".")) {
            this.decimal = true;
        } else {
            this.decimal = false;
        }
        
        this.actualizarPanel();

        if (this.listaOp[this.listaOp.length-1] == Math.PI) {
            this.piFlag = true;
        }

    }

    borrar() {
        if(this.valorActual == "" && !isNaN(this.listaOp[this.listaOp.length-1])) {
            this.listaOp.pop();
        }
        this.valorActual = "";
        this.decimal = false;
        this.parentesisCerrado = false;
        this.actualizarPanel();
    }

    reset() {
        super.reset();
        this.listaOp.length = 0;
        this.shiftFlag = false;
        this.piFlag = false;
        this.parentesisCerrado = false;
        this.numParentesis = 0;
    }

    cuadrado() {
        this.operadorBasico("**");
        this.valorActual = 2;
        this.actualizarPanel();
    }

    cambioSigno() {
        if(this.piFlag == true) {
            this.listaOp.pop();
            this.valorActual = "-1";
            this.operadorBasico("*");
            this.pi()
        } else {
            this.valorActual = new Number(eval("-1*" + new Number(this.valorActual))).toString();
            this.actualizarPanel();
        }        
    }

    abrePar() {
        this.abrirParInicializar();

        if(this.piFlag == true) {
            this.listaOp.pop();
            this.listaOp.push("(");
            this.piFlag = false;
            this.pi();
        } else {            
            this.listaOp.push("(");
            this.actualizarPanel();
        }
        
    }

    abrirParInicializar() {
        this.numParentesis++;

        if(this.parentesisCerrado == true) {
            this.listaOp.push("*")
            this.parentesisCerrado = false;
        }
    }

    cierraPar() {
        if(this.numParentesis>0) {
            var opAnt = this.listaOp.pop();
            if(this.valorActual == "" && opAnt.toString().includes("(")) {
                this.valorActual = "0";
                this.listaOp.push(opAnt);
            } else if (this.valorActual == "" && this.operadoresBasicos.includes(opAnt.toString())) {
                
            } else {
                this.listaOp.push(opAnt);
            }
            this.addNumeros();
            this.listaOp.push(")");
            this.numParentesis--;
            this.actualizarPanel();
            this.parentesisCerrado = true;
        }   
    }

    shift() {
        this.shiftFlag = !this.shiftFlag;
        this.cabiarBototnes();
    }

    hyp() {
        this.hypFlag = !this.hypFlag;
        this.cabiarBototnes();
    }

    cabiarBototnes() {
        var botones = document.getElementsByTagName("input");
        var btnSin = botones[10];
        var btnCos = botones[11];
        var btnTan = botones[12];

        if(this.shiftFlag == true && this.hypFlag == true) {
            btnSin.value = "asinh";
            btnCos.value = "acosh";
            btnTan.value = "atanh";
        } else if(this.shiftFlag == true && this.hypFlag == false) {
            btnSin.value = "asin";
            btnCos.value = "acos";
            btnTan.value = "atan";
        } else if(this.shiftFlag == false && this.hypFlag == true) {
            btnSin.value = "sinh";
            btnCos.value = "cosh";
            btnTan.value = "tanh";
        } else {
            btnSin.value = "sin";
            btnCos.value = "cos";
            btnTan.value = "tan";
        }
    }

    showResults() {
        this.panel.textContent = this.valorActual;
        this.listaOp.length = 0;
        this.eliminable = true;
    }

    toEval() {
        var cadena = "" 
        for (var i in this.listaOp) {
            cadena += this.listaOp[i];
        }

        while(this.numParentesis != 0) {
            cadena += ")";
            this.numParentesis--;
        }

        switch(this.unidadAngularActual) {
            case "RAD": break;
            case "DEG": 
                cadena = cadena.replace("Math.sin(", "Math.sin(Math.PI/180*");
                cadena = cadena.replace("Math.cos(", "Math.cos(Math.PI/180*");
                cadena = cadena.replace("Math.tan(", "Math.tan(Math.PI/180*");
                cadena = cadena.replace("Math.asin(", "180/Math.PI*Math.asin(");
                cadena = cadena.replace("Math.acos(", "180/Math.PI*Math.acos(");
                cadena = cadena.replace("Math.atan(", "180/Math.PI*Math.atan(");

                break;

            case "GRAD":
                cadena = cadena.replace("Math.sin(", "Math.sin(Math.PI/200*");
                cadena = cadena.replace("Math.cos(", "Math.cos(Math.PI/200*");
                cadena = cadena.replace("Math.tan(", "Math.tan(Math.PI/200*");
                cadena = cadena.replace("Math.asin(", "200/Math.PI*Math.asin(");
                cadena = cadena.replace("Math.acos(", "200/Math.PI*Math.acos(");
                cadena = cadena.replace("Math.atan(", "200/Math.PI*Math.atan(");

                break;
        }

        return cadena.replace("--", "+");
    }

    toUserView() {
        var cadena = "" 
        for (var i in this.listaOp) {
            switch(this.listaOp[i]) {
                case Math.PI : cadena += "pi"; break;
                case "Math.sin(": cadena += "sin("; break;
                case "Math.cos(": cadena += "cos("; break;
                case "Math.tan(": cadena += "tan("; break;
                case "Math.asin(": cadena += "asin("; break;
                case "Math.acos(": cadena += "acos("; break;
                case "Math.atan(": cadena += "atan("; break;
                case "Math.asinh(": cadena += "asinh("; break;
                case "Math.acosh(": cadena += "acosh("; break;
                case "Math.atanh(": cadena += "atanh("; break;
                case "Math.sinh(": cadena += "sinh("; break;
                case "Math.cosh(": cadena += "cosh("; break;
                case "Math.tanh(": cadena += "tanh("; break;
                case "this.fact(": cadena += "!("; break;
                case "Math.sqrt(": cadena += "raiz("; break;
                case "Math.log10(": cadena += "log("; break;
                
                default: cadena += this.listaOp[i];
            }
        }
        cadena += this.valorActual;

        return cadena;
    }


    asinh() {
        if(this.piFlag == true) {
            this.listaOp.pop();
            this.listaOp.push("Math.asinh(");
            this.piFlag = false;
            this.pi();
        } else {            
            this.listaOp.push("Math.asinh(");
            this.actualizarPanel();
        }
    }

    asin() {
        if(this.piFlag == true) {
            this.listaOp.pop();
            this.listaOp.push("Math.asin(");
            this.piFlag = false;
            this.pi();
        } else {            
            this.listaOp.push("Math.asin(");
            this.actualizarPanel();
        }
    }

    sinh() {
        if(this.piFlag == true) {
            this.listaOp.pop();
            this.listaOp.push("Math.sinh(");
            this.piFlag = false;
            this.pi();
        } else {            
            this.listaOp.push("Math.sinh(");
            this.actualizarPanel();
        }
    }

    acosh() {
        if(this.piFlag == true) {
            this.listaOp.pop();
            this.listaOp.push("Math.acosh(");
            this.piFlag = false;
            this.pi();
        } else {            
            this.listaOp.push("Math.acosh(");
            this.actualizarPanel();
        }
    }

    acos() {
        if(this.piFlag == true) {
            this.listaOp.pop();
            this.listaOp.push("Math.acos(");
            this.piFlag = false;
            this.pi();
        } else {            
            this.listaOp.push("Math.acos(");
            this.actualizarPanel();
        }
    }

    cosh() {
        if(this.piFlag == true) {
            this.listaOp.pop();
            this.listaOp.push("Math.cosh(");
            this.piFlag = false;
            this.pi();
        } else {            
            this.listaOp.push("Math.cosh(");
            this.actualizarPanel();
        }
    }

    atanh() {
        if(this.piFlag == true) {
            this.listaOp.pop();
            this.listaOp.push("Math.atanh(");
            this.piFlag = false;
            this.pi();
        } else {            
            this.listaOp.push("Math.atanh(");
            this.actualizarPanel();
        }
    }

    atan() {
        if(this.piFlag == true) {
            this.listaOp.pop();
            this.listaOp.push("Math.atan(");
            this.piFlag = false;
            this.pi();
        } else {            
            this.listaOp.push("Math.atan(");
            this.actualizarPanel();
        }
    }

    tanh() {
        if(this.piFlag == true) {
            this.listaOp.pop();
            this.listaOp.push("Math.tanh(");
            this.piFlag = false;
            this.pi();
        } else {            
            this.listaOp.push("Math.tanh(");
            this.actualizarPanel();
        }
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
            case '+': this.operadorBasico("+"); break;
            case '-': this.operadorBasico("-"); break;
            case '/': this.operadorBasico("/"); break;
            case 'x': this.operadorBasico("*"); break;
            case '=': this.igual(); break;
            case '.': this.punto(); break;
            case 'c': this.reset(); break;
            case 'q': this.borrar(); break;
            case 'Backspace': this.eliminarCaracter(); break;
            case '%': this.operadorBasico("%"); break;
            case 'ç': this.cambioSigno(); break;
            case 's': this.raiz(); break;
            case 'm': this.mrecover(); break;
            case 'n': this.mRestar(); break;
            case 'M': this.mAdd(); break;
            case '(': this.abrePar(); break;
            case ')': this.cierraPar(); break;
            case '!': this.factorial(); break;
        }
    }

} 



const calc = new CalculadoraCientifica();

document.addEventListener('keydown', (event) => {
    calc.realizarAccion(event.key);
    //console.log(event.key)
});