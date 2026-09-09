import { calcular } from "./totalizador.js";

const form = document.querySelector("#totalizador-form");
const div = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const cantidad = Number(document.querySelector("#cantidad").value);
  const resultado = calcular({ cantidad });

  div.innerHTML = `<p>Cantidad de item: ${resultado.cantidad}</p>`;
});
