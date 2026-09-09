const IMPUESTOS = {
  CA: 0.0825,
  AL: 0.04,
  NV: 0.08,
  UT: 0.0665,
  TX: 0.0625,
};

function calcularDescuento(precioNeto) {
  if (precioNeto >= 7000) return precioNeto * 0.07;
  if (precioNeto >= 3000) return precioNeto * 0.05;
  if (precioNeto >= 1000) return precioNeto * 0.03;
  return 0;
}

export function calcular({ cantidad, precio, estado }) {
  const precioNeto = cantidad * precio;
  const tasaImpuesto = IMPUESTOS[estado] || 0;
  const impuesto = precioNeto * tasaImpuesto;
  const descuento = calcularDescuento(precioNeto);
  return { cantidad, precio, precioNeto, impuesto, descuento, estado };
}
