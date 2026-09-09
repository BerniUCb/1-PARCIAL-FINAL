import { calcular } from "./totalizador.js";

const form = document.querySelector("#totalizador-form");
const div = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const cantidad = Number(document.querySelector("#cantidad").value);
  const precio = Number(document.querySelector("#precio").value);
  const estado = document.querySelector("#estado").value.toUpperCase();
  const resultado = calcular({ cantidad, precio, estado });

  if (resultado.error) {
    div.innerHTML = `<p style="color:red">Error: ${resultado.error}</p>`;
    return;
  }

  div.innerHTML = `
    <p>Cantidad de item: ${resultado.cantidad}</p>
    <p>Precio por item: ${resultado.precio}</p>
    <p>Precio neto (${resultado.cantidad}*$${resultado.precio}): $${resultado.precioNeto}</p>
    <p>Impuesto para ${resultado.estado}: $${resultado.impuesto.toFixed(2)}</p>
    <p>Descuento: $${resultado.descuento.toFixed(2)}</p>
    <p>Precio total (neto + impuesto - descuento): $${resultado.precioTotal.toFixed(2)}</p>
  `;
});
