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
});
