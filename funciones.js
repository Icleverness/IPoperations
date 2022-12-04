let dic_ip = document.getElementById("dec");
let prefijo = document.getElementById("pre");
let resto, resultadoBits = "", restringe = false, restringe_pre = false;

// funcion para invertir bits...
function invertirBits(var_arr) {

  for (let i = 0; i < 4; i++) {

    let cadena = var_arr[i];
    let arr = cadena.split('');
    let longitud = arr.length - 1, aux;
    let mitad = parseInt(longitud / 2);
    let k;

    for (let j = 0; j <= mitad ; j++) {
      
      k = longitud;
      k -= j;

      for (let l = longitud; l > mitad ; l--) {
        
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

  let aux, contador = 0, bool = true;

  for (let value of var_arr) { // restringiendo entrada...

    if (isNaN(Number(value))) {

      bool = false;

    }

    contador += 1;

  }

  if (bool == true && contador == 4) {
    
    for (let i = 0; i < 4; i++) { // convirtiendo var_arr a numeros...

      aux = var_arr[i];
      aux = Number(aux);
      var_arr[i] = aux;

    }

    restringe = true;
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

    resultadoBits += extraeOcteto;  // adjuntando número entero/final de la división

    while(resultadoBits.length != 8){

      resultadoBits += 0;

    }

    var_arr[i] = resultadoBits;

  }

  return var_arr;

}

function restringe_prefijo(p) {

  let bool = true;

  isNaN(Number(p))? bool = false : bool = true;

  if (bool == true && (p >= 0 && p <= 32)) {
    
    restringe_pre = true;
    return Number(p);

  }
  
}

// funcion main...
function main() {

  let pre = prefijo.value;
  let cadena = dic_ip.value;
  let arr_ip = [];

  arr_ip = cadena.split(".");
  arr_ip = funcion_restringe(arr_ip); // función para restringir entrada y convertir de cadena a entero...
  pre = restringe_prefijo(pre);

  if (restringe == true && restringe_pre == true) {

    let salida = `Analizando IP: ${cadena} /${pre}<br><br>`;
    console.log(arr_ip); 
    arr_ip = convierteIp_bits(arr_ip);  // funcion para convertir ip a bits
    arr_ip = invertirBits(arr_ip); // funcion para invertir bits...
    cadena = arr_ip.toString();
    cadena = cadena.replaceAll(',', '.');
    salida = `${salida}Convirtiendo IP a bits... <br> ${cadena}<br><br>`;

    document.getElementById("content").innerHTML = salida;
  }
  restringe_pre = false;
}
