let dic_ip = document.getElementById("dec");
let resto, resultadoBits = "", restringe = false;

// invirtiendo resultadoBitsInvertidos...
function devuelveCadenabits(resultadoBitsInvertidos) {
  // transformando de cadena a arreglo...
  let arr = resultadoBitsInvertidos.split("");
  let longitud = arr.length - 1,
    aux;
  let mitad = parseInt(longitud / 2),
    k;

  // algoritmo para cambiar de posicion los bits...
  for (let i = 0; i <= mitad; i++) {
    // k es la longitud de saltos que será recorrida de derecha a izquierda por cada iteración
    k = longitud;
    k -= i;

    for (let j = longitud; j > mitad; j--) {
      // cambiando posición de los bits...
      if (j == k) {
        // console.log(arr[i], arr[j], j);
        aux = arr[i];
        arr[i] = arr[j];
        arr[j] = aux;
      }
    }

    // convirtiendo de vector a cadena...
    let bits = arr.toString().replace(/(,)/gm, "");
    // mostrando resultado final...
    return bits;
  }
}

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
  // restringiendo entrada...

  for (let value of var_arr) {
    if (isNaN(Number(value))) {
      bool = false;
    }
    contador += 1;
  }

  if (bool == true && contador == 4) {
    // convirtiendo var_arr a numeros...
    for (let i = 0; i < 4; i++) {
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
    // console.log(var_arr[i]);
    while (extraeOcteto > 1) {
      resto = extraeOcteto % 2;
      extraeOcteto = extraeOcteto / 2;
      extraeOcteto = parseInt(extraeOcteto);
      resultadoBits += resto;
    }
    // adjuntando número entero/final de la división
    resultadoBits += extraeOcteto;

    while(resultadoBits.length != 8){
      resultadoBits += 0;
    }

    var_arr[i] = resultadoBits;
  }
  return var_arr;
}

// Realizando la conversion...
function devuelveBits() {
  
  let cadena = dic_ip.value;
  let arr_ip = [];

  arr_ip = cadena.split(".");

  console.log(arr_ip);

  // función para restringir entrada y convertir de cadena a entero...
  arr_ip = funcion_restringe(arr_ip);

  if (restringe == true) {
    let salida  = "Analizando ip: "+ cadena +"/..."+"<br><br>";
    console.log(arr_ip);

    // funcion para convertir ip a bits
    arr_ip = convierteIp_bits(arr_ip);

    console.log(arr_ip);

    // funcion para invertir bits...
    arr_ip = invertirBits(arr_ip);
    console.log(arr_ip);

    cadena = arr_ip.toString();
    cadena = cadena.replaceAll(',', '.');
    salida = salida + "convirtiendo ip a bits..." + "<br>"+cadena;
    document.getElementById("content").innerHTML = salida;

  }

  // console.log(resultadoBits);
  // document.getElementById("content").innerHTML =
  //   devuelveCadenabits(resultadoBits);
}
