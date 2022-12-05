let mascara_subred = ["11111111", "11111111", "11111111", "11111111"];
let contador = 0,
  prefijo = 14,
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

// console.log(mascara_subred);

for (let i = 0; i < 4; i++) {// encuentra máscara de subred...

  let c = 0,
    octeto = 0;
  cadena = mascara_subred[i];
  arr_aux = cadena.split("");
  for (let j = 7; j >= 0; j--) {
    let aux;

    aux = Number(arr_aux[j]);
    octeto += aux * Math.pow(2, c);
    c += 1;
  }
  mascara_subred[i] = octeto;
}
console.log(mascara_subred);
