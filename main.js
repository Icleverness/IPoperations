import { operaciones } from "./class_info_ip.js"

let dic_ip = document.getElementById("dec");
let prefijo = document.getElementById("pre");
let botonGenerar = document.getElementById("botonGenerar");
botonGenerar.addEventListener("click", main);

function main() {
  let pre = prefijo.value; // guarda prefijo...
  let aux = dic_ip.value; // almacena temporalmente a ip...
  let arr_ip = aux.split("."), arr_bits = [], mascara_bits = [], mascara_subred = [];
  const infoIP = new operaciones(arr_ip, pre);
  arr_ip = infoIP.funcion_restringe_ip();
  pre = infoIP.funcion_restringe_prefijo();
  if (infoIP.restringe_ip == true && infoIP.restringe_prefijo == true) {

    let salida = `Analizando IP: ${aux} /${pre}<br><br>`;
    let Gateway, broatcast;

    for (const ite of arr_ip) {
      arr_bits.push(ite);
    }

    infoIP.setconvierteIp_bits = arr_bits;
    arr_bits = infoIP.getconvierteIp_bits;
    arr_bits = infoIP.invertirBits();

    aux = arr_bits.toString();
    aux = aux.replaceAll(",", ".");
    salida = `${salida}Convirtiendo IP a bits... <br> ${aux}<br><br>Identificando máscara de subred... <br>`;
    mascara_bits = infoIP.muestraMascaraBits();
    aux = mascara_bits.toString();
    aux = aux.replaceAll(",", ".");
    salida = `${salida}${aux}<br>`;

    infoIP.setBuscaMascara = mascara_bits;
    mascara_subred = infoIP.getBuscaMascara;

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
    infoIP.restringe_prefijo = false;
  }
}