import { calcular } from "./totalizador.js";

const form = document.querySelector("#totalizador-form");
const div = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const cantidad = Number(document.querySelector("#cantidad").value);
  const precio = Number(document.querySelector("#precio").value);
  const resultado = calcular({ cantidad, precio });

  div.innerHTML = `
    <p>Cantidad de item: ${resultado.cantidad}</p>
    <p>Precio por item: ${resultado.precio}</p>
  `;
});
