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
});
