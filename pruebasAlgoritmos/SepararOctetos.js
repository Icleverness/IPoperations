let arr = [];
let dic_ip = document.getElementById("dec");

function Funcion() {
  let cadena = dic_ip.value;
  let bool = true;

  arr = cadena.split(".");
  // console.log(arr);
  let aux,
    contador = 0;

  // restringiendo entrada...
  for (let value of arr) {
    if (isNaN(Number(value))) {
      bool = false;
    }
    contador += 1;
  }

  if (bool == true && contador == 4) {
    // convirtiendo arr a numeros...
    for (let i = 0; i < 4; i++) {
      aux = arr[i];
      aux = Number(aux);
      arr[i] = aux;
    }
    console.log(arr);
  }
}
