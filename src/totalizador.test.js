import { calcular } from "./totalizador.js";

describe("Totalizador", () => {
  it("deberia mostrar la cantidad de producto", () => {
    const resultado = calcular({ cantidad: 20 });
    expect(resultado.cantidad).toEqual(20);
  });

  it("deberia mostrar el precio de producto", () => {
    const resultado = calcular({ cantidad: 20, precio: 3 });
    expect(resultado.precio).toEqual(3);
  });

  it("deberia mostrar el precio neto (cantidad x precio)", () => {
    const resultado = calcular({ cantidad: 20, precio: 3 });
    expect(resultado.precioNeto).toEqual(60);
  });

  it("deberia calcular el impuesto para CA (8.25%)", () => {
    const resultado = calcular({ cantidad: 20, precio: 3, estado: "CA" });
    expect(resultado.impuesto).toBeCloseTo(4.95);
  });

  it("deberia calcular el impuesto para AL (4%)", () => {
    const resultado = calcular({ cantidad: 20, precio: 3, estado: "AL" });
    expect(resultado.impuesto).toBeCloseTo(2.4);
  });

  it("deberia calcular el impuesto para NV (8%)", () => {
    const resultado = calcular({ cantidad: 20, precio: 3, estado: "NV" });
    expect(resultado.impuesto).toBeCloseTo(4.8);
  });

  it("deberia calcular el impuesto para UT (6.65%)", () => {
    const resultado = calcular({ cantidad: 20, precio: 3, estado: "UT" });
    expect(resultado.impuesto).toBeCloseTo(3.99);
  });

  it("deberia calcular el impuesto para TX (6.25%)", () => {
    const resultado = calcular({ cantidad: 20, precio: 3, estado: "TX" });
    expect(resultado.impuesto).toBeCloseTo(3.75);
  });

  it("deberia aplicar descuento de 3% cuando el precio neto es mayor o igual a 1000", () => {
    const resultado = calcular({ cantidad: 500, precio: 3, estado: "TX" });
    expect(resultado.descuento).toBeCloseTo(45);
  });

  it("deberia aplicar descuento de 5% cuando el precio neto es mayor o igual a 3000", () => {
    const resultado = calcular({ cantidad: 200, precio: 20, estado: "TX" });
    expect(resultado.descuento).toBeCloseTo(200);
  });

  it("deberia aplicar descuento de 7% cuando el precio neto es mayor o igual a 7000", () => {
    const resultado = calcular({ cantidad: 100, precio: 80, estado: "TX" });
    expect(resultado.descuento).toBeCloseTo(560);
  });

  it("deberia aplicar descuento de 10% cuando el precio neto es mayor o igual a 10000", () => {
    const resultado = calcular({ cantidad: 200, precio: 60, estado: "TX" });
    expect(resultado.descuento).toBeCloseTo(1200);
  });

  it("deberia aplicar descuento de 15% cuando el precio neto es mayor o igual a 30000", () => {
    const resultado = calcular({ cantidad: 100, precio: 350, estado: "TX" });
    expect(resultado.descuento).toBeCloseTo(5250);
  });

  it("deberia calcular el precio total (neto + impuesto - descuento)", () => {
    const resultado = calcular({ cantidad: 20, precio: 3, estado: "TX" });
    expect(resultado.precioTotal).toBeCloseTo(63.75);
  });

  it("deberia retornar error cuando la cantidad es negativa", () => {
    const resultado = calcular({ cantidad: -5, precio: 3, estado: "TX" });
    expect(resultado.error).toBe("Cantidad invalida");
  });

  it("deberia retornar error cuando la cantidad es cero", () => {
    const resultado = calcular({ cantidad: 0, precio: 3, estado: "TX" });
    expect(resultado.error).toBe("Cantidad invalida");
  });

  it("deberia retornar error cuando el precio es negativo", () => {
    const resultado = calcular({ cantidad: 20, precio: -5, estado: "TX" });
    expect(resultado.error).toBe("Precio invalido");
  });

  it("deberia retornar error cuando el precio es cero", () => {
    const resultado = calcular({ cantidad: 20, precio: 0, estado: "TX" });
    expect(resultado.error).toBe("Precio invalido");
  });

  it("deberia retornar error cuando el codigo de estado es invalido", () => {
    const resultado = calcular({ cantidad: 20, precio: 3, estado: "ZZ" });
    expect(resultado.error).toBe("Codigo de estado invalido");
  });

  it("deberia retornar el porcentaje de impuesto del estado", () => {
    const resultado = calcular({ cantidad: 20, precio: 3, estado: "TX" });
    expect(resultado.porcentajeImpuesto).toBeCloseTo(6.25);
  });

  it("deberia retornar el porcentaje de descuento aplicado", () => {
    const resultado = calcular({ cantidad: 500, precio: 3, estado: "TX" });
    expect(resultado.porcentajeDescuento).toBeCloseTo(3);
  });

  it("deberia retornar porcentaje de descuento 0 cuando el neto es menor a 1000", () => {
    const resultado = calcular({ cantidad: 20, precio: 3, estado: "TX" });
    expect(resultado.porcentajeDescuento).toBeCloseTo(0);
  });

  it("deberia aplicar impuesto adicional por categoria Bebidas alcoholicas (7%)", () => {
    const resultado = calcular({ cantidad: 20, precio: 3, estado: "TX", categoria: "Bebidas alcoholicas" });
    expect(resultado.impuesto).toBeCloseTo(7.95);
  });

  it("deberia aplicar impuesto adicional por categoria Muebles (3%)", () => {
    const resultado = calcular({ cantidad: 20, precio: 3, estado: "TX", categoria: "Muebles" });
    expect(resultado.impuesto).toBeCloseTo(5.55);
  });

  it("deberia no aplicar impuesto adicional en categoria Varios", () => {
    const resultado = calcular({ cantidad: 20, precio: 3, estado: "TX", categoria: "Varios" });
    expect(resultado.impuesto).toBeCloseTo(3.75);
  });

  it("deberia aplicar descuento adicional 2% para categoria Alimentos", () => {
    const resultado = calcular({ cantidad: 20, precio: 3, estado: "TX", categoria: "Alimentos" });
    expect(resultado.descuento).toBeCloseTo(1.2);
  });

  it("deberia aplicar descuento adicional 1.5% para categoria Material de escritorio", () => {
    const resultado = calcular({ cantidad: 20, precio: 3, estado: "TX", categoria: "Material de escritorio" });
    expect(resultado.descuento).toBeCloseTo(0.9);
  });

  it("deberia aplicar descuento adicional 1% para categoria Electronicos", () => {
    const resultado = calcular({ cantidad: 20, precio: 3, estado: "TX", categoria: "Electronicos" });
    expect(resultado.descuento).toBeCloseTo(0.6);
  });

  it("deberia calcular costo de envio 0 para peso volumetrico entre 0 y 10", () => {
    const resultado = calcular({ cantidad: 20, precio: 3, estado: "TX", pesoVolumetrico: 5 });
    expect(resultado.costoEnvio).toBeCloseTo(0);
  });

  it("deberia calcular costo de envio 3.5 por unidad para peso entre 11 y 20", () => {
    const resultado = calcular({ cantidad: 20, precio: 3, estado: "TX", pesoVolumetrico: 15 });
    expect(resultado.costoEnvio).toBeCloseTo(70);
  });

  it("deberia calcular costo de envio 5 por unidad para peso entre 21 y 40", () => {
    const resultado = calcular({ cantidad: 10, precio: 3, estado: "TX", pesoVolumetrico: 30 });
    expect(resultado.costoEnvio).toBeCloseTo(50);
  });

  it("deberia calcular costo de envio 6 por unidad para peso entre 41 y 80", () => {
    const resultado = calcular({ cantidad: 5, precio: 3, estado: "TX", pesoVolumetrico: 60 });
    expect(resultado.costoEnvio).toBeCloseTo(30);
  });

  it("deberia calcular costo de envio 6.5 por unidad para peso entre 81 y 100", () => {
    const resultado = calcular({ cantidad: 4, precio: 3, estado: "TX", pesoVolumetrico: 90 });
    expect(resultado.costoEnvio).toBeCloseTo(26);
  });

  it("deberia calcular costo de envio 8 por unidad para peso entre 101 y 200", () => {
    const resultado = calcular({ cantidad: 3, precio: 3, estado: "TX", pesoVolumetrico: 150 });
    expect(resultado.costoEnvio).toBeCloseTo(24);
  });

  it("deberia calcular costo de envio 9 por unidad para peso mayor a 200", () => {
    const resultado = calcular({ cantidad: 2, precio: 3, estado: "TX", pesoVolumetrico: 250 });
    expect(resultado.costoEnvio).toBeCloseTo(18);
  });

  it("deberia no aplicar descuento en envio para tipo Normal (0%)", () => {
    const resultado = calcular({ cantidad: 10, precio: 3, estado: "TX", pesoVolumetrico: 15, tipoCliente: "Normal" });
    expect(resultado.costoEnvio).toBeCloseTo(35);
  });

  it("deberia aplicar descuento de 0.5% en envio para tipo Recurrente", () => {
    const resultado = calcular({ cantidad: 10, precio: 3, estado: "TX", pesoVolumetrico: 15, tipoCliente: "Recurrente" });
    expect(resultado.costoEnvio).toBeCloseTo(34.825);
  });

  it("deberia aplicar descuento de 1% en envio para tipo Antiguo Recurrente", () => {
    const resultado = calcular({ cantidad: 10, precio: 3, estado: "TX", pesoVolumetrico: 15, tipoCliente: "Antiguo Recurrente" });
    expect(resultado.costoEnvio).toBeCloseTo(34.65);
  });

  it("deberia aplicar descuento de 1.5% en envio para tipo Especial", () => {
    const resultado = calcular({ cantidad: 10, precio: 3, estado: "TX", pesoVolumetrico: 15, tipoCliente: "Especial" });
    expect(resultado.costoEnvio).toBeCloseTo(34.475);
  });

  it("deberia aplicar descuento fijo $100 para Recurrente + Alimentos + neto > 3000", () => {
    const resultado = calcular({ cantidad: 100, precio: 50, estado: "TX", categoria: "Alimentos", tipoCliente: "Recurrente" });
    expect(resultado.descuentoFijo).toBeCloseTo(100);
  });

  it("deberia no aplicar descuento fijo para Recurrente + Alimentos + neto <= 3000", () => {
    const resultado = calcular({ cantidad: 10, precio: 50, estado: "TX", categoria: "Alimentos", tipoCliente: "Recurrente" });
    expect(resultado.descuentoFijo).toBeCloseTo(0);
  });

  it("deberia aplicar descuento fijo $200 para Especial + Electronicos + neto > 7000", () => {
    const resultado = calcular({ cantidad: 100, precio: 100, estado: "TX", categoria: "Electronicos", tipoCliente: "Especial" });
    expect(resultado.descuentoFijo).toBeCloseTo(200);
  });

  it("deberia no aplicar descuento fijo para Especial + Electronicos + neto <= 7000", () => {
    const resultado = calcular({ cantidad: 10, precio: 100, estado: "TX", categoria: "Electronicos", tipoCliente: "Especial" });
    expect(resultado.descuentoFijo).toBeCloseTo(0);
  });

  it("deberia incluir costoEnvio y descuentoFijo en el precio total", () => {
    // neto=300, impuesto=TX6.25%=18.75, descuento=0, costoEnvio=peso15*10und*3.5=35, descuentoFijo=0
    // total = 300 + 18.75 - 0 - 0 + 35 = 353.75
    const resultado = calcular({ cantidad: 10, precio: 30, estado: "TX", pesoVolumetrico: 15 });
    expect(resultado.precioTotal).toBeCloseTo(353.75);
  });

  it("deberia descontar descuentoFijo del precio total", () => {
    // neto=5000, impuesto=TX6.25%=312.5, descuento=5%+2%Alimentos=350, costoEnvio=0, descuentoFijo=100
    // total = 5000 + 312.5 - 350 - 100 + 0 = 4862.5
    const resultado = calcular({ cantidad: 100, precio: 50, estado: "TX", categoria: "Alimentos", tipoCliente: "Recurrente" });
    expect(resultado.precioTotal).toBeCloseTo(4862.5);
  });

  it("deberia retornar error cuando el peso volumetrico es negativo", () => {
    const resultado = calcular({ cantidad: 10, precio: 3, estado: "TX", pesoVolumetrico: -5 });
    expect(resultado.error).toBe("Peso volumetrico invalido");
  });

  it("deberia retornar error cuando el tipo de cliente es invalido", () => {
    const resultado = calcular({ cantidad: 10, precio: 3, estado: "TX", tipoCliente: "VIP" });
    expect(resultado.error).toBe("Tipo de cliente invalido");
  });

  it("deberia retornar porcentajeImpuestoEstado separado (TX = 6.25)", () => {
    const resultado = calcular({ cantidad: 10, precio: 3, estado: "TX" });
    expect(resultado.porcentajeImpuestoEstado).toBeCloseTo(6.25);
  });

  it("deberia retornar porcentajeImpuestoCategoria separado (Bebidas alcoholicas = 7)", () => {
    const resultado = calcular({ cantidad: 10, precio: 3, estado: "TX", categoria: "Bebidas alcoholicas" });
    expect(resultado.porcentajeImpuestoCategoria).toBeCloseTo(7);
  });

  it("deberia retornar porcentajeDescuentoNeto separado (neto 5000 = 5%)", () => {
    const resultado = calcular({ cantidad: 100, precio: 50, estado: "TX" });
    expect(resultado.porcentajeDescuentoNeto).toBeCloseTo(5);
  });
});
