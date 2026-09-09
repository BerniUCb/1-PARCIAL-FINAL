import { calcular } from "./totalizador.js";

const form = document.querySelector("#totalizador-form");
const div = document.querySelector("#resultado-div");
const cancelarBtn = document.querySelector("#cancelar-button");

cancelarBtn.addEventListener("click", () => {
  form.reset();
  div.innerHTML = "";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const cantidad = Number(document.querySelector("#cantidad").value);
  const precio = Number(document.querySelector("#precio").value);
  const estado = document.querySelector("#estado").value;
  const resultado = calcular({ cantidad, precio, estado });

  if (resultado.error) {
    div.innerHTML = `<p style="color:red">Error: ${resultado.error}</p>`;
    return;
  }

  div.innerHTML = `
    <p>Precio neto (${resultado.cantidad}*$${resultado.precio}): $${resultado.precioNeto}</p>
    <p>Descuento (${resultado.porcentajeDescuento}%): $${resultado.descuento.toFixed(2)}</p>
    <p>Impuesto para ${resultado.estado} (%${resultado.porcentajeImpuesto}): $${resultado.impuesto.toFixed(2)}</p>
    <p>Precio total (descuento e impuesto): $${resultado.precioTotal.toFixed(2)}</p>
  `;
});
