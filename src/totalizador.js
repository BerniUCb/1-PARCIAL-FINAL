const IMPUESTOS = {
  CA: 0.0825,
  AL: 0.04,
  NV: 0.08,
  UT: 0.0665,
  TX: 0.0625,
};

const CATEGORIAS = {
  "Alimentos":              { impuestoAdicional: 0,    descuentoAdicional: 0.02 },
  "Bebidas alcoholicas":    { impuestoAdicional: 0.07, descuentoAdicional: 0 },
  "Material de escritorio": { impuestoAdicional: 0,    descuentoAdicional: 0.015 },
  "Muebles":                { impuestoAdicional: 0.03, descuentoAdicional: 0 },
  "Electronicos":           { impuestoAdicional: 0.04, descuentoAdicional: 0.01 },
  "Vestimenta":             { impuestoAdicional: 0.02, descuentoAdicional: 0 },
  "Varios":                 { impuestoAdicional: 0,    descuentoAdicional: 0 },
};

function calcularDescuento(precioNeto) {
  if (precioNeto >= 30000) return { monto: precioNeto * 0.15, porcentaje: 15 };
  if (precioNeto >= 10000) return { monto: precioNeto * 0.10, porcentaje: 10 };
  if (precioNeto >= 7000) return { monto: precioNeto * 0.07, porcentaje: 7 };
  if (precioNeto >= 3000) return { monto: precioNeto * 0.05, porcentaje: 5 };
  if (precioNeto >= 1000) return { monto: precioNeto * 0.03, porcentaje: 3 };
  return { monto: 0, porcentaje: 0 };
}

export function calcular({ cantidad, precio, estado, categoria = "Varios" }) {
  if (cantidad <= 0) return { error: "Cantidad invalida" };
  if (precio <= 0) return { error: "Precio invalido" };
  if (estado && !IMPUESTOS[estado]) return { error: "Codigo de estado invalido" };
  const precioNeto = cantidad * precio;
  const tasaImpuesto = IMPUESTOS[estado] || 0;
  const { impuestoAdicional, descuentoAdicional } = CATEGORIAS[categoria] || CATEGORIAS["Varios"];
  const porcentajeImpuesto = (tasaImpuesto + impuestoAdicional) * 100;
  const impuesto = precioNeto * (tasaImpuesto + impuestoAdicional);
  const { monto: descuentoBase, porcentaje: porcentajeDescuentoBase } = calcularDescuento(precioNeto);
  const descuento = descuentoBase + (precioNeto * descuentoAdicional);
  const porcentajeDescuento = porcentajeDescuentoBase + (descuentoAdicional * 100);
  const precioTotal = precioNeto + impuesto - descuento;
  return { cantidad, precio, precioNeto, impuesto, porcentajeImpuesto, descuento, porcentajeDescuento, precioTotal, estado, categoria };
}
