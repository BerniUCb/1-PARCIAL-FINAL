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
  const categoria = document.querySelector("#categoria").value;
  const pesoVolumetrico = Number(document.querySelector("#pesoVolumetrico").value) || 0;
  const tipoCliente = document.querySelector("#tipoCliente").value;
  const resultado = calcular({ cantidad, precio, estado, categoria, pesoVolumetrico, tipoCliente });

  if (resultado.error) {
    div.innerHTML = `<p style="color:red">Error: ${resultado.error}</p>`;
    return;
  }

  div.innerHTML = `
    <p>Precio neto (${resultado.cantidad}*$${resultado.precio}): $${resultado.precioNeto}</p>
    <p>Descuento (${resultado.porcentajeDescuento}%): $${resultado.descuento.toFixed(2)}</p>
    <p>Impuesto para ${resultado.estado} (%${resultado.porcentajeImpuesto}): $${resultado.impuesto.toFixed(2)}</p>
    <p>Costo de envio: $${resultado.costoEnvio.toFixed(2)}</p>
    <p>Descuento fijo: $${resultado.descuentoFijo.toFixed(2)}</p>
    <p>Precio total (descuento e impuesto): $${resultado.precioTotal.toFixed(2)}</p>
  `;
});
