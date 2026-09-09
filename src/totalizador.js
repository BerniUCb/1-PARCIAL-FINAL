const IMPUESTOS = {
  CA: 0.0825,
  AL: 0.04,
  NV: 0.08,
  UT: 0.0665,
  TX: 0.0625,
};

function calcularDescuento(precioNeto) {
  if (precioNeto >= 30000) return { monto: precioNeto * 0.15, porcentaje: 15 };
  if (precioNeto >= 10000) return { monto: precioNeto * 0.10, porcentaje: 10 };
  if (precioNeto >= 7000) return { monto: precioNeto * 0.07, porcentaje: 7 };
  if (precioNeto >= 3000) return { monto: precioNeto * 0.05, porcentaje: 5 };
  if (precioNeto >= 1000) return { monto: precioNeto * 0.03, porcentaje: 3 };
  return { monto: 0, porcentaje: 0 };
}

export function calcular({ cantidad, precio, estado }) {
  if (cantidad <= 0) return { error: "Cantidad invalida" };
  if (precio <= 0) return { error: "Precio invalido" };
  if (estado && !IMPUESTOS[estado]) return { error: "Codigo de estado invalido" };
  const precioNeto = cantidad * precio;
  const tasaImpuesto = IMPUESTOS[estado] || 0;
  const porcentajeImpuesto = tasaImpuesto * 100;
  const impuesto = precioNeto * tasaImpuesto;
  const { monto: descuento, porcentaje: porcentajeDescuento } = calcularDescuento(precioNeto);
  const precioTotal = precioNeto + impuesto - descuento;
  return { cantidad, precio, precioNeto, impuesto, porcentajeImpuesto, descuento, porcentajeDescuento, precioTotal, estado };
}
