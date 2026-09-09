const IMPUESTOS = {
  CA: 0.0825,
};

export function calcular({ cantidad, precio, estado }) {
  const precioNeto = cantidad * precio;
  const tasaImpuesto = IMPUESTOS[estado] || 0;
  const impuesto = precioNeto * tasaImpuesto;
  return { cantidad, precio, precioNeto, impuesto, estado };
}
