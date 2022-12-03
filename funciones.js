let dic_ip = document.getElementById("dec");
let resto, resultadoBits = "";

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

// funcion que restringe datos obtenidos...
function funcion_restringe(var_arr) {
  let bool = true, aux, contador = 0;
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
    return var_arr;
  }
}

// Realizando la conversion...
function devuelveBits() {
  // función para restringir entrada y convertir de cadena a entero...
  let cadena = dic_ip.value;
  let salida  = "Analizando ip: "+ cadena +"...";
  let arr_ip = [];

  arr_ip = cadena.split(".");

  console.log(arr_ip);

  let arr_result = [];
  arr_result = funcion_restringe(arr_ip);

  // let numero = Number(dic_ip.value);

  // resultadoBits guarda resultado de bits pero invertido
  // while (numero > 1) {
  //   resto = numero % 2;
  //   numero = numero / 2;
  //   numero = parseInt(numero);
  //   resultadoBits += resto;
  // }

  // adjuntando número entero/final de la división
  // resultadoBits += numero;

  // console.log(resultadoBits);
  // document.getElementById("content").innerHTML =
  //   devuelveCadenabits(resultadoBits);

  // resultadoBits = "";

  document.getElementById("content").innerHTML = salida;

  console.log(arr_result);
}
