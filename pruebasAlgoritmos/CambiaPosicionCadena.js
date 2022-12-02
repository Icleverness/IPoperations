let cadena = "iberson";
let arr = cadena.split("");

console.log(arr.length);

let longitud = arr.length - 1,
  aux;

let mitad = parseInt(longitud / 2);
console.log(mitad);

let k;

for (let i = 0; i <= mitad; i++) {
  k = longitud;
  k -= i;

  for (let j = longitud; j > mitad; j--) {
    if (j == k) {
      console.log(arr[i], arr[j], j);
      aux = arr[i];
      arr[i] = arr[j];
      arr[j] = aux;
    }
  }
}
console.log(arr);
console.log(arr.toString().replace(/(,)/gm, ""));
