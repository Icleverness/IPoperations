// solicita número...
let numeroDecimal = Number(prompt("escribe un decimal"));
// let decimal = Number(document.getElementById("dec"));
let dividendo, resto, resultadoBits = "";

// resultadoBits guarda resultado de bits pero inverso
while (numeroDecimal > 1) {
    resto = numeroDecimal % 2;
    numeroDecimal = numeroDecimal / 2;
    numeroDecimal = parseInt(numeroDecimal);
    resultadoBits += resto;
}

// adjuntando número entero/final de la división
resultadoBits += numeroDecimal;

// convirtiendo de cadena a vector
let arr = resultadoBits.split('');
let longitud = arr.length - 1, aux;
let mitad = parseInt(longitud / 2), k;

// algoritmo para cambiar de posicion los bits...
for (let i = 0; i <= mitad; i++) {

    // k es la longitud de saltos que será recorrida de derecha a izquierda por cada iteración
    k = longitud;
    k -= i;

    for (let j = longitud; j > mitad; j--) {

        // cambiando de posición de los bits...
        if (j == k) {

            console.log(arr[i], arr[j], j);
            aux = arr[i];
            arr[i] = arr[j];
            arr[j] = aux;
            

        }
    }
}

// convirtiendo de vector a cadena...
let bits = arr.toString().replace(/(,)/gm, "");
// mostrando resultado final...
document.write(bits);