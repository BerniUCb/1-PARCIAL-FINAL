const IMPUESTOS = {
  CA: 0.0825,
  AL: 0.04,
  NV: 0.08,
  UT: 0.0665,
  TX: 0.0625,
};

const DESCUENTO_ENVIO_CLIENTE = {
  "Normal":             0,
  "Recurrente":         0.005,
  "Antiguo Recurrente": 0.01,
  "Especial":           0.015,
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

function calcularCostoEnvio(pesoVolumetrico, cantidad) {
  let costoPorUnidad;
  if (pesoVolumetrico <= 10) costoPorUnidad = 0;
  else if (pesoVolumetrico <= 20) costoPorUnidad = 3.5;
  else if (pesoVolumetrico <= 40) costoPorUnidad = 5;
  else if (pesoVolumetrico <= 80) costoPorUnidad = 6;
  else if (pesoVolumetrico <= 100) costoPorUnidad = 6.5;
  else if (pesoVolumetrico <= 200) costoPorUnidad = 8;
  else costoPorUnidad = 9;
  return costoPorUnidad * cantidad;
}

function calcularDescuento(precioNeto) {
  if (precioNeto >= 30000) return { monto: precioNeto * 0.15, porcentaje: 15 };
  if (precioNeto >= 10000) return { monto: precioNeto * 0.10, porcentaje: 10 };
  if (precioNeto >= 7000) return { monto: precioNeto * 0.07, porcentaje: 7 };
  if (precioNeto >= 3000) return { monto: precioNeto * 0.05, porcentaje: 5 };
  if (precioNeto >= 1000) return { monto: precioNeto * 0.03, porcentaje: 3 };
  return { monto: 0, porcentaje: 0 };
}

export function calcular({ cantidad, precio, estado, categoria = "Varios", pesoVolumetrico = 0, tipoCliente = "Normal" }) {
  if (cantidad <= 0) return { error: "Cantidad invalida" };
  if (precio <= 0) return { error: "Precio invalido" };
  if (estado && !IMPUESTOS[estado]) return { error: "Codigo de estado invalido" };
  if (categoria && !CATEGORIAS[categoria]) return { error: "Categoria invalida" };
  if (pesoVolumetrico < 0) return { error: "Peso volumetrico invalido" };
  if (tipoCliente && !DESCUENTO_ENVIO_CLIENTE.hasOwnProperty(tipoCliente)) return { error: "Tipo de cliente invalido" };
  const precioNeto = cantidad * precio;
  const tasaImpuesto = IMPUESTOS[estado] || 0;
  const { impuestoAdicional, descuentoAdicional } = CATEGORIAS[categoria] || CATEGORIAS["Varios"];
  const porcentajeImpuesto = (tasaImpuesto + impuestoAdicional) * 100;
  const impuesto = precioNeto * (tasaImpuesto + impuestoAdicional);
  const { monto: descuentoBase, porcentaje: porcentajeDescuentoNeto } = calcularDescuento(precioNeto);
  const descuento = descuentoBase + (precioNeto * descuentoAdicional);
  const porcentajeDescuento = porcentajeDescuentoNeto + (descuentoAdicional * 100);
  const descuentoEnvio = DESCUENTO_ENVIO_CLIENTE[tipoCliente] || 0;
  const costoEnvio = calcularCostoEnvio(pesoVolumetrico, cantidad) * (1 - descuentoEnvio);
  let descuentoFijo = 0;
  if (tipoCliente === "Recurrente" && categoria === "Alimentos" && precioNeto > 3000) descuentoFijo = 100;
  if (tipoCliente === "Especial" && categoria === "Electronicos" && precioNeto > 7000) descuentoFijo = 200;
  const precioTotal = precioNeto + impuesto - descuento - descuentoFijo + costoEnvio;
  const porcentajeImpuestoEstado = tasaImpuesto * 100;
  const porcentajeImpuestoCategoria = impuestoAdicional * 100;
  const porcentajeDescuentoCategoria = descuentoAdicional * 100;
  return { cantidad, precio, precioNeto, impuesto, porcentajeImpuesto, porcentajeImpuestoEstado, porcentajeImpuestoCategoria, descuento, porcentajeDescuento, porcentajeDescuentoNeto, porcentajeDescuentoCategoria, precioTotal, costoEnvio, descuentoFijo, estado, categoria, tipoCliente };
}
