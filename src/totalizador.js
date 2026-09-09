export function calcular({ cantidad, precio }) {
  const precioNeto = cantidad * precio;
  return { cantidad, precio, precioNeto };
}
