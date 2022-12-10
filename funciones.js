let dic_ip = document.getElementById("dec");
let prefijo = document.getElementById("pre");
let resto,
  resultadoBits = "",
  restringe_ip = false,
  restringe_pre = false;

// funcion para invertir bits...
function invertirBits(var_arr) {
  for (let i = 0; i < 4; i++) {
    let cadena = var_arr[i];
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
    var_arr[i] = cadena;
  }

  return var_arr;
}

// funcion que restringe datos obtenidos...
function funcion_restringe(var_arr) {
  let aux,
    contador = 0,
    bool = true;

  for (let value of var_arr) {
    // restringiendo entrada...

    if (isNaN(Number(value))) {
      bool = false;
    }

    contador += 1;
  }

  if (bool == true && contador == 4) {
    for (let i = 0; i < 4; i++) {
      // convirtiendo var_arr a numeros...

      aux = var_arr[i];
      aux = Number(aux);
      var_arr[i] = aux;
    }

    restringe_ip = true;
    return var_arr;
  }
}

// Convirtiendo ip a bits...
function convierteIp_bits(var_arr) {
  let extraeOcteto;

  for (let i = 0; i < 4; i++) {
    resultadoBits = "";
    extraeOcteto = var_arr[i];

    while (extraeOcteto > 1) {
      resto = extraeOcteto % 2;
      extraeOcteto = extraeOcteto / 2;
      extraeOcteto = parseInt(extraeOcteto);
      resultadoBits += resto;
    }

    resultadoBits += extraeOcteto; // adjuntando número entero/final de la división

    while (resultadoBits.length != 8) {
      resultadoBits += 0;
    }

    var_arr[i] = resultadoBits;
  }

  return var_arr;
}

function restringe_prefijo(p) {
  let bool = true;

  isNaN(Number(p)) ? (bool = false) : (bool = true);

  if (bool == true && p >= 0 && p <= 32) {
    restringe_pre = true;
    return Number(p);
  }
}

// identificando mascara de subred...
function BuscarMascaraSubred(mascara) {
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
  return mascara;
}

function muestraMascaraBits(prefijo) {
  let mascara_subred = ["11111111", "11111111", "11111111", "11111111"];
  let contador = 0,
    arr_aux = [],
    cadena;

  for (let i = 0; i < 4; i++) {//agregar ceros a la parte derecha según prefijo...

    cadena = mascara_subred[i];
    arr_aux = cadena.split("");

    for (let j = 0; j < 8; j++) {
      contador += 1;
      if (contador > prefijo) {
        arr_aux[j] = "0";
      }
    }

    cadena = arr_aux.toString().replace(/(,)/gm, "");
    mascara_subred[i] = cadena;
  }
  return mascara_subred;
}

// funcion main...
function main() {
  let pre = prefijo.value; // guarda prefijo...
  let aux = dic_ip.value; // almacena temporalmente a ip...
  let arr_ip = [], arr_bits = []; 
  let mascara_subred = [], mascara_bits = [];

  arr_ip = aux.split("."); // guarda cada octeto de ip en una posicion de array...
  arr_ip = funcion_restringe(arr_ip); // función para restringir entrada y convertir de cadena a entero...
  pre = restringe_prefijo(pre); // función para restringir prefijo...

  if (restringe_ip == true && restringe_pre == true) { //evalua si prefijo y direccion ip son válidas...
    let salida = `Analizando IP: ${aux} /${pre}<br><br>`;
    let Gateway, broatcast;

    for (let i = 0; i < 4; i++) { // creando otro array para evitar mutabilidad...
      arr_bits.push(arr_ip[i]);
    }

    arr_bits = convierteIp_bits(arr_bits); // funcion para convertir ip a bits
    arr_bits = invertirBits(arr_bits); // funcion para invertir bits...
    console.log(arr_ip);

    aux = arr_bits.toString(); // convierte arreglo a cadena
    aux = aux.replaceAll(",", "."); // reemplaza la coma por el punto

    salida = `${salida}Convirtiendo IP a bits... <br> ${aux}<br><br>`;
    salida = `${salida}Identificando máscara de subred... <br>`;

    mascara_bits = muestraMascaraBits(pre); // muestra máscara de subred a bits...

    aux = mascara_bits.toString();
    aux = aux.replaceAll(",", ".");

    salida = `${salida}${aux}<br>`;

    mascara_subred = BuscarMascaraSubred(mascara_bits); // asigna máscara de subred...
    
    aux = mascara_subred.toString();
    aux = aux.replaceAll(",", ".");
   
    arr_ip[3] = 1;
    Gateway = arr_ip.toString();
    Gateway = Gateway.replaceAll(",", ".");
    salida = `${salida}${aux}<br><br>Gateway recomendada...<br>${Gateway}`;

    arr_ip[3] = 255;
    broatcast = arr_ip.toString();
    broatcast = broatcast.replaceAll(",", ".");

    salida = `${salida}<br><br>Identificando Broatcast...<br>${broatcast}<br><br>`;


    document.getElementById("content").innerHTML = salida;
  }
  restringe_pre = false;
}
