let decimal = document.getElementById("dec");
        let resto, resultadoBits = "";

        // invirtiendo resultadoBitsInvertidos...
        function devuelveCadenabits(resultadoBitsInvertidos) {
            // transformando de cadena a arreglo...
            let arr = resultadoBitsInvertidos.split('');
            let longitud = arr.length - 1, aux;
            let mitad = parseInt(longitud / 2), k;

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

        // Realizando la conversion...
        function devuelveBits() {

            let numero = Number(decimal.value);

            // resultadoBits guarda resultado de bits pero inverso
            while (numero > 1) {
                resto = numero % 2;
                numero = numero / 2;
                numero = parseInt(numero);
                resultadoBits += resto;
            }

            // adjuntando número entero/final de la división
            resultadoBits += numero;

            // console.log(resultadoBits);
            document.getElementById("content").innerHTML = devuelveCadenabits(resultadoBits);

            resultadoBits = "";
        }