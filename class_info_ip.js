export class operaciones {
    constructor(ip, pre) {
        this.ip = ip;
        this.pre = pre;
        this.ip_bits = null;
        this.mascara = null;
        this.restringe_prefijo = false;
        this.restringe_ip = false;
    }

    funcion_restringe_ip() {
        let aux, contador = 0, bool = true;
        for (let value of this.ip) {
            if (isNaN(Number(value))) bool = false;
            contador += 1;
        }
        if (bool == true && contador == 4) {
            for (let i = 0; i < 4; i++) {
                aux = this.ip[i];
                aux = Number(aux);
                this.ip[i] = aux;
            }
            this.restringe_ip = true;
            return this.ip;
        }
    }

    funcion_restringe_prefijo() {
        let bool = true;
        isNaN(Number(this.pre)) ? (bool = false) : (bool = true);
        if (bool == true && this.pre >= 0 && this.pre <= 32) {
            this.restringe_prefijo = true;
            return Number(this.pre);
        }
    }

    get getconvierteIp_bits(){
        return this.ip_bits;
    }

    set setconvierteIp_bits(ip_bits){
        let extraeOcteto, resultadoBits, resto;
        for (let i = 0; i < 4; i++) {
            resultadoBits = "";
            extraeOcteto = ip_bits[i];

            while (extraeOcteto > 1) {
                resto = extraeOcteto % 2;
                extraeOcteto = extraeOcteto / 2;
                extraeOcteto = parseInt(extraeOcteto);
                resultadoBits += resto;
            }
            resultadoBits += extraeOcteto;
            while (resultadoBits.length != 8) {
                resultadoBits += 0;
            }
            ip_bits[i] = resultadoBits;
        }
        this.ip_bits = ip_bits;
    }

    invertirBits(){
        for (let i = 0; i < 4; i++) {
            let cadena = this.ip_bits[i];
            let arr = cadena.split("");
            let longitud = arr.length - 1,
                aux;
            let mitad = parseInt(longitud / 2);
            let k;
            for (let j = 0; j <= mitad; j++) {
                k = longitud;
                k -= j;

                for (let l = longitud; l > mitad; l--) {
                    if (l == k) {
                        aux = arr[j];
                        arr[j] = arr[l];
                        arr[l] = aux;
                    }
                }
            }
            cadena = arr.toString().replace(/(,)/gm, "");
            this.ip_bits[i] = cadena;
        }
        return this.ip_bits;
    }

    muestraMascaraBits() {
        let mascara_subred = ["11111111", "11111111", "11111111", "11111111"];
        let contador = 0,
            arr_aux = [],
            cadena;
        for (let i = 0; i < 4; i++) {//agregar ceros a la parte derecha según prefijo...
            cadena = mascara_subred[i];
            arr_aux = cadena.split("");

            for (let j = 0; j < 8; j++) {
                contador += 1;
                if (contador > this.pre) arr_aux[j] = "0";
            }
            cadena = arr_aux.toString().replace(/(,)/gm, "");
            mascara_subred[i] = cadena;
        }
        return mascara_subred;
    }

    get getBuscaMascara(){
        return this.mascara;
    }

    set setBuscaMascara(mascara){
        let arr_aux = [],
            cadena;

        for (let i = 0; i < 4; i++) {
            // encuentra máscara de subred...
            let c = 0,
                octeto = 0;
            cadena = mascara[i];
            arr_aux = cadena.split("");
            for (let j = 7; j >= 0; j--) {
                let aux;
                aux = Number(arr_aux[j]);
                octeto += aux * Math.pow(2, c);
                c += 1;
            }
            mascara[i] = octeto;
        }
        this.mascara = mascara;
    }
};
